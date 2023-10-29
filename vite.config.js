import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [remix({
    cloudflare: {
      pages: true,
      devBindings: {
        textBindings: {
          SECRET_KEY: 'my-secret-key--from-dev'
        },
        kvNamespaces: ['MY_KV']
      }
    }
  })],
});