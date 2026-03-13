/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs');

const HEAD_BRANCH = 'develop';
const BASE_BRANCH = 'main';
const MARKER_START = '<!-- AUTO_RELEASE_NOTES_START -->';
const MARKER_END = '<!-- AUTO_RELEASE_NOTES_END -->';
const RELEASE_SECTION_TITLE = '### develop에 반영된 PR 목록';
const MENTION_SECTION_TITLE = '### 배포 알림 대상';
const TIME_ZONE = 'Asia/Seoul';
const NOTIFICATION_MENTION_TAGS = ['@plan', '@client', '@design', '@server'];

const formatEventDate = (date) =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replace(/-/g, '.');

const escapeMarkdownText = (value) =>
  value
    .replace(/[\r\n`*_()]/g, ' ')
    .replace(/\[/g, ' ')
    .replace(/\]/g, ' ')
    .trim();

const readGithubContext = () => {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath) {
    throw new Error('GITHUB_EVENT_PATH is required');
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN is required');
  }

  const event = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
  const pr = event.pull_request;
  const owner = event.repository.owner.login;
  const repo = event.repository.name;

  return {
    event,
    owner,
    pr,
    repo,
    token,
  };
};

const createRequestJson = ({ token }) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'github-actions-script',
    'Content-Type': 'application/json',
  };

  return async (url, options = {}) => {
    const response = await fetch(url, {
      headers,
      ...options,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText} - ${text}`,
      );
    }

    return response.json();
  };
};

const isTargetBranchFlow = (pr, repositoryFullName) =>
  pr.base.ref === BASE_BRANCH &&
  pr.head.ref === HEAD_BRANCH &&
  pr.head.repo.full_name === repositoryFullName;

const collectPullsByPage = async ({ owner, repo, requestJson, page }) => {
  const searchParams = new URLSearchParams({
    state: 'all',
    base: BASE_BRANCH,
    sort: 'created',
    direction: 'desc',
    per_page: '100',
    page: String(page),
  });

  return requestJson(
    `https://api.github.com/repos/${owner}/${repo}/pulls?${searchParams.toString()}`,
  );
};

const collectCommits = async ({ owner, repo, pullNumber, requestJson }) => {
  const commits = [];
  let page = 1;

  while (true) {
    const query = new URLSearchParams({
      per_page: '100',
      page: String(page),
    }).toString();

    const pageCommits = await requestJson(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/commits?${query}`,
    );

    commits.push(...pageCommits);

    if (pageCommits.length < 100) {
      break;
    }

    page += 1;
  }

  return commits;
};

const collectAssociatedPullsForCommit = async ({
  owner,
  repo,
  requestJson,
  sha,
}) =>
  requestJson(
    `https://api.github.com/repos/${owner}/${repo}/commits/${sha}/pulls`,
  );

const formatCommitTitle = (commit) => {
  const firstLine =
    (commit.commit?.message || '').split('\n')[0] || 'No message';

  return escapeMarkdownText(firstLine);
};

const extractMentionTags = (title) => {
  const normalizedTitle = title.toLowerCase();

  return NOTIFICATION_MENTION_TAGS.filter((tag) =>
    normalizedTitle.includes(tag),
  );
};

const collectUniqueMentions = (releaseItems) => [
  ...new Set(releaseItems.flatMap((item) => item.mentions)),
];

const formatReleaseItemMarkdownLine = (item) => {
  const tagSuffix = item.mentions.length ? ` ${item.mentions.join(' ')}` : '';

  return `- [${item.title}](${item.url})${tagSuffix}`;
};

const formatReleaseItemSlackLine = (item) => {
  return `• ${item.title}`;
};

const collectReleaseItems = async ({ owner, pr, repo, requestJson }) => {
  const commits = await collectCommits({
    owner,
    pullNumber: pr.number,
    repo,
    requestJson,
  });
  const releaseItems = [];
  const seenPullNumbers = new Set();

  for (const commit of commits) {
    const associatedPulls = await collectAssociatedPullsForCommit({
      owner,
      repo,
      requestJson,
      sha: commit.sha,
    });

    const releasePull = associatedPulls.find(
      (pull) =>
        pull.number !== pr.number &&
        pull.base?.ref === HEAD_BRANCH &&
        pull.merged_at,
    );

    if (releasePull) {
      if (seenPullNumbers.has(releasePull.number)) {
        continue;
      }

      seenPullNumbers.add(releasePull.number);
      releaseItems.push({
        mentions: extractMentionTags(releasePull.title || ''),
        number: releasePull.number,
        title: escapeMarkdownText(releasePull.title || 'Untitled PR'),
        type: 'pull',
        url: releasePull.html_url,
      });
      continue;
    }

    releaseItems.push({
      mentions: extractMentionTags(formatCommitTitle(commit)),
      sha: commit.sha,
      title: formatCommitTitle(commit),
      type: 'commit',
      url:
        commit.html_url ||
        `https://github.com/${owner}/${repo}/commit/${commit.sha}`,
    });
  }

  return releaseItems;
};

const getNextReleaseSequence = async ({ owner, pr, repo, requestJson }) => {
  const releaseDatePrefix = formatEventDate(new Date());
  const releaseTitlePrefix = `Release ${releaseDatePrefix}`;
  const releaseTitleRegex = new RegExp(
    `^${releaseTitlePrefix.replace(/\./g, '\\.')}\\.(\\d+)$`,
  );

  let maxSequence = -1;
  let page = 1;

  while (true) {
    const pulls = await collectPullsByPage({
      owner,
      page,
      repo,
      requestJson,
    });

    if (!pulls.length) {
      break;
    }

    for (const item of pulls) {
      if (item.number === pr.number) {
        continue;
      }

      if (item.head?.ref !== HEAD_BRANCH || item.base?.ref !== BASE_BRANCH) {
        continue;
      }

      const match = (item.title || '').match(releaseTitleRegex);
      if (!match) {
        continue;
      }

      const sequence = Number(match[1]);
      if (Number.isNaN(sequence)) {
        continue;
      }

      maxSequence = Math.max(maxSequence, sequence);
    }

    const oldestDate = pulls[pulls.length - 1]?.created_at;
    if (!oldestDate) {
      break;
    }

    const oldestPrefix = formatEventDate(new Date(oldestDate));

    if (oldestPrefix < releaseDatePrefix || pulls.length < 100) {
      break;
    }

    page += 1;
  }

  return {
    nextTitle: `${releaseTitlePrefix}.${maxSequence + 1}`,
    releaseDatePrefix,
  };
};

module.exports = {
  BASE_BRANCH,
  HEAD_BRANCH,
  MARKER_END,
  MARKER_START,
  MENTION_SECTION_TITLE,
  NOTIFICATION_MENTION_TAGS,
  RELEASE_SECTION_TITLE,
  TIME_ZONE,
  collectReleaseItems,
  collectUniqueMentions,
  createRequestJson,
  escapeMarkdownText,
  extractMentionTags,
  formatReleaseItemMarkdownLine,
  formatReleaseItemSlackLine,
  getNextReleaseSequence,
  isTargetBranchFlow,
  readGithubContext,
};
