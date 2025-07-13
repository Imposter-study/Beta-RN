# 📱Beta - Zeta AI 클론코딩 프로젝트

🇰🇷 한국어 | [🇺🇸 English](./README-en.md)

## 📌 프로젝트 소개
Beta는 스캐터랩의 AI 기반 스토리텔링 챗봇 플랫폼인 ZETA AI를 클론한 프로젝트입니다.
LLM 기반 대화 생성, 캐릭터 메모리 시스템 등 AI 중심 서비스 구조를 모방 및 재구현하였으며, 이를 통해 챗봇 서비스의 프론트엔드 아키텍처를 이해하고 직접 구현했습니다.

## 👥 팀 소개
> 사기꾼 연구회  
> 구성: 프론트엔드 1명, 백엔드 4명, PM 1명

## ✨ 주요 기능

### 👤 회원기능

- 회원가입, 로그인, 로그아웃, 회원탈퇴
- 프로필 조회, 프로필 수정
- 팔로우, 언팔로우
- 소셜로그인
- 대화 프로필 생성, 조회, 수정, 삭제

### 🤖 캐릭터

- 캐릭터 생성, 조회, 수정, 삭제
- 캐릭터 스크랩
- 캐릭터 검색

### 💬 채팅

- 채팅방
  - 생성, 조회, 삭제
  - 고정 상태 변경
- 메세지
  - 메세지 전송
  - 캐릭터의 마지막 메세지 수정, 재생성
  - 메세지 삭제
  - 추천 답변 생성
- 대화내역
  - 대화내역 저장, 조회
  - 대화내역 제목 수정
  - 대화 내역 불러오기
  - 저장된 대화 내역 삭제

## 🚀 설치 및 실행 방법

```sh
# 프로젝트 클론
git clone https://github.com/Imposter-study/Beta-RN

# 디렉토리 이동
cd Beta-RN

# 의존성 설치
npm install

# expo 개발 서버 실행
npx expo start
```

## 🔧 환경 변수 설정

`config.js` 파일을 생성하고 다음과 같이 설정하세요.

```
export const DOMAIN = 'your-domain.com';

export const API_URL = `http://${DOMAIN}/api/v1/`;

export const KAKAO_CLIENT_ID = 'your_kakao_client_id';
export const KAKAO_CLIENT_SECRET = 'your_kakao_client_secret';

export const GOOGLE_CLIENT_ID = 'your_google_client_id';
export const GOOGLE_CLIENT_SECRET = 'your_google_client_secret';

export const REDIRECT_URI = `http://${DOMAIN}/api/v1/accounts/kakao/redirect/`;
export const BACKEND_LOGIN_URL = `http://${DOMAIN}/api/v1/accounts/kakao/login/`;

```

## 🛠 기술 스택

<div align="center">

![Javascript](https://img.shields.io/badge/Javascript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React-Native](https://img.shields.io/badge/ReactNative-61DAFB?style=flat&logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-1C2024?style=flat&logo=expo&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-1C2024?style=flat&logo=Zustand&logoColor=white)

</div>

## 📁 폴더 구조

```
📦 프로젝트 루트
├── 📂 apis              # API 요청 함수 모음
├── 📂 assets            # 이미지, 폰트 등 정적 리소스
├── 📂 components        # 공통 컴포넌트
├── 📂 docs              # 문서, 데모 GIF, 스크린샷 등
├── 📂 features
│   ├── 📂 auth          # 로그인, 회원가입
│   ├── 📂 chat          # 채팅 관련 화면 및 로직
│   ├── 📂 character     # 캐릭터 생성/조회/검색
│   ├── 📂 home          # 홈 화면
│   ├── 📂 mypage        # 마이페이지, 설정, 프로필
├── 📂 stores            # 상태관리 관련 (Recoil 등)
├── 📂 utils             # 공통 유틸 함수 (마크다운 처리, 이미지 관련 등)
├── 📜 App.js            # 앱 진입점
├── 📜 app.json          # Expo 앱 설정 파일
├── 📜 config.js         # 환경 설정 (API baseURL 등)
├── 📜 index.js          # 앱 루트 등록
├── 📜 package.json      # 의존성 및 스크립트
├── 📜 package-lock.json # 고정된 의존성 버전
├── 📜 README.md         # 프로젝트 설명서

```

## 📸 스크린샷

### 👤 회원기능

|회원가입 Step1|회원가입 Step2|회원가입 Step3|로그인|
|--------------|--------------|--------------|------|
|![register-Step1](https://private-user-images.githubusercontent.com/86733114/453822770-d14b5005-b7ce-4445-b58e-67163e17e33f.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzODY5NDIsIm5iZiI6MTc1MjM4NjY0MiwicGF0aCI6Ii84NjczMzExNC80NTM4MjI3NzAtZDE0YjUwMDUtYjdjZS00NDQ1LWI1OGUtNjcxNjNlMTdlMzNmLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzEzVDA2MDQwMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWVkM2I4ZjE0ZDY2MDhjOWM2MTQ0NTMxZTE1NDA1NGVmNWZmNTQ4N2EwODA1MWJhYTdhYWYzMWEwM2M4N2YzYTImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.w_2U846pSAbI1zqmranBmM1XEixgVK3Mmi-Lh4xIN0U)|![register-Step2](https://private-user-images.githubusercontent.com/86733114/453822475-e2077604-e9bc-49b9-9026-906d6f426db1.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzODY5NDIsIm5iZiI6MTc1MjM4NjY0MiwicGF0aCI6Ii84NjczMzExNC80NTM4MjI0NzUtZTIwNzc2MDQtZTliYy00OWI5LTkwMjYtOTA2ZDZmNDI2ZGIxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzEzVDA2MDQwMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY3OWZiZDM4MDMwOGQzM2NjOTJhMjY0OTQ3NzI1Yjg4M2ViMTYzYjMzY2Y0MTg1NDY3OGNlMGJlMjE2M2RiMjgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.Pj0BsR50FWGwY2fysdP3Y--78TEnjN1klYxtdU53lCk)|![register-Step3](https://private-user-images.githubusercontent.com/86733114/453822560-a1a40829-5497-4324-b24a-407a239dd094.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzODY5NDIsIm5iZiI6MTc1MjM4NjY0MiwicGF0aCI6Ii84NjczMzExNC80NTM4MjI1NjAtYTFhNDA4MjktNTQ5Ny00MzI0LWIyNGEtNDA3YTIzOWRkMDk0LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzEzVDA2MDQwMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTdjOTgzODgzODJhOTI5Y2I2YWJmM2RlMGMzZDBiYmFiY2Y5MWE3Yzk2ZDQ0ZTUwMWI5MjZkYjgzOGE1NGViMjcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.9v_qZsO_TTvQ8-9siBzWKXilrCIZdJLYX6aZ1r21V6g)|![Login](https://private-user-images.githubusercontent.com/86733114/454345262-a8139010-6ad3-4ca1-8eb0-20fe0dc20a58.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzODcxMTYsIm5iZiI6MTc1MjM4NjgxNiwicGF0aCI6Ii84NjczMzExNC80NTQzNDUyNjItYTgxMzkwMTAtNmFkMy00Y2ExLThlYjAtMjBmZTBkYzIwYTU4LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzEzVDA2MDY1NlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTA5ZmUwNjI0NTA0MDU2M2Y1YWU5NTY0ZmM4N2U2YjZiOWVlZDhlYTgyMzRmYTk2NzU1NzFmMDYwNTQwZGFlMjYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.U16FR9uWUzw_b1U7GVOnzii6I8wEfhoFQaH9_SyOHCs)|




|프로필 조회|소셜 프로필 수정|
|-----------|-----------|
|![Profile](https://private-user-images.githubusercontent.com/86733114/462394631-6dd8bb5a-e9fc-4091-b028-978d8a19ce32.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzODgwMzksIm5iZiI6MTc1MjM4NzczOSwicGF0aCI6Ii84NjczMzExNC80NjIzOTQ2MzEtNmRkOGJiNWEtZTlmYy00MDkxLWIwMjgtOTc4ZDhhMTljZTMyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzEzVDA2MjIxOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWEzOWQwMDIwZTY3MTcyNDY3NzVmODliOTc1YmQ5N2FmZWM3OGEyOGUxYWUwMzRmMjAyYWIxZThlNmNmY2JhYTYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.5BZWVGnebrpWA2K6YQOhXKdt4YNY-8UiWxTxAMyuZnY)|![SocialProfile](https://private-user-images.githubusercontent.com/86733114/455138390-86f60eb0-1951-4b65-a24f-e1ce8f91ddda.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzODcyODcsIm5iZiI6MTc1MjM4Njk4NywicGF0aCI6Ii84NjczMzExNC80NTUxMzgzOTAtODZmNjBlYjAtMTk1MS00YjY1LWEyNGYtZTFjZThmOTFkZGRhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzEzVDA2MDk0N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWU1Zjk2ODExOTM0YWIzZDI1OWY1ZjUxNzhhNjE0ZmJmMWFjYzZjZjM0NjQ3ZDg0OWY5YWIzODQ1MGY5NDExMmEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.OYfQ7doNGr18ov389xtdKNsW6bXwO1Se0NP00VcH2Bs)|


|대화 프로필 생성|대화 프로필 조회|대화 프로필 수정|대화 프로필 삭제|
|----|---|----|----|
|![create](https://github.com/user-attachments/assets/e0fcb87b-9496-4734-9c54-f05b1833656b)|![read](https://github.com/user-attachments/assets/6fe3ebb0-ac61-48f5-a579-77b54fc5a09d)|![update](https://github.com/user-attachments/assets/8cd319d1-d544-4803-b2ec-722fbcd64637)|![delete](https://github.com/user-attachments/assets/3e556a82-34df-45f5-aa82-9731daad4b62)|

|팔로우 목록|탈퇴|계정정보 수정|팔로우|
|-----|----------|------------|----|
|![팔로우 목록](https://github.com/user-attachments/assets/ce0725cb-4775-4efd-ad2f-0ef510a07723)|![탈퇴](https://github.com/user-attachments/assets/c1ff763a-8ffe-43fc-ae74-9594f080f9c9)|![정보수정](https://github.com/user-attachments/assets/5b406024-1723-480c-bf5a-9317d19985d7)|![팔로우](https://github.com/user-attachments/assets/3eb1f272-8301-48fd-9cad-ff25fa15555b)|


### 🤖 캐릭터

|캐릭터 생성 - 내용|캐릭터 생성 - 인트로|캐릭터 생성 - 상황예시|캐릭터 생성 - 소개|
|------------------|--------------------|----------------------|------------------|
|![Content](https://private-user-images.githubusercontent.com/86733114/458307879-f34b7deb-3a98-4600-9412-4451c989a932.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzODc0MzgsIm5iZiI6MTc1MjM4NzEzOCwicGF0aCI6Ii84NjczMzExNC80NTgzMDc4NzktZjM0YjdkZWItM2E5OC00NjAwLTk0MTItNDQ1MWM5ODlhOTMyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzEzVDA2MTIxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPThmNmI1M2U2MGQ0YjI2NzE0MTkyNTEzNGU5MzUyY2Y0MTE0NzVjMWNmNjg2Y2I4MWYzYjJmZjJhZWQyODBhNDcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.el-NWb4jNM_SSq7s5LIBbeoyya4xdzygBCiL3Qz9Wxc)|![Intro](https://private-user-images.githubusercontent.com/86733114/458307954-32e3ec00-c686-4aed-b24e-79d44844c699.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzODc0MzgsIm5iZiI6MTc1MjM4NzEzOCwicGF0aCI6Ii84NjczMzExNC80NTgzMDc5NTQtMzJlM2VjMDAtYzY4Ni00YWVkLWIyNGUtNzlkNDQ4NDRjNjk5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzEzVDA2MTIxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWNjY2M2MzI5M2Y1ZjZjZTNhODBmMjQ5YWFjNGM2YjkxZDhlMGY5Njg5NGUyOTNiZjY5YTdiZWNmNmNmZDdlZmMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.Mpd68efGdR-IV1YcPmhlU3sgKVT65eT1QiInmzZm9x8)|![ExampleSituation](https://private-user-images.githubusercontent.com/86733114/458307998-00ff5812-d7fd-4e43-b29f-ec60a33145c8.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzODc0MzgsIm5iZiI6MTc1MjM4NzEzOCwicGF0aCI6Ii84NjczMzExNC80NTgzMDc5OTgtMDBmZjU4MTItZDdmZC00ZTQzLWIyOWYtZWM2MGEzMzE0NWM4LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzEzVDA2MTIxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTg5NWQyM2UwZjZjZTI2M2Q1OWExMjA5ZmE0ODI2MjZhODcyMDAxZDQwMjE5Y2E2ZjA1YjlkYTNkNjZmM2ZmYWUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.lJqrlijFwuE3bYzIs7nkqFEb6wtyHTC-gTn_08mVZPQ)|![Introduce](https://private-user-images.githubusercontent.com/86733114/458308081-ca71e6a8-3101-46a3-a4e1-a77157a9211d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzODc0MzgsIm5iZiI6MTc1MjM4NzEzOCwicGF0aCI6Ii84NjczMzExNC80NTgzMDgwODEtY2E3MWU2YTgtMzEwMS00NmEzLWE0ZTEtYTc3MTU3YTkyMTFkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzEzVDA2MTIxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWFiOTljOWQwMTVkN2FhMDgzZDViYTlhYWEyZWNiZTZmODRlYjE5MmNlZjA0ZjBhY2YxNDcwMTAwYzEzODgwZTUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.9lkMm3zwRxFFpgnbpcPHjn16SFu6maWzaFAGY7I2fAw)|

|캐릭터 상세조회|캐릭터 스크랩|캐릭터 삭제|
|---------------|------------------|-----------|
|![CharacterDetail](https://private-user-images.githubusercontent.com/86733114/461033746-c3e7d6cc-40fa-479a-9cdd-c0c52fddfd16.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzODc3ODUsIm5iZiI6MTc1MjM4NzQ4NSwicGF0aCI6Ii84NjczMzExNC80NjEwMzM3NDYtYzNlN2Q2Y2MtNDBmYS00NzlhLTljZGQtYzBjNTJmZGRmZDE2LmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzEzVDA2MTgwNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWIzYjI4NzFiNTQxZGE5YWMxNDExZGMwMzc3OTc3YWRmNGM5OGQzNTJkOTE0MjJjZDJjZDQyOTczNTFkM2Y5NzkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.NKpjYCn9XWRM9c6vGwTHx2GXEnZYYCcTXJNTrNX4znU)|![ScrapCharacter](https://private-user-images.githubusercontent.com/86733114/462352091-896c99e4-ecaa-44bf-b831-8f2a490df5ff.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzODc5NjQsIm5iZiI6MTc1MjM4NzY2NCwicGF0aCI6Ii84NjczMzExNC80NjIzNTIwOTEtODk2Yzk5ZTQtZWNhYS00NGJmLWI4MzEtOGYyYTQ5MGRmNWZmLmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzEzVDA2MjEwNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTBiZDY5ZDg1Y2FmOTkzNGZhZDQ4YTcxYWJlNTY4YWE4MmIzZmIxZjU4NTZjYjMwNjJlOGUwZmNlMDZmNjY0ZDMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.2CYqgq06ESwc48o2X_40PBGW7m-qSGlGSR9gMOsG8-k)|![deleteCharacter](https://private-user-images.githubusercontent.com/86733114/462408988-26e9c914-f682-4b9f-bf0e-6ec09ac1b2e3.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIzODgxMjksIm5iZiI6MTc1MjM4NzgyOSwicGF0aCI6Ii84NjczMzExNC80NjI0MDg5ODgtMjZlOWM5MTQtZjY4Mi00YjlmLWJmMGUtNmVjMDlhYzFiMmUzLmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzEzVDA2MjM0OVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWQ2NjAxYTEwMjY5ZjRiMWFmNjdhNjExNjIwMGFkNzVmNzEwMzE2YmUxNzAzYWFkNTM5ODM2ODdlOGZlYTAwYmUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.XlJ2moL-d3eShZl9Ij3U8SlTXKTTZgp5MVKQbVmgCGs)|

### 💬 채팅

|응답 수정|메세지 삭제|메세지 재생성|추천 답변|
|--------|----------|------------|--------|
|![edit](https://github.com/user-attachments/assets/6320ab2a-8b32-45f4-a8b8-55f55adcb09b)| ![delete](https://github.com/user-attachments/assets/ae79d219-e96b-4ca6-bd76-626e9c051392)|![regen](https://github.com/user-attachments/assets/59516fb8-8115-4474-b28c-f0c05228bc58)|![suggestions](https://github.com/user-attachments/assets/4f96763c-6361-4972-b9f7-f1669d4b3f58)|

|대화 내역 저장|대화 내역 목록 조회|대화 내역 제목 수정|대화 내역 삭제|
|-------------|----------------|-----------------|------------|
|![create](https://github.com/user-attachments/assets/08cd7f18-044e-4334-a0e2-b4c0f77669b2)|![getList](https://github.com/user-attachments/assets/b52b6c88-2a7d-4006-af2e-9bab77790a5d)|![editTitle](https://github.com/user-attachments/assets/e733fad6-1e8c-4b6a-a8ea-e896d29f5948)|![delete](https://github.com/user-attachments/assets/34b1e5ae-516a-4331-91fa-39ec3591b55b)|

## 🤝 기여 방법

1. 이슈를 확인하고 작업할 항목을 선택하세요.
2. 새로운 브랜치를 생성하고 작업을 수행하세요.
3. Pull Request를 생성하여 변경 사항을 공유하세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 📬 문의 및 연락처

- Email: imposterstudy@gmail.com

