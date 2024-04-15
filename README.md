<div align="center">
  
![image](https://github.com/sueWavy/project_pet/assets/148526219/ccbd8fd9-a8f4-4b0d-833f-18343e0c4433)

# 반려견 커뮤니티 멍미팅 !

반려견을 키우는 견주들이 모여 함께 산책하거나 소통할 수 있는 사이트를 기획하여 개발했습니다. <br/>
( 개발 기간 : 2024.03.04 ~ 04.01 )

## 💻 사용 기술 스택

</div>

<div align="center">
  
![image](https://github.com/sueWavy/project_pet/assets/148526219/0e605e5d-aafe-4cbb-869b-36ef1167ce58)


## 🗂️ 폴더 구조 트리

</div>

```
📦 
├─ .eslintrc.cjs
├─ .gitignore
├─ README.md
├─ index.html
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ thumbnail.png
│  ├─ favicon.png
│  └─ vite.svg
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ dog.mp4
│  │  ├─ noFeed.mp4
│  │  ├─ noPage.mp4
│  │  ├─ noProfile.jpg
│  │  ├─ react.svg
│  │  ├─ writeDark.png
│  │  └─ zustand.png
│  ├─ components
│  │  ├─ AddPet.tsx
│  │  ├─ CommentBar.tsx
│  │  ├─ CustomPagination.tsx
│  │  ├─ EditInfo.tsx
│  │  ├─ Feed.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Header.tsx
│  │  ├─ Map.tsx
│  │  ├─ ScrollTopBtn.tsx
│  │  ├─ SearchBar.tsx
│  │  ├─ ThemeBtn.tsx
│  │  └─ weather
│  │     ├─ CitySelector.tsx
│  │     ├─ Loader.tsx
│  │     └─ WeatherBar.tsx
│  ├─ hooks
│  │  ├─ useComment.ts
│  │  ├─ useFeed.ts
│  │  ├─ useGetData.ts
│  │  ├─ useLikes.ts
│  │  ├─ useLogin.ts
│  │  ├─ usePageTitle.ts
│  │  ├─ useProfile.ts
│  │  └─ useWrite.ts
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ Home.tsx
│  │  ├─ Kakao.tsx
│  │  ├─ Login.tsx
│  │  ├─ MyPage.tsx
│  │  ├─ NotFound.tsx
│  │  ├─ ProtectRoute.ts
│  │  └─ Write.tsx
│  ├─ store
│  │  └─ User.ts
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ tsconfig.json
├─ tsconfig.node.json
├─ vercel.json
├─ vite.config.ts
├─ vite
│  ├─ .gitignore
│  ├─ README.md
│  ├─ index.html
│  ├─ package.json
│  ├─ pnpm-lock.yaml
│  ├─ public
│  │  └─ vite.svg
│  ├─ src
│  │  ├─ App.vue
│  │  ├─ assets
│  │  │  └─ vue.svg
│  │  ├─ components
│  │  │  └─ HelloWorld.vue
│  │  ├─ main.js
│  │  └─ style.css
│  └─ vite.config.js
└─ yarn.lock
```

<div align="center">
  
## 주요 기능 구현
### 소셜 로그인
![Apr-15-2024 15-31-50](https://github.com/sueWavy/project_pet/assets/148526219/15aebf11-d9d7-4b1e-a507-a6f31d16a6b7) <br/><br/>
구글과 카카오를 이용하여 사이트에 로그인할 수 있습니다. <br/>
로그인시 연동된 소셜에 저장되어있는 프로필과 정보를 받아와 사용합니다. <br/>

### 정보 수정
![Apr-15-2024 15-36-40](https://github.com/sueWavy/project_pet/assets/148526219/5517a21c-c5a3-4ce3-bdb5-8728a3e08afe) <br/><br/>
사용자의 프로필 사진과 이름, 반려견등의 정보 수정이 가능합니다. <br/>
변경된 내용은 게시글 및 댓글에 바로 반영됩니다. <br/>

### 다크 모드
![Apr-15-2024 15-40-03](https://github.com/sueWavy/project_pet/assets/148526219/bd20a0cc-7a58-4935-aa37-f0fc98c73649) <br/><br/>
기본 라이트 모드와 다크 모드를 구현했습니다. <br/>
변경된 테마는 로그아웃, 새로고침을 해도 그대로 유지됩니다. <br/>

### 실시간 날씨 정보
![Apr-15-2024 15-42-29](https://github.com/sueWavy/project_pet/assets/148526219/1031268e-dfcd-4c88-abad-5c3b712dc7bd) <br/><br/>
Open Weather API를 사용해 현재 (대한민국) 날씨를 알려줍니다. <br/>
지역별로 아침/저녁 별로 날씨 정보를 이미지와 함께 나태냅니다. <br/>

### 게시글 작성 및 수정,삭제
![Apr-15-2024 15-46-35](https://github.com/sueWavy/project_pet/assets/148526219/6bfafa62-fbaf-44f2-ad6f-3e37a36f217c) <br/>
![Apr-15-2024 15-47-23](https://github.com/sueWavy/project_pet/assets/148526219/2f3f51ee-5ce1-48a9-9d4d-39bb17b0c714) <br/><br/>
로그인 상태일시 게시글을 작성 및 수정할 수 있습니다. <br/>
게시글 작성시 화면 이동 후 스크롤업하여 자신의 작성글을 바로 확인할 수 있습니다. <br/>
게시글 작성시 이미지를 제외한 입력폼을 전부 작성해야 작성이 가능하며 <br/>
카카오 지도와 다음 주소 API를 이용해 주소 검색과 지도를 띄워줍니다. <br/>
피드에서 본인이 작성한 게시글에만 수정 및 삭제하기 레이아웃이 나타나며 <br/>
원하는 부분의 내용을 수정하거나 삭제할 수 있습니다. <br/>

### 댓글
![Apr-15-2024 15-52-31](https://github.com/sueWavy/project_pet/assets/148526219/6890c32a-0d29-44aa-8447-27f940ca2d1b) <br/><br/>
로그인 상태일시 댓글을 작성할 수 있으며 본인의 댓글에만 삭제하기 레이아웃이 나타나 삭제할 수 있습니다. <br/>

### 페이지네이션, 스크롤업
![Apr-15-2024 15-55-21](https://github.com/sueWavy/project_pet/assets/148526219/54cd8854-5ff0-424d-8d1c-71880ed51578) <br/><br/>
페이지네이션으로 한 페이지에 최대 6개의 게시글을 보여줍니다. <br/>
처음 페이지와 마지막 페이지로 이동할 수 있으며 화면에서 일정 크기를 내려갈시 스크롤업 버튼이 나타나 이용할 수 있습니다. <br/>

### 좋아요(즐겨찾기), 게시글 필터링 및 검색
![Apr-15-2024 16-01-08](https://github.com/sueWavy/project_pet/assets/148526219/141bc483-ba74-4c5a-b183-39ce81c29ff9)
![Apr-15-2024 16-07-28](https://github.com/sueWavy/project_pet/assets/148526219/97332c32-ec2a-46eb-a64f-ee5072e588dc) <br/><br/>
최신순, 오래된순, 댓글순, 좋아요순으로 게시글을 필터링할 수 있습니다. <br/>
즐겨찾기(하트)를 누르면 이용자가 좋아요를 누른 게시글만 보여주며 좋아요를 누른 게시글들로 필터링 해줍니다. <br/>
검색 기능도 위와 같이 동작합니다. <br/>

### 반응형
![Apr-15-2024 16-11-23](https://github.com/sueWavy/project_pet/assets/148526219/b39e0117-6785-4985-9733-8da7a984a048) <br/><br/>
화면의 크기에 따라 사이트가 반응하여 레이아웃이 변화합니다. <br/>

## 더 자세한 프로젝트 기능 설명과 트러블슈팅 및 회고록
https://sue97.tistory.com/68

## 프로젝트 배포 주소
Vercel을 이용하여 프로젝트를 배포했습니다.(도메인은 가비아 이용) <br/>
https://www.mungmeeting.site/

</div>
