import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  const port = Number(process.env.PORT ?? (process.env.CODESPACE_NAME ? 4281 : 4280))
  const codespaceHost = process.env.CODESPACE_NAME && process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
    ? `${process.env.CODESPACE_NAME}-${port}.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
    : undefined

  return {
    plugins: [react()],
    server: {
      port,
      strictPort: true,
      // Codespacesの転送先だけを追加し、通常のローカル実行は既定の許可範囲を使う。
      allowedHosts: codespaceHost ? [codespaceHost] : [],
      // CodespacesのHTTPS転送先で、画面と同じ公開ポートをホットリロードにも使う。
      ws: codespaceHost ? { protocol: 'wss', host: codespaceHost, clientPort: 443 } : undefined,
    },
  }
})
