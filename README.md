![logo_main](https://github.com/user-attachments/assets/f010308f-2774-418a-947e-ebef95f691da)
<br/> <strong> "콘서트, 페스티벌 티켓 정보를 한눈에, 손쉽게!"</strong>

1. 내가 원하는 콘서트 및 페스티벌 정보를 모아서

2. 찜한 공연들을 바탕으로 나만의 타임테이블을 만들어

3. 중요한 일정들을 한눈에 확인할 수 있는 곳, **confeti**

---

<h2>🏴‍☠️ confeti FE Developers </h2>
<div align="center">
<table >
    <th > 강민하</a></th>
    <th > 곽지욱 <a href="https://github.com/Ivoryeee"></a></th>
    <th> 김다현 <a href="https://github.com/KIMGEONHWI"></a></th>
    <th align="baseline"> 김채은 <a href="https://github.com/seueooo"></a></th>
    <th align="baseline"> 김한서 <a href="https://github.com/seueooo"></a></th>
    <tr>
    	<td width="20%"><img src="https://avatars.githubusercontent.com/u/118591632?v=4" width="100%"></td>
    	<td width="20%"><img src="https://avatars.githubusercontent.com/u/99489686?v=4"  width="100%"></td>
      <td width="20%"><img src="https://avatars.githubusercontent.com/u/124647898?v=4" width="100%"></td>
    	<td width="20%"><img src="https://avatars.githubusercontent.com/u/154000318?v=4" width="100%"></td>
<td width="20%"><img src="https://avatars.githubusercontent.com/u/108131226?v=4" width="100%"></td>
    </tr>
<tr align="center">
	<td>
		<p>@m2na7</p>
	</td>
	<td>
		<p>@gwagjiug</p>
	</td>
	<td>
		<p>@daahyunk</p>
	</td>
       <td>
		<p>@bongtta</p>
	</td>
         <td>
		<p>@seueooo</p>
	</td>
    </tr>
    </table>
</div>

<br />

## 🛠️ Tech Stack

### Node.js Version

`v22.12.0`

| 역할                       | 종류                                                                                                                                                                                                                                                                                                                    |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Library`**              | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white) ![VITE](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=Vite&logoColor=white)                                                                                                                      |
| **`Programming Language`** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white)                                                                                                                                                                                                   |
| **`Styling`**              | ![VanilaExtract](https://img.shields.io/badge/VanilaExtract-%2399F2D9?style=for-the-badge&logo=VanilaExtract&logoColor=white)                                                                                                                                                                                           |
| **`Data Fetching`**        | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white) ![TanstackQuery](https://img.shields.io/badge/TanstackQuery-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white)                                                                                              |
| **`Formatting`**           | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white) ![Husky](https://img.shields.io/badge/husky-%23025E73?style=for-the-badge&logo=husky&logoColor=white) |
| **`Package Manager`**      | ![Yarn](https://img.shields.io/badge/pnpm-%23F29F05?style=for-the-badge&logo=pnpm&logoColor=white)                                                                                                                                                                                                                      |
| **`Version Control`**      | ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)                                                                                                        |
| **`Workspace Management`** | ![Monorepo](https://img.shields.io/badge/Monorepo-%23009688?style=for-the-badge&logoColor=white) ![Turborepo](https://img.shields.io/badge/Turborepo-%23007ACC?style=for-the-badge&logo=Turborepo&logoColor=white)                                                                                                      |

<br />

## 📭 Git Convention

### Git Flow

```
# 메인 브랜치(Main branch)
main(master)
`main` 브랜치는 배포 가능한 상태만을 관리해요.

# develop
`develop` 브랜치는 통합 브랜치 역할을 하며, 평소에는 해당 브랜치를 기반으로 개발을 진행해요.
모든 기능이 정상적으로 동작할 수 있는 안정적인 상태를 유지하고, 모든 기능이 추가된 후  배포가 가능한 상태라면 `main`브랜치에 `merge` 해요.

# 피쳐 브랜치(Feature branch)
develop 브랜치에서 분기
develop 브랜치로 merge
```

### Create Branch

```
모든 기능은 구현 이전 이슈를 생성하여 관리해요.

- 브랜치 네이밍: 구현기능 종류/간단한 기능명/#이슈번호
style/main-page/#43
refactor/edit-modal/#75
```

### Commit Convention

```
모든 작업은 develop 에서 분기된 feature 브랜치에서 진행해요.
커밋 메시지는 커밋유형: 개발한 내용에 대한 커밋 메시지
ex) `feat: 타임테이블 기능 추가`
```

| 커밋유형   | 의미                                         |
| ---------- | -------------------------------------------- |
| `feat`     | 새로운 기능 추가                             |
| `refactor` | 코드 리팩토링                                |
| `fix`      | 버그 수정                                    |
| `chore`    | 패키지 매니저, 설정 세팅                     |
| `init`     | 초기 세팅 및 종속성 추가 관련                |
| `docs`     | 문서 수정                                    |
| `design`   | CSS 및 UI 변경                               |
| `style`    | 코드 포맷팅, 세미콜론 누락 등 코드 변경 없음 |
| `test`     | 테스트 코드, 리팩토링 테스트 코드 추가       |

<br />

## 📚 ISSUE + PR Convention

### Issue - [구현기능 종류]: 작업명

- `[Feature]: 메인페이지 API 연동`

### Pull Request - 구현기능 종류(패키지명): 작업명

- `Feature(design-system): 공통 버튼컴포넌트 제작`
- `Feature(client): 메인페이지 API 연동`
- 루트에서 설정한다면 패키지명은 생략 가능
  - `Chore: 폴더구조 세팅`

위의 형식 외에는 `탬플릿 형식`을 따라 작성

## 🗂️ Foldering

```
📦 apps
└── 📂 client
    ├── 📂 node_modules
    ├── 📂 public
    │   └── 📜 favicon.svg
    ├── 📂 src
    │   ├── 📂 pages
    │   │   ├── 📂 home
    │   │   │   ├── 📂 components
    │   │   │   ├── 📂 constants
    │   │   │   ├── 📂 hooks
    │   │   │   ├── 📂 page
    │   │   │   │   └── 📜 home.tsx
    │   │   │   │   └── 📜 home.css.ts
    │   │   │   └── 📂 types
    │   │   ├── 📂 my
    │   │   │   ├── 📂 components
    │   │   │   ├── 📂 hooks
    │   │   │   ├── 📂 page
    │   │   │   └── 📂 types
    │   │   ├── 📂 search
    │   │   │   ├── 📂 components
    │   │   │   ├── 📂 hooks
    │   │   │   ├── 📂 page
    │   │   │   └── 📂 types
    │   │   └── 📂 time-table
    │   │       ├── 📂 components
    │   │       ├── 📂 hooks
    │   │       ├── 📂 page
    │   │       └── 📂 types
    │   ├── 📂 shared
    │   │   ├── 📂 apis
    │   │   │   └── 📜 api.ts
    │   │   ├── 📂 assets
    │   │   │   └── 📂 images
    │   │   ├── 📂 components
    │   │   │   │   └── 📂 button
    │   │   │   │   │   └── 📜 button.tsx
    │   │   │   │   │   └── 📜 Button.stories.ts
    │   │   │   │   │   └── 📜 button.tsx
    │   │   ├── 📂 constants
    │   │   ├── 📂 hooks
    │   │   ├── 📂 pages
    │   │   ├── 📂 router
    │   │   ├── 📂 styles
    │   │   └── 📂 utils
    │   │       └── 📜 query-client.ts
    │   ├── 📜 App.tsx
    │   ├── 📜 main.tsx
    │   └── 📜 vite-env.d.ts
    ├── 📜 .eslintrc.cjs
    ├── 📜 .gitignore
    ├── 📜 index.html
    ├── 📜 package.json
    ├── 📜 tsconfig.json
    └── 📜 vite.config.ts

```
