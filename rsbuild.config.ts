import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: {
      'process.env.PUBLIC_WEBSOCKET_URL': JSON.stringify(process.env.PUBLIC_WEBSOCKET_URL || 'ws://localhost:4000/socket/websocket'),
    },
  },
});