import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        '@contexts': path.resolve(__dirname, 'src/contexts'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@helpers': path.resolve(__dirname, 'src/helpers'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@models': path.resolve(__dirname, 'src/models'),
        '@services': path.resolve(__dirname, 'src/service'),
        '@': path.resolve(__dirname, './src'),
    }
},
})
