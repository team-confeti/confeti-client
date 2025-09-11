<br>

<p align="left">
  <img src="https://github.com/user-attachments/assets/99db3eda-073a-4b05-bb51-7eacb1fbbb44" alt="로고" width="17%" />
</p>

> **공연의 설렘부터 감동까지, 공연의 유기적인 흐름을 설계하다.**  
> > 콘페티는 페스티벌과 공연 정보를 한눈에 보고, 예매 일정과 아티스트 소식을 효율적으로 관리할 수 있는 플랫폼이에요. <br>
공연을 준비·관람·공유까지 이어지는 전 과정을 담아낼 수 있는 플랫폼으로 자리매김하고, 공연 경험의 감동과 여운을 확장할 수 있는 방향을 고려했어요.

<br>

[![CONFETI 바로가기](https://img.shields.io/badge/🔗%20CONFETI-바로가기-B5F602?style=for-the-badge&logoColor=white&labelColor=323339)](https://www.confeti.co.kr/)
[![CONFETI 팀블로그 바로가기](https://img.shields.io/badge/🔗%20CONFETI%20팀%20블로그-바로가기-B5F602?style=for-the-badge&logoColor=white&labelColor=323339)](https://confeti.palms.blog/)
![앱잼 35th 우수상](https://img.shields.io/badge/🏆%20SOPT%2035기%20앱잼-우수상%20수상작-B5F602?style=for-the-badge&logoColor=white&labelColor=323339)

<br />

## Service Overview
<img width="100%" alt="서비스설명1" src="https://github.com/user-attachments/assets/06828f33-cd73-48bf-95f6-6360b380a9a2" />
<img idth="100%" alt="서비스설명2" src="https://github.com/user-attachments/assets/798a2ef3-d5af-4257-81f8-d2ad752a2dda" />
<img width="100%" alt="서비스설명3" src="https://github.com/user-attachments/assets/cc9a2004-8ac7-42a3-aca6-7cab86b396c4" />
<img width="100%" alt="서비스설명4" src="https://github.com/user-attachments/assets/6ba1c190-9c3c-4a7c-910c-d63319d45a54" />

<br />
<br />

## Architecture

```
CONFETI (Turborepo Monorepo)
├── apps/
│   ├── client/          # 메인 웹 애플리케이션 (React + Vite)
│   └── admin/           # 관리자 페이지 (React + Vite)
├── packages/
│   ├── design-system/   # 공통 UI 컴포넌트 (Storybook)
│   ├── core/           # 비즈니스 로직
│   └── utils/          # 공통 유틸리티
└── config/
    ├── eslint/         # ESLint 설정
    └── typescript/     # TypeScript 설정
```

<br />

## Tech Stack
<table width="100%" style="table-layout: fixed;">
  <thead>
    <tr>
      <th align="left" style="width: 180px;">Category</th>
      <th align="left">Tools</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Environment</td>
      <td>
        <img src="https://img.shields.io/badge/Node.js-v22.12.0-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
      </td>
    </tr>
    <tr>
      <td>FE Frameworks</td>
      <td>
        <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
        <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
        <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
      </td>
    </tr>
    <tr>
      <td>State & Networking</td>
      <td>
        <img src="https://img.shields.io/badge/TanStack%20Query-5.0-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query" />
        <img src="https://img.shields.io/badge/React%20Router-v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
        <img src="https://img.shields.io/badge/Axios-1.6-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
      </td>
    </tr>
    <tr>
      <td>Styling & Design System</td>
      <td>
        <img src="https://img.shields.io/badge/Vanilla%20Extract-1.17-DB7093?style=for-the-badge&logo=css3&logoColor=white" alt="Vanilla Extract" />
        <img src="https://img.shields.io/badge/Storybook-8.0-FF4785?style=for-the-badge&logo=storybook&logoColor=white" alt="Storybook" />
      </td>
    </tr>
    <tr>
      <td>Build & Tooling</td>
      <td>
        <img src="https://img.shields.io/badge/Turborepo-2.5-EF4444?style=for-the-badge&logo=turborepo&logoColor=white" alt="Turborepo" />
        <img src="https://img.shields.io/badge/pnpm-10.12-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
        <img src="https://img.shields.io/badge/Monorepo-Architecture-00D4AA?style=for-the-badge&logo=git&logoColor=white" alt="Monorepo" />
      </td>
    </tr>
    <tr>
      <td>Formatting & Workflow</td>
      <td>
        <img src="https://img.shields.io/badge/ESLint-9.0-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
        <img src="https://img.shields.io/badge/Prettier-3.5-F7B93E?style=for-the-badge&logo=prettier&logoColor=white" alt="Prettier" />
        <img src="https://img.shields.io/badge/Husky-9.1-42B883?style=for-the-badge&logo=git&logoColor=white" alt="Husky" />
      </td>
    </tr>
    <tr>
      <td>Monitoring & Analytics</td>
      <td>
        <img src="https://img.shields.io/badge/Sentry-Monitoring-362D59?style=for-the-badge&logo=sentry&logoColor=white" alt="Sentry" />
        <img src="https://img.shields.io/badge/Amplitude-Analytics-1F4B99?style=for-the-badge&logo=amplitude&logoColor=white" alt="Amplitude" />
      </td>
    </tr>
    <tr>
      <td>Version Control</td>
      <td>
        <img src="https://img.shields.io/badge/Git-F05033?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
      </td>
    </tr>
  </tbody>
</table>


<br />

## Confeti FE Developers
<div align="center">
  <table>
    <thead>
      <tr>
        <th>강민하</th>
        <th>곽지욱</th>
        <th>김다현</th>
        <th>김채은</th>
        <th>김한서</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <img 
            src="https://github.com/user-attachments/assets/8a6297f6-eb21-4b42-b5fd-9f204a4eed1b" 
            alt="강민하" 
            style="width: 140px; height: 224px"
          />
        </td>
        <td>
          <img 
            src="https://github.com/user-attachments/assets/526939ca-f0fd-4172-a916-cfa8e491b6a8" 
            alt="곽지욱" 
            style="width: 140px; height: 224px"
          />
        </td>
        <td>
          <img 
            src="https://github.com/user-attachments/assets/682d7270-59bf-470c-b835-cece8b071105" 
            alt="김다현" 
            style="width: 140px; height: 224px"
          />
        </td>
        <td>
          <img 
            src="https://github.com/user-attachments/assets/28198f3e-4344-4eee-a2b3-550be4805873" 
            alt="김채은" 
            style="width: 140px; height: 224px"
          />
        </td>
        <td>
          <img 
            src="https://github.com/user-attachments/assets/5eb7767c-29c4-483c-b8ff-117993756f08" 
            alt="김한서" 
            style="width: 140px; height: 224px"
          />
        </td>
      </tr>
      <tr align="center">
        <td>
          <a href="https://github.com/m2na7" target="_blank">@m2na7</a>
        </td>
        <td>
          <a href="https://github.com/gwagjiug" target="_blank">@gwagjiug</a>
        </td>
        <td>
          <a href="https://github.com/daahyunk" target="_blank">@daahyunk</a>
        </td>
        <td>
          <a href="https://github.com/bongtta" target="_blank">@bongtta</a>
        </td>
        <td>
          <a href="https://github.com/seueooo" target="_blank">@seueooo</a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<br />

