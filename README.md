# FlashLoL

- 이메일 : brb1111@naver.com

## 📢 프로젝트 소개 

Typescript와 React, Redux, Redux-saga Riot API를 활용한 롤 전적검색사이트 클론 프로젝트

소환사명을 검색하며, 최근 매치의 기록들을 볼 수 있고, 천상계 랭커의 최신화된 랭킹 및 점수들을 빠르게 알 수 있다.

클라이언트와 API서버로 이루어져 있고, REST APIs 형식을 따라 구성했다.

### 👍 프로젝트 사이트 링크 
www.flashlol.site

## ⚒ 기술스택 

### 🦾 클라이언트 

- React(React-hooks)
- Redux
- Redux-saga
- Styled-Components

### 🦿 API 서버 

- express(node.js)
- MongoDB

### 💻 배포 

- GCP
- nginx
- Pm2

### 🧷 그 외 설정 

- Git
- axios
- ssl(Letsencrypt)

### 🗝 API 

- 라이엇 리그오브레전드 API

## ⚡ 주요 기술을 활용한 기능 

- 소환사 검색

  <img src="https://user-images.githubusercontent.com/48953435/128624660-1e8227ea-2bce-4c84-9ca2-a4480cc9b5f0.gif" width="300" height="300"/>
  <img src="https://user-images.githubusercontent.com/48953435/128624678-f3492dfd-12a2-4738-a680-e4e96df2687b.gif" width="300" height="300"/>

- 검색 히스토리

    <img src="https://user-images.githubusercontent.com/48953435/128624774-d936a9fd-13c8-4ce0-b5ad-72e39f8f1b04.gif" width="600" height="300"/>

- 소환사 랭킹

  <img src="https://user-images.githubusercontent.com/48953435/128624817-5253a20b-0842-4132-a1e0-bf6137aadf7c.gif" width="600" height="300"/>

- 반응형 페이지

  <img src="https://user-images.githubusercontent.com/48953435/128624876-90c17538-08d1-4979-b96a-c9f40ac682d7.gif" width="300" height="300"/>
  <img src="https://user-images.githubusercontent.com/48953435/128624912-263b07d5-5a56-4496-a8b0-d8e1cf8f7a82.gif" width="300" height="300"/>

## 🖋 배운점 

사용한 API의 특징은 SummonerID나 AccountID, LeagueID 등 으로 각각의 API 들을 호출하는 형식이라 관계형 DB를 사용하는 느낌이 들었습니다.
타입스크립트 핸드북을 보면서 타입을 지정하도록 노력했고, 언어의 활용도와 생산성에 대해 많이 생각해볼 수 있었습니다.

그리고 전 프로젝트에서 Redux로 상태관리를 하긴 해봤는데 처음 사용해봤었고 useState나 props을 더 많이 사용해 redux를 다양하게 활용하지 못했다. 하지만 이번엔 전체 state를 redux를 활용하였고, ducks패턴으로 구조를 짜서 각각의 reducer를 모듈로 관리할 수 있어 좋았습니다.
redux-saga를 활용해 비동기적으로 액션을 처리하면서 순수한 객체를 반환하는 과정이 너무 깔끔하다고 느꼈습니다.

여러 사이트의 디자인을 참고하여 페이지의 UI를 구현하면서 다양한 방식의 CSS기법을 사용할 수 있어 많이 배울 수 있었습니다.

원래 배포를 하나의 인스턴스로 진행하려했는데 https문제때문에 두개의 인스턴스를 구동 해야했습니다.

GCP 배포구조를 클라이언트와 API서버로 나눴기에 두개의 인스턴스를 구동했고,

클라이언트는 nginx & SSL을 사용하여 빌드된 파일을 올리는 것에 성공했습니다.
서버 부분는 nginx와 certbot으로 api서버를 SSL인증서를 발급했고 프록시 서버 역할을 맡았습니다. 그래서 프록시 패스를 통해 pm2를 활용하여 구동하고 있는 서버를 가리켰고 현재 API서버 구동중이며 연결 성공했습니다.

현재는 웹에서 flashlol.site 를 주소에 적으면 www.flashlol.site 로 리다이렉팅 하는 것을 하고 있습니다. 
-> 210817 새벽 2시 해결! 복수의 도메인 인증서를 만들어서 443 ssl 키연결하고 return 301 www.flashlol.site 로 하는 것으로 해결. 🎺

배포 과정에서 인스턴스 삭제, 생성, nginx 설정 오류, 인증서 잘못 발급, 도메인문제 등 긴 시간의 뻘짓(?)이였지만 결국 완전히 해결!!!!!!!!!1

다음 프로젝트는 한분이랑 협업하고, 질문하면서 배웠던 로드밸런서로 인스턴스 관리해봐야겠다.

