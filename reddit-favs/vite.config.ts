import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: (process.env.PORT as any as number) || 3000,
  },
  ssr: {
    noExternal: [
      /^@mui\//,
      /^@mui\/lab/,
      /^@mui\/icons-material/,
      "remix-utils",
    ],
  },
  plugins: [
    reactRouter(),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    include: [
      "@mui/material",
      '@emotion/styled',
      '@mui/icons-material',
    ],
    esbuildOptions: {
      mainFields: ['module', 'main'],
    }
  }
});