---
name: confeti-pr-creation
description: Confeti 프로젝트 PR 생성 워크플로우. 브랜치 생성, 커밋 분리, PR 템플릿 작성, gh CLI 사용법을 포함. 코드 변경 후 PR을 올려야 할 때 사용.
license: MIT
metadata:
  author: claude
  version: '1.0.0'
---

# Confeti PR Creation Skill

confeti-client 모노레포에서 PR을 생성하는 전체 워크플로우.

## When to Apply

- 코드 변경 완료 후 PR을 올려야 할 때
- 커밋을 논리적으로 분리해야 할 때
- PR 템플릿에 맞춰 본문을 작성해야 할 때

## Prerequisites

### NVM + Husky 환경 설정

이 프로젝트는 husky pre-commit hook이 pnpm을 사용하므로, git commit 전에 반드시 NVM을 소싱해야 한다:

```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
```

이 명령어를 **모든 git commit 명령어 앞에** 붙여야 한다. 그렇지 않으면 husky hook이 `pnpm: command not found` 에러를 발생시킨다.

## Workflow

### Step 1: 변경 사항 확인

```bash
git status
git diff --stat
```

변경된 파일 목록과 범위를 확인한다.

### Step 2: 기존 PR 스타일 확인

```bash
gh pr list --state merged --limit 5 --json number,title,body
```

최근 머지된 PR의 제목과 본문 형식을 참고한다.

### Step 3: 브랜치 생성

현재 브랜치에서 feature 브랜치를 생성한다:

```bash
git checkout -b <type>/<description>
```

**브랜치 네이밍 컨벤션:**

- `feat/기능-설명` — 새 기능
- `refactor/리팩토링-설명` — 리팩토링
- `fix/버그-설명` — 버그 수정
- `chore/작업-설명` — 설정, 의존성 등

### Step 4: 커밋 분리 전략

변경 사항을 **관심사별로** 논리적 커밋으로 분리한다:

1. **새로운 훅/유틸리티** → 별도 커밋 (의존성 없는 새 파일)
2. **컴포넌트 리팩토링** → 관련 컴포넌트를 묶어 하나의 커밋
3. **기능 통합 (orchestration)** → 새 훅/유틸을 사용하는 상위 컴포넌트 변경
4. **UX/스타일 변경** → UI 관련 변경은 별도 커밋

### Step 5: 커밋 실행

**반드시 NVM 소싱 후 커밋:**

```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && git add <files> && git commit -m "<type>: <한국어 설명>"
```

**커밋 메시지 컨벤션:**

- `feat: 한국어 설명` — 새 기능
- `refactor: 한국어 설명` — 리팩토링
- `fix: 한국어 설명` — 버그 수정
- `chore: 한국어 설명` — 기타 작업
- `style: 한국어 설명` — 스타일 변경
- `docs: 한국어 설명` — 문서 변경

### Step 6: 푸시

```bash
git push -u origin <branch-name>
```

### Step 7: PR 생성

```bash
gh pr create --base develop --head <branch-name> --title "<Type>(Scope): 설명" --body "$(cat <<'EOF'
## 📌 Summary

> 관련 이슈 또는 요약

변경 내용 요약

## 📚 Tasks

- [ ] 작업 항목 1
- [ ] 작업 항목 2

## 👀 To Reviewer

- 리뷰어에게 전달할 내용

🤖 This PR was authored by Claude
EOF
)"
```

**PR 제목 형식:** `<Type>(Scope): 한국어 설명`

- 예: `Refactor(Timetable): 타임테이블 블록 편집 배치 저장 리팩토링`

**PR 본문 필수 섹션:**

1. `## 📌 Summary` — 변경 요약 (관련 이슈 태그 포함)
2. `## 📚 Tasks` — 수행한 작업 목록
3. `## 👀 To Reviewer` — (선택) 리뷰어에게 전달할 내용
4. `## 📸 Screenshot` — (선택) 스크린샷

**Claude가 작성한 PR인 경우:** 본문 마지막에 `🤖 This PR was authored by Claude` 추가.

## Common Pitfalls

1. **NVM 소싱 누락** → husky hook 실패. 모든 git commit 앞에 NVM export 필수.
2. **develop 대신 main에 PR** → 항상 `--base develop` 사용.
3. **커밋 너무 크게 묶기** → 관심사별로 분리. 하나의 커밋에 훅 + 컴포넌트 + 스타일 전부 넣지 말 것.
4. **lint-staged 실패** → pre-commit에서 eslint/prettier가 자동 수정. 수정된 파일 다시 add 후 amend.
