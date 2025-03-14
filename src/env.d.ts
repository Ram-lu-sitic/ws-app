/// <reference types="@rsbuild/core/types" />

declare namespace NodeJS {
    interface ProcessEnv {
      PUBLIC_WEBSOCKET_URL?: string; // Opcional, con fallback en el código
    }
  }