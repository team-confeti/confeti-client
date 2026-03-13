import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { exit, stdin as input, stdout as output } from 'node:process';
import { createInterface } from 'node:readline/promises';

const PR_TYPE_OPTIONS = [
  { label: 'Feat', description: '새로운 기능을 추가해요.' },
  { label: 'Fix', description: '버그를 수정해요.' },
  { label: 'Refactor', description: '동작 변화 없이 구조를 개선해요.' },
  { label: 'UX/UI', description: '사용 경험이나 화면을 개선해요.' },
  { label: 'Chore', description: '설정, 정리, 유지보수 작업을 해요.' },
  { label: 'Docs', description: '문서만 변경해요.' },
];

const PR_SCOPE_OPTIONS = ['Client', 'Admin', 'Product'];
const PR_MENTION_OPTIONS = [
  '선택 안 함',
  '@plan',
  '@client',
  '@design',
  '@server',
];
const ANSI_RESET = '\u001B[0m';
const ANSI_YELLOW = '\u001B[33m';

function runCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: 'utf8',
    stdio: 'pipe',
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const stderr = result.stderr.trim();
    const stdout = result.stdout.trim();
    const errorMessage = stderr || stdout || `${command} 실행에 실패했어요.`;

    throw new Error(errorMessage);
  }

  return result.stdout.trim();
}

function getCurrentBranchName() {
  return runCommand('git', ['branch', '--show-current']);
}

function hasGhCli() {
  const result = spawnSync('gh', ['--version'], {
    encoding: 'utf8',
    stdio: 'pipe',
  });

  return result.status === 0;
}

function hasRemoteBranch(branchName) {
  const result = spawnSync(
    'git',
    ['ls-remote', '--exit-code', '--heads', 'origin', branchName],
    {
      encoding: 'utf8',
      stdio: 'pipe',
    },
  );

  return result.status === 0;
}

function pushBranch(branchName) {
  const result = spawnSync('git', ['push', '-u', 'origin', branchName], {
    encoding: 'utf8',
    stdio: 'inherit',
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error('현재 브랜치를 원격에 푸시하지 못했어요.');
  }
}

function loadPrBodyTemplate() {
  const templatePath = '.github/PULL_REQUEST_TEMPLATE.md';

  if (!existsSync(templatePath)) {
    return [
      '## 📌 Summary',
      '',
      '> 관련 있는 Issue를 태그해주세요.',
      '',
      '## 📚 Tasks',
      '',
      '- 작업 내용을 작성해주세요.',
    ].join('\n');
  }

  return readFileSync(templatePath, 'utf8').trim();
}

function createNumberedOptions(options) {
  return options
    .map((option, index) =>
      typeof option === 'string'
        ? `${index + 1}. ${option}`
        : `${index + 1}. ${option.label} - ${option.description}`,
    )
    .join('\n');
}

function createQuestionInterface() {
  return createInterface({ input, output });
}

function clearRenderedMenu(lineCount) {
  output.write(`\u001B[${lineCount}F`);
  output.write('\u001B[J');
}

async function selectOptionWithArrowKeys(message, options) {
  if (!input.isTTY || !output.isTTY) {
    const rl = createQuestionInterface();

    try {
      return await selectOption(rl, message, options);
    } finally {
      rl.close();
    }
  }

  return new Promise((resolve) => {
    let selectedIndex = 0;
    const instruction = '방향키로 이동하고 Enter로 선택해주세요.';
    const renderedLineCount = options.length + 2;

    const render = () => {
      const lines = [
        message,
        ...options.map((option, index) => {
          const label =
            typeof option === 'string'
              ? option
              : `${option.label} - ${option.description}`;

          return selectedIndex === index
            ? `${ANSI_YELLOW}> ${label}${ANSI_RESET}`
            : `  ${label}`;
        }),
        instruction,
      ];

      output.write(`${lines.join('\n')}\n`);
    };

    const cleanup = () => {
      input.setRawMode(false);
      input.pause();
      input.removeListener('data', handleKeyPress);
      clearRenderedMenu(renderedLineCount);
    };

    const handleKeyPress = (chunk) => {
      const key = chunk.toString();

      if (key === '\u0003') {
        cleanup();
        exit(1);
      }

      if (key === '\u001B[A') {
        selectedIndex =
          selectedIndex === 0 ? options.length - 1 : selectedIndex - 1;
        clearRenderedMenu(renderedLineCount);
        render();
        return;
      }

      if (key === '\u001B[B') {
        selectedIndex =
          selectedIndex === options.length - 1 ? 0 : selectedIndex + 1;
        clearRenderedMenu(renderedLineCount);
        render();
        return;
      }

      if (key === '\r') {
        const selectedOption = options[selectedIndex];

        cleanup();
        output.write(
          `${message}\n${
            typeof selectedOption === 'string'
              ? selectedOption
              : `${selectedOption.label} - ${selectedOption.description}`
          }\n`,
        );
        resolve(
          typeof selectedOption === 'string'
            ? selectedOption
            : selectedOption.label,
        );
      }
    };

    input.setRawMode(true);
    input.resume();
    input.on('data', handleKeyPress);

    render();
  });
}

async function selectOption(rl, message, options) {
  while (true) {
    output.write(`\n${message}\n${createNumberedOptions(options)}\n`);

    const answer = await rl.question('번호를 입력해주세요: ');
    const selectedIndex = Number(answer) - 1;

    if (
      Number.isInteger(selectedIndex) &&
      selectedIndex >= 0 &&
      selectedIndex < options.length
    ) {
      const selectedOption = options[selectedIndex];

      return typeof selectedOption === 'string'
        ? selectedOption
        : selectedOption.label;
    }

    output.write('올바른 번호를 입력해주세요.\n');
  }
}

async function inputPrTitle(rl) {
  while (true) {
    const answer = (await rl.question('\nPR 제목을 입력해주세요: ')).trim();

    if (answer.length > 0) {
      return answer;
    }

    output.write('PR 제목은 비워둘 수 없어요.\n');
  }
}

async function askPrTitle() {
  const rl = createQuestionInterface();

  try {
    return await inputPrTitle(rl);
  } finally {
    rl.close();
  }
}

function createPr(prTitle, prBody, branchName) {
  const result = spawnSync(
    'gh',
    [
      'pr',
      'create',
      '--draft',
      '--base',
      'develop',
      '--head',
      branchName,
      '--title',
      prTitle,
      '--body',
      prBody,
    ],
    {
      encoding: 'utf8',
      stdio: 'pipe',
    },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const stderr = result.stderr.trim();
    const stdout = result.stdout.trim();

    throw new Error(stderr || stdout || '드래프트 PR 생성에 실패했어요.');
  }

  return result.stdout.trim();
}

async function main() {
  if (!hasGhCli()) {
    throw new Error(
      '`gh` CLI를 찾을 수 없어요. GitHub CLI를 설치한 뒤 다시 실행해주세요.',
    );
  }

  const branchName = getCurrentBranchName();

  if (!branchName) {
    throw new Error('현재 브랜치 이름을 확인하지 못했어요.');
  }

  if (
    branchName === 'develop' ||
    branchName === 'main' ||
    branchName === 'master'
  ) {
    throw new Error(
      '기본 브랜치에서는 PR을 만들 수 없어요. 작업 브랜치에서 다시 실행해주세요.',
    );
  }

  const prType = await selectOptionWithArrowKeys(
    'PR 타입을 선택해주세요.',
    PR_TYPE_OPTIONS,
  );
  const prScope = await selectOptionWithArrowKeys(
    'PR 범위를 선택해주세요.',
    PR_SCOPE_OPTIONS,
  );
  const mentionGroup = await selectOptionWithArrowKeys(
    '알릴 사용자 그룹을 선택해주세요.',
    PR_MENTION_OPTIONS,
  );
  const titleInput = await askPrTitle();
  const prTitle =
    mentionGroup === '선택 안 함'
      ? `${prType}(${prScope}): ${titleInput}`
      : `${prType}(${prScope}): ${titleInput} ${mentionGroup}`;

  output.write(`\n생성할 PR 제목: ${prTitle}\n`);

  if (!hasRemoteBranch(branchName)) {
    output.write(`\n원격에 ${branchName} 브랜치가 없어서 먼저 푸시할게요.\n`);
    pushBranch(branchName);
  }

  const prBody = loadPrBodyTemplate();
  const prUrl = createPr(prTitle, prBody, branchName);

  output.write(`\n드래프트 PR을 만들었어요.\n${prUrl}\n`);
}

main().catch((error) => {
  const message =
    error instanceof Error ? error.message : '알 수 없는 오류가 발생했어요.';

  console.error(`\n${message}`);
  exit(1);
});
