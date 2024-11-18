# 프로젝트 벡엔드 설정

이 프로젝트의 Node.js와 npm의 버전 정보입니다

- Node.js: `v20.18.0`
- npm: `v10.8.2`

## 기술 스택 및 설정

- **express**: 유연하고 빠르게 웹 서버를 개발하기 위한 프레임워크
- **dotenv**: 중요한 환경변수 관리를 위해 사용
- **ODM**: mongoDB를 자바스크립트 문법을 통해 사용하기 위해 mongoose 사용
- **bcryptjs**: 비밀번호 암호화를 위해 사용
- **cors**: CORS(Cross-Origin Resource Sharing)를 설정하고 관리를 위해 사용
- **jsonwebtoken**: Token 방식의 로그인 방식을 위해 사용

## 폴더 및 파일 구조

- **폴더 구조**
    - `controller`: 각 도메인별 컨트롤러를 모아 놓은 폴더
    - `models`: 객체로 만든 도메인을 모아 놓은 폴더
    - `routers`: 도메인별 EndPoint 설정을 모아 놓은 폴더

```
Back/
├── controller/          # 도메인별 컨트롤러 모음
├── models/              # 도메인 객체 모음
└── routes/              # 라우팅 설정 관련 폴더
```

## 환경 변수 설정

`.env` 파일을 활용해서 환경 변수를 활용하고 있습니다. <br/> **각자 `.env` 파일을 생성**하여 아래와
같은 방식으로 환경 변수를 정의해 주세요. <br/>변수명은 프로젝트 내에서 통일해서 사용합니다.(팀내 설정예정)

```plaintext
# 예시: .env 파일
PORT=버거킹-통세우와퍼
SERVER_DB_ADDRESS=https://파이브가이즈-올더웨이더블치즈버거
```

## 프로젝트 설정 및 실행

### 의존성 설치

```
npm install
```

### 개발서버 실행

```
npm start
```