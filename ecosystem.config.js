module.exports = {
  apps: [
    {
      name: "remove-bg-api",            // PM2에서 관리할 애플리케이션 이름입니다.
      script: "./dist/server.js",        // 빌드(tsc)된 후 실행될 JavaScript 파일의 경로입니다.
      instances: 1,                      // 실행할 프로세스 개수입니다. (필요 시 'max'로 설정해 멀티코어를 활용할 수 있습니다.)
      exec_mode: "fork",                 // 단일 인스턴스이므로 'fork' 모드를 사용합니다.
      watch: false,                      // 소스 코드 변경 감지 여부입니다. (운영 환경에서는 불필요한 재시작 방지를 위해 false를 권장합니다.)
      max_memory_restart: "500M",        // 메모리 누수를 방지하기 위해 500MB를 초과하면 프로세스를 자동으로 재시작합니다.
      env: {
        NODE_ENV: "production",          // 운영(Production) 환경 변수를 정의합니다.
        PORT: 5003                       // 실행 시 적용할 포트 번호입니다.
      }
    }
  ]
};
