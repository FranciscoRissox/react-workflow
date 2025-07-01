import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'
import dts from 'vite-plugin-dts'
import {libInjectCss} from 'vite-plugin-lib-inject-css'
import {glob} from 'glob'
import {relative,extname} from 'node:path'
import {fileURLToPath} from 'node:url'

export default defineConfig({
  plugins: [react(), dts({include:["lib"]}), libInjectCss()],
  build:{
    lib:{
      formats:['es'],
      entry:resolve(__dirname,'lib','main.ts'),
    },
    copyPublicDir: false,
    rollupOptions:{
      external:['react','react-dom','react/jsx-runtime'],
      input: Object.fromEntries(
        glob.sync('lib/**/*.{ts,tsx}', {
          ignore: ["lib/**/*.d.ts"],
        }).map(file => [
         // The name of the entry point
         // lib/nested/foo.ts becomes nested/foo
         relative(
           'lib',
           file.slice(0, file.length - extname(file).length)
         ),
         // The absolute path to the entry file
         // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
         fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      }
    }
  }
})
