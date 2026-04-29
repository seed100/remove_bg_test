# Roadmap: Background Removal API Server

## Overview

초기 v1 버전은 Node.js 서버 환경에서 multipart/form-data로 이미지를 받아 `@imgly/background-removal-node` 모듈을 이용해 배경을 제거하고, 그 결과물과 함께 로그를 남기는 완전한 엔드투엔드(End-to-End) API 서버를 구축하는 여정입니다.

## Phases

- [ ] **Phase 1: Project Setup & Express Foundation** - 기본 서버 아키텍처 및 에러 처리 구축
- [ ] **Phase 2: File Upload & Routing** - 이미지 파일 업로드 수신 및 검증 (multer)
- [ ] **Phase 3: Background Removal Core** - `@imgly/background-removal-node` 연동 및 인물 추출
- [ ] **Phase 4: Logging & Polish** - 요청 로그 기록 및 CORS 설정 적용

## Phase Details

### Phase 1: Project Setup & Express Foundation
**Goal**: 기본 Node.js + Express 서버 환경을 세팅하고, 공통 에러 처리 아키텍처 구축
**Depends on**: Nothing
**Requirements**: API-03
**Success Criteria** (what must be TRUE):
  1. 서버가 지정된 포트에서 성공적으로 시작된다.
  2. 존재하지 않는 라우트 호출 시 404를 반환한다.
  3. 서버 내부 에러 발생 시 일관된 형태의 500 에러를 반환한다.
**Plans**: 1 plan

Plans:
- [ ] 01-01: Express 서버 초기화 및 기본 에러 미들웨어 설정

### Phase 2: File Upload & Routing
**Goal**: `POST /api/remove-bg` 라우트를 생성하고 multipart/form-data 수신
**Depends on**: Phase 1
**Requirements**: API-01, API-02
**Success Criteria** (what must be TRUE):
  1. 사용자가 POST 요청으로 이미지 파일을 전송할 수 있다.
  2. 이미지 파일이 아닌 경우 400 Bad Request 에러를 반환한다.
**Plans**: 1 plan

Plans:
- [ ] 02-01: multer 설정 및 이미지 업로드 라우트 구현

### Phase 3: Background Removal Core
**Goal**: 수신된 이미지를 처리하여 인물만 추출된 투명 PNG 버퍼 반환
**Depends on**: Phase 2
**Requirements**: PROC-01, PROC-02, PROC-03
**Success Criteria** (what must be TRUE):
  1. 업로드된 이미지를 `removeBackground()` 함수를 통해 정상적으로 처리한다.
  2. 반환된 데이터를 클라이언트에게 `image/png` 형태로 응답한다.
**Plans**: 2 plans

Plans:
- [ ] 03-01: `@imgly/background-removal-node` 모듈 설치 및 초기화 모듈 작성
- [ ] 03-02: 라우트와 배경 제거 모듈 연결 및 PNG 응답 처리

### Phase 4: Logging & Polish
**Goal**: 서버 상태 파악을 위한 파일 기반 로그 기록 및 외부 연동을 위한 CORS 설정
**Depends on**: Phase 3
**Requirements**: API-04, LOG-01, LOG-02
**Success Criteria** (what must be TRUE):
  1. 외부 도메인에서 브라우저를 통해 API를 호출해도 CORS 에러가 발생하지 않는다.
  2. 요청과 응답의 주요 정보(도메인, 소요 시간)가 일자별 로그 파일에 정상적으로 기록된다.
**Plans**: 1 plan

Plans:
- [ ] 04-01: winston/pino 로거 설정 및 CORS 미들웨어 적용

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Setup | 0/1 | Not started | - |
| 2. File Upload | 0/1 | Not started | - |
| 3. Removal Core | 0/2 | Not started | - |
| 4. Logging & Polish | 0/1 | Not started | - |
