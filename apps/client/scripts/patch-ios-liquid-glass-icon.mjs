#!/usr/bin/env node
/**
 * Liquid Glass `.icon` (Icon Composer) 파일을 Capacitor가 생성한 Xcode 프로젝트에
 * 매번 재등록하는 패치 스크립트.
 *
 * Capacitor는 `project.pbxproj`를 옛 Xcode 8 포맷(objectVersion 48)으로 생성하고,
 * Assets.xcassets 안의 `.icon` 파일을 인식하지 못한다 (이슈 #8179). 우회법:
 *   1. `.icon`을 프로젝트 폴더(`App/`)에 직접 배치
 *   2. `project.pbxproj`에 PBXFileReference + PBXBuildFile + PBXGroup + Resources 항목 직접 주입
 *
 * `cap sync` 시 pbxproj이 갱신되어 이 패치가 사라질 수 있어서, mobile:sync 후 매번 실행.
 * 멱등(idempotent)이라 여러 번 돌려도 안전.
 *
 * 적용 대상:
 *   - 프로젝트 폴더의 `AppIcon.icon` 디렉토리
 *   - `App.xcodeproj/project.pbxproj`
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJ_ROOT = resolve(__dirname, '..');
const PBXPROJ = resolve(PROJ_ROOT, 'ios/App/App.xcodeproj/project.pbxproj');
const ICON_PATH = resolve(PROJ_ROOT, 'ios/App/App/AppIcon.icon');
const ICON_NAME = 'AppIcon.icon';

const log = (msg) => console.log(`[patch-icon] ${msg}`);

function genId() {
  // 24자 대문자 hex (Xcode pbxproj UUID 포맷)
  return randomBytes(12).toString('hex').toUpperCase();
}

function main() {
  if (!existsSync(PBXPROJ)) {
    console.error(`pbxproj not found: ${PBXPROJ}`);
    process.exit(1);
  }
  if (!existsSync(ICON_PATH)) {
    console.error(
      `${ICON_NAME} not found at ${ICON_PATH}. Place the Icon Composer .icon bundle there.`,
    );
    process.exit(1);
  }

  let pbx = readFileSync(PBXPROJ, 'utf8');

  if (pbx.includes(`/* ${ICON_NAME} */`)) {
    log(`${ICON_NAME} already registered in pbxproj — skip.`);
    return;
  }

  const fileRefId = genId();
  const buildFileId = genId();

  // 1) PBXBuildFile 섹션에 새 BuildFile 항목 추가
  pbx = pbx.replace(
    /(\/\* Begin PBXBuildFile section \*\/[\s\S]*?\n)/,
    (m) =>
      `${m}\t\t${buildFileId} /* ${ICON_NAME} in Resources */ = {isa = PBXBuildFile; fileRef = ${fileRefId} /* ${ICON_NAME} */; };\n`,
  );

  // 2) PBXFileReference 섹션에 파일 참조 항목 추가
  //    `.icon`은 `folder.iconcomposer.icon` 타입으로 등록해야 actool이 Icon Composer 입력으로 인식한다.
  //    (Xcode AssetCatalogCompiler.xcspec → InputFileTypes에 명시됨)
  pbx = pbx.replace(
    /(\/\* Begin PBXFileReference section \*\/[\s\S]*?\n)/,
    (m) =>
      `${m}\t\t${fileRefId} /* ${ICON_NAME} */ = {isa = PBXFileReference; lastKnownFileType = folder.iconcomposer.icon; path = ${ICON_NAME}; sourceTree = "<group>"; };\n`,
  );

  // 3) App group의 children 목록에 .icon 추가
  //    (App 그룹은 Info.plist 옆에 있다고 가정 — Capacitor 표준 레이아웃)
  const appGroupRegex =
    /(504EC3061FED79650016851F \/\* App \*\/ = \{[\s\S]*?children = \(\n)([\s\S]*?)(\n\s*\);)/;
  pbx = pbx.replace(appGroupRegex, (m, head, children, tail) => {
    if (children.includes(ICON_NAME)) return m;
    return `${head}${children}\n\t\t\t\t${fileRefId} /* ${ICON_NAME} */,${tail}`;
  });

  // 4) Resources Build Phase에 추가
  const resourcesPhaseRegex =
    /(504EC3021FED79650016851F \/\* Resources \*\/ = \{[\s\S]*?files = \(\n)([\s\S]*?)(\n\s*\);)/;
  pbx = pbx.replace(resourcesPhaseRegex, (m, head, files, tail) => {
    if (files.includes(`${ICON_NAME} in Resources`)) return m;
    return `${head}${files}\n\t\t\t\t${buildFileId} /* ${ICON_NAME} in Resources */,${tail}`;
  });

  writeFileSync(PBXPROJ, pbx, 'utf8');
  log(
    `Injected ${ICON_NAME} into pbxproj (fileRef=${fileRefId}, buildFile=${buildFileId}).`,
  );
}

main();
