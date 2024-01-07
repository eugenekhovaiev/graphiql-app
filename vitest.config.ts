import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(), stubNextAssetImport()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    coverage: {
      include: ['src/**'],
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: 'src', replacement: path.resolve(__dirname, './src') },
    ],
  },
});

interface Code {
  code: string;
}

interface StupNextAssetImportReturnType {
  name: string;
  transform: (code: string, id: string) => Code | undefined;
}

function stubNextAssetImport(): StupNextAssetImportReturnType {
  return {
    name: 'stub-next-asset-import',
    transform(_code: string, id: string): Code | undefined {
      if (/(jpg|jpeg|png|webp|gif|svg)$/.test(id)) {
        const imgSrc = path.relative(process.cwd(), id);
        return {
          code: `export default { src: '${imgSrc}', height: 1, width: 1 }`,
        };
      }
    },
  };
}
