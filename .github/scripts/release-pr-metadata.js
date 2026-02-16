/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs');

const HEAD_BRANCH = 'develop';
const BASE_BRANCH = 'main';
const MARKER_START = '<!-- AUTO_RELEASE_NOTES_START -->';
const MARKER_END = '<!-- AUTO_RELEASE_NOTES_END -->';
const COMMIT_SECTION_TITLE = '### develop에 푸시된 커밋 목록';
const TIME_ZONE = 'Asia/Seoul';

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

const isTargetBranchFlow =
  pr.base.ref === BASE_BRANCH &&
  pr.head.ref === HEAD_BRANCH &&
  pr.head.repo.full_name === event.repository.full_name;

if (!isTargetBranchFlow) {
  process.exit(0);
}

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'github-actions-script',
  'Content-Type': 'application/json',
};

const requestJson = async (url, options = {}) => {
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

const collectPullsByPage = async (page) => {
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

const collectCommits = async (pullNumber) => {
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

const eventDateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIME_ZONE,
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
});

const releaseDatePrefix = eventDateFormatter
  .format(new Date())
  .replace(/-/g, '.');
const releaseTitlePrefix = `Release ${releaseDatePrefix}`;
const releaseTitleRegex = new RegExp(
  `^${releaseTitlePrefix.replace(/\./g, '\\.')}\\.(\\d+)$`,
);

const getNextReleaseSequence = async () => {
  let maxSequence = -1;
  let page = 1;

  while (true) {
    const pulls = await collectPullsByPage(page);
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

    const oldestPrefix = eventDateFormatter
      .format(new Date(oldestDate))
      .replace(/-/g, '.');

    if (oldestPrefix < releaseDatePrefix || pulls.length < 100) {
      break;
    }

    page += 1;
  }

  return maxSequence + 1;
};

const formatCommitMessage = (commit) => {
  const firstLine =
    (commit.commit?.message || '').split('\n')[0] || 'No message';
  return firstLine
    .replace(/[\r\n`*_()]/g, ' ')
    .replace(/\[/g, ' ')
    .replace(/\]/g, ' ')
    .trim();
};

const buildUpdatedBody = async () => {
  const nextSequence = await getNextReleaseSequence();
  const nextTitle = `${releaseTitlePrefix}.${nextSequence}`;
  const commits = await collectCommits(pr.number);

  const commitLines = commits.map((commit) => {
    const title = formatCommitMessage(commit);
    const commitUrl =
      commit.html_url ||
      `https://github.com/${owner}/${repo}/commit/${commit.sha}`;
    return `- [${title}](${commitUrl})`;
  });

  const releaseBlock = [
    MARKER_START,
    `## 🚀 ${nextTitle}`,
    '',
    COMMIT_SECTION_TITLE,
    ...(commitLines.length ? commitLines : ['- (변경된 커밋 없음)']),
    MARKER_END,
  ].join('\n');

  const currentBody = pr.body || '';
  const markerStart = currentBody.indexOf(MARKER_START);
  const markerEnd = currentBody.indexOf(MARKER_END);

  const mergedBody =
    markerStart >= 0 && markerEnd > markerStart
      ? [
          currentBody.slice(0, markerStart).trimEnd(),
          releaseBlock,
          currentBody.slice(markerEnd + MARKER_END.length).trimStart(),
        ]
          .filter(Boolean)
          .join('\n\n')
      : [currentBody.trimEnd(), releaseBlock].filter(Boolean).join('\n\n');

  return { nextTitle, mergedBody };
};

const run = async () => {
  const { nextTitle, mergedBody } = await buildUpdatedBody();

  if (pr.title === nextTitle && (pr.body || '') === mergedBody) {
    return;
  }

  await requestJson(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${pr.number}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        title: nextTitle,
        body: mergedBody,
      }),
    },
  );
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
