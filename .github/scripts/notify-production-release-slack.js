/* eslint-disable @typescript-eslint/no-require-imports */
const {
  collectReleaseItems,
  createRequestJson,
  formatReleaseItemSlackLine,
  isTargetBranchFlow,
  readGithubContext,
} = require('./release-pr-utils');

const webhookUrl = process.env.SLACK_WEBHOOK_URL;
if (!webhookUrl) {
  throw new Error('SLACK_WEBHOOK_URL is required');
}

const { event, owner, pr, repo, token } = readGithubContext();

if (!isTargetBranchFlow(pr, event.repository.full_name) || !pr.merged) {
  process.exit(0);
}

const requestJson = createRequestJson({ token });

const createSlackMessage = async () => {
  const releaseItems = await collectReleaseItems({
    owner,
    pr,
    repo,
    requestJson,
  });
  const releaseLines = releaseItems.length
    ? releaseItems.map(formatReleaseItemSlackLine)
    : ['• 반영된 PR이 없어요.'];

  return {
    text: [
      ':rocket: 프로덕션 배포가 완료되었어요.',
      `릴리즈 PR: ${pr.title}`,
      `링크: ${pr.html_url}`,
      '',
      ...releaseLines,
    ].join('\n'),
  };
};

const sendSlackMessage = async (payload) => {
  const response = await fetch(webhookUrl, {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Slack webhook error: ${response.status} ${response.statusText} - ${text}`,
    );
  }
};

const run = async () => {
  const payload = await createSlackMessage();
  await sendSlackMessage(payload);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
