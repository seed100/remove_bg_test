# Background Removal API Server

## What This Is

이미지에서 인물만 추출하는 기능을 제공하는 API 서버입니다. 여러 외부 사이트에서 동시에 요청을 받아 처리하며, `@imgly/background-removal` 모듈을 사용하여 배경을 제거한 뒤 인물만 추출된 PNG 파일을 반환합니다.

## Core Value

어떤 환경의 요청이든 안정적이고 빠르며 정확하게 인물 배경 제거 결과를 반환하는 것.

## Requirements

### Validated

- [x] 서버 내부 오류 발생 시 적절한 에러 메시지 반환 (HTTP 500) — Validated in Phase 1
- [x] 이미지 업로드 및 수신 처리 — Validated in Phase 2
- [x] 여러 외부 사이트의 동시 요청을 처리할 수 있는 기본 비동기 서버 아키텍처 구축 — Validated in Phase 2
- [x] `@imgly/background-removal` 모듈을 이용한 인물 추출 처리 (Node.js 환경 최적화) — Validated in Phase 3
- [x] 처리된 이미지를 PNG 파일로 반환 — Validated in Phase 3
- [x] 서버 사용량 및 상태 모니터링을 위한 파일 기반 로그 기록 (요청 도메인, 처리 시간 등) — Validated in Phase 4

### Active (None - Project Complete)

### Out of Scope

- 워커 스레드(Worker Threads)를 이용한 복잡한 병렬 처리 시스템 — 초기 버전의 복잡도를 낮추기 위해 제외, 향후 성능 병목 시 도입
- 복잡한 API Key 및 도메인 제한 기반의 인증 체계 — 완전 공개(Public) 형태의 API로 시작

## Context

- 사용 기술: Node.js, `@imgly/background-removal` (WASM 기반)
- `@imgly/background-removal`은 브라우저 환경에 최적화되어 있으므로, Node.js 환경에서 모델 서빙 및 WASM 모듈 로드 방식에 대한 세팅이 필요합니다.
- 다양한 외부 사이트에서의 자유로운 호출을 허용합니다(CORS 오픈).
- 파일 기반 로깅을 통해 나중에 시스템의 성능이나 에러를 추적할 수 있도록 구성합니다.

## Constraints

- **성능**: 동시에 여러 요청을 안정적으로 소화해야 함 (기본 비동기 방식으로 우선 구현)
- **접근성**: 제한 없이 누구나 접근 가능한 공개 API (추후 보안 요구사항 발생 시 변경 가능)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 기본 비동기 방식 채택 | 초기 구현의 복잡도를 줄이고 빠르게 런칭하기 위해. 부하 증가 시 Worker Threads 검토 | — Pending |
| 파일 기반 로깅 적용 | 터미널 출력 대신 영구적인 로그 확인 및 문제 추적 용이성을 위해 | — Pending |
| 완전 공개(Public) API | 다양한 사이트에서 쉽게 연동 테스트 및 사용할 수 있게 접근성을 높이기 위해 | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-29 after initialization*
