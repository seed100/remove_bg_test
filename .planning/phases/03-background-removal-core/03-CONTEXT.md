# Phase 3: Background Removal Core - Context

**Gathered:** 2026-04-29
**Status:** Ready for planning

<domain>
## Phase Boundary

`@imgly/background-removal-node` 모듈을 연동하여 실제 이미지의 배경을 제거하고 PNG로 반환하는 핵심 비즈니스 로직 구현

</domain>

<decisions>
## Implementation Decisions

### 모델 로딩 전략
- **D-01:** 서버 시작 시점에 모델을 미리 로드(Warm-up)하여 사용자 첫 요청 시의 지연 시간을 방지

### 배경 제거 엔진 설정
- **D-02:** `@imgly/background-removal-node`의 기본 설정을 사용하며, 노드 환경에 맞는 최적화 옵션 적용

### 결과 반환 방식
- **D-03:** 처리된 이미지 데이터를 `Buffer` 형태로 받아 HTTP 응답의 body에 직접 담아 PNG 형식으로 반환

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

- `@imgly/background-removal-node` 공식 문서 및 Node.js 구현 예제 확인 필수

</canonical_refs>

<specifics>
## Specific Ideas

- `src/services/imageService.ts`를 생성하여 배경 제거 로직을 캡슐화
- `imageRoutes.ts`에서 해당 서비스 호출하도록 업데이트

</specifics>

<deferred>
## Deferred Ideas

None

</deferred>

---

*Phase: 03-background-removal-core*
*Context gathered: 2026-04-29 via /gsd-discuss-phase (Recommended Approach)*
