/* eslint-disable @typescript-eslint/no-require-imports */
const {
  MARKER_END,
  MARKER_START,
  MENTION_SECTION_TITLE,
  RELEASE_SECTION_TITLE,
  collectReleaseItems,
  collectUniqueMentions,
  createRequestJson,
  formatReleaseItemMarkdownLine,
  getNextReleaseSequence,
  isTargetBranchFlow,
  readGithubContext,
} = require('./release-pr-utils');

const { event, owner, pr, repo, token } = readGithubContext();

if (!isTargetBranchFlow(pr, event.repository.full_name)) {
  process.exit(0);
}

const requestJson = createRequestJson({ token });

const buildUpdatedBody = async () => {
  const { nextTitle } = await getNextReleaseSequence({
    owner,
    pr,
    repo,
    requestJson,
  });
  const releaseItems = await collectReleaseItems({
    owner,
    pr,
    repo,
    requestJson,
  });
  const releaseLines = releaseItems.map(formatReleaseItemMarkdownLine);
  const uniqueMentions = collectUniqueMentions(releaseItems);
  const mentionLines = uniqueMentions.length
    ? uniqueMentions.map((mention) => `- ${mention}`)
    : ['- (알림 대상 없음)'];

  const releaseBlock = [
    MARKER_START,
    `## 🚀 ${nextTitle}`,
    '',
    RELEASE_SECTION_TITLE,
    ...(releaseLines.length ? releaseLines : ['- (반영된 PR 없음)']),
    '',
    MENTION_SECTION_TITLE,
    ...mentionLines,
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
