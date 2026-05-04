# 로컬 환경 셋업 가이드

Capacitor 앱 빌드를 위해 필요한 도구들. 일부는 사용자(개발자)가 직접 설치해야 한다.

## 현재 상태 (2026-04-28 기준)

| 도구           | 요구 버전     | 현재 상태                  | 액션                       |
| -------------- | ------------- | -------------------------- | -------------------------- |
| Node.js        | ≥ 20          | ✅ v22.20.0                | OK                         |
| pnpm           | 10.x          | ✅ 10.27.0                 | OK                         |
| Xcode          | 16+ (정식 앱) | ⚠️ CommandLineTools만 활성 | **설치 필요**              |
| CocoaPods      | 1.14+         | ❌ 없음                    | **설치 필요**              |
| Android Studio | Hedgehog+     | ❓ 미확인                  | **확인 필요**              |
| Android SDK    | 33+           | ❓ 미확인                  | **확인 필요**              |
| JDK            | 17+           | ❓ 미확인                  | Android Studio 함께 설치됨 |

## iOS 빌드 환경 셋업

### 1. Xcode 정식 버전 설치 (가장 먼저)

- App Store에서 "Xcode" 검색 → 설치 (~10GB, 시간 오래 걸림)
- 또는 [Apple Developer 다운로드](https://developer.apple.com/download/all/) (Apple ID 필요)
- 설치 완료 후 Xcode 1회 실행 → "Install Additional Components" 동의

### 2. xcode-select 활성 디렉토리 변경

현재 `/Library/Developer/CommandLineTools`로 잡혀있어 `xcodebuild` 사용 불가.

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
xcodebuild -version    # Xcode 16.x 확인
```

### 3. CocoaPods 설치

```bash
brew install cocoapods
pod --version          # 1.14+ 확인
```

또는 macOS 시스템 Ruby 사용:

```bash
sudo gem install cocoapods
```

### 4. iOS 시뮬레이터 다운로드

Xcode → Settings → Platforms → iOS 17.0+ 시뮬레이터 다운로드.

## Android 빌드 환경 셋업

### 1. Android Studio 설치

- https://developer.android.com/studio 에서 다운로드
- 설치 → 첫 실행 → "Standard" 셋업 따라가면 SDK 자동 설치

### 2. SDK 경로 환경 변수 (선택)

```bash
# ~/.zshrc 또는 ~/.zshenv
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
```

### 3. Android 에뮬레이터 생성

Android Studio → Device Manager → Create Device → Pixel 7 + API 34+ 이미지 다운로드.

### 4. JDK 확인

```bash
java -version          # 17+
```

없으면 Android Studio가 번들 JDK를 함께 설치하므로 별도 필요 X.

## 검증 명령

iOS 환경:

```bash
xcodebuild -version
pod --version
xcrun simctl list devices | head -10
```

Android 환경:

```bash
echo $ANDROID_HOME
adb --version
emulator -list-avds
```

모두 정상 출력되면 Capacitor `cap add ios` / `cap add android` 진행 가능.

## 트러블슈팅

### "tool 'xcodebuild' requires Xcode"

→ 1.~2. 단계 미완료. Xcode 정식 앱 설치 + `sudo xcode-select -s`.

### `pod install` 실패: "Unable to find a specification for ..."

```bash
pod repo update
cd apps/client/ios/App && pod install
```

### Android Studio Gradle sync 실패

SDK 경로 확인 (`$ANDROID_HOME` 또는 Android Studio 설정에서 SDK Path).

### iOS 시뮬레이터에서 흰 화면만 나옴

- `pnpm --filter @confeti/client build` 실행 후 `npx cap sync ios` 다시
- Xcode → Product → Clean Build Folder (Shift+Cmd+K)

## 사용자 액션 체크리스트

iOS:

- [ ] Xcode 정식 앱 App Store에서 설치
- [ ] `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`
- [ ] `brew install cocoapods` 또는 `sudo gem install cocoapods`
- [ ] `xcodebuild -version` 정상 출력 확인
- [ ] iOS 17+ 시뮬레이터 다운로드

Android:

- [ ] Android Studio 설치
- [ ] SDK 33+ 설치
- [ ] 에뮬레이터(Pixel 7 등) 생성

설치 완료 후 알려주시면 Phase 1의 `cap add ios` / `cap add android`로 진행합니다.
