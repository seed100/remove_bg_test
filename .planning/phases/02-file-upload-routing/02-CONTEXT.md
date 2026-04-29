# Phase 2: File Upload & Routing - Context

**Gathered:** 2026-04-29
**Status:** Ready for planning

<domain>
## Phase Boundary

이미지 업로드 엔드포인트(`POST /api/remove-bg`) 구현 및 파일 형식/용량 검증 로직 구축

</domain>

<decisions>
## Implementation Decisions

### 저장 방식
- **D-01:** `multer`의 `MemoryStorage`를 사용하여 파일을 디스크 저장 없이 메모리 버퍼로 즉시 처리

### 파일 검증 정책
- **D-02:** 허용 확장자는 `JPG`, `PNG`로 제한 (MIME type: `image/jpeg`, `image/png`)
- **D-03:** 기본 최대 파일 용량은 10MB로 설정

### API 인터페이스
- **D-04:** 엔드포인트는 `POST /api/remove-bg`를 사용하며, 파일 필드명은 `image`로 고정

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above.

</canonical_refs>

<specifics>
## Specific Ideas

- Multer middleware를 활용하여 필터 로직 구현

</specifics>

<deferred>
## Deferred Ideas

None

</deferred>

---

*Phase: 02-file-upload-routing*
*Context gathered: 2026-04-29 via /gsd-discuss-phase*
