# 배포 계획 작성 도구 (Deployment Planner)

이 애플리케이션은 서버 배포 계획을 단계별로 작성하고 PDF로 다운로드할 수 있는 React 기반 웹 애플리케이션입니다.

## 기능

- **1단계: 기본 정보 입력**
  - 프로젝트명 입력
  - 배포 환경 선택 (개발/스테이징/프로덕션)
  - 예상 소요 시간 설정
  - 서버 수 조정

- **2단계: 서버 설정**
  - 각 서버의 이름과 타입 설정
  - 서버 타입별 아이콘 자동 표시

- **3단계: 배포 순서 정의**
  - 드래그 앤 드롭으로 배포 순서 조정
  - 의존성을 고려한 순서 설정

- **4단계: 상세 설정**
  - 각 서버별로 다음 정보 설정 가능:
    - 환경변수 (추가/삭제 가능)
    - SQL 스크립트 (추가/삭제 가능)
    - 롤백 포인트 및 복구 절차

- **5단계: 결과 확인 및 PDF 생성**
  - 배포 계획 요약 확인
  - 요약된 정보로 PDF 다운로드 기능 (한글 인코딩 지원)

## 사용된 기술

- React 18.2.0
- React Router DOM (페이지 라우팅)
- React Beautiful DnD (드래그 앤 드롭 기능)
- React-to-PDF (PDF 생성)
- Styled Components (스타일링)

## 설치 및 실행 방법

1. 저장소 클론 또는 다운로드
   ```
   git clone <repository-url>
   cd deployment-planner
   ```

2. 의존성 설치
   ```
   npm install
   ```

3. 개발 서버 실행
   ```
   npm start
   ```

4. 브라우저에서 애플리케이션 접속
   ```
   http://localhost:3000
   ```

## 주의사항

- PDF 다운로드 기능은 브라우저 환경에서만 작동합니다.
- 한글 인코딩이 제대로 작동하도록 UTF-8 설정이 적용되어 있습니다.

## 기타 명령어

### `npm test`

테스트 러너를 실행합니다.
자세한 내용은 [테스트 실행하기](https://facebook.github.io/create-react-app/docs/running-tests)를 참조하세요.

### `npm run build`

프로덕션용 앱을 `build` 폴더에 빌드합니다.
React를 프로덕션 모드로 올바르게 번들링하고 최상의 성능을 위해 빌드를 최적화합니다.

빌드가 최소화되고 파일 이름에 해시가 포함됩니다.
앱을 배포할 준비가 되었습니다!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
