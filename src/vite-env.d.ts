/// <reference types="vite/client" />
// src/vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_API_PREFIX: string;
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_WEB_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_COPYRIGHT: string;
  readonly VITE_APP_TEL: string;
  readonly VITE_APP_EMAIL: string;
  readonly VITE_APP_USE_MOCK: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
