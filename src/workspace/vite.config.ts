import path from "path"
import { defineConfig, loadEnv, Plugin } from "vite"
import { TransformOption, viteStaticCopy } from "vite-plugin-static-copy"

const PORT = Number(process.env.PORT) || 2017

function getBaseUrl(dev: boolean) {
  return dev
    ? `http://localhost:${PORT}`
    : `${process.env.DOMAIN || ""}${process.env.URL_PATH || ""}` || ""
}

const copyOpenfinPlugin = (
  isDev: boolean,
  env: string,
  reactiveAnalyticsUrl: string,
): Plugin[] => {
  const transform: TransformOption | undefined = (contents) =>
    contents
      // Reactive Trader (FX) URL from .env
      .replace(
        /<RT_URL>/g,
        isDev && process.env.VITE_RT_URL
          ? process.env.VITE_RT_URL
          : getBaseUrl(isDev).replace("/workspace", ""),
      )
      // Reactive Analytics URL from .env
      .replace(/<RA_URL>/g, reactiveAnalyticsUrl)
      .replace(/<BASE_URL>/g, getBaseUrl(isDev))
      .replace('"<SHOW_PROVIDER_WINDOW>"', `${isDev}`)

  return viteStaticCopy({
    flatten: true,
    targets: [
      {
        src: "config/*",
        dest: "config",
        transform,
      },
    ],
  })
}

const setConfig = ({ mode }) => {
  const env = process.env.ENVIRONMENT || "local"
  const reactiveAnalyticsUrl =
    env === "local"
      ? "http://localhost:3005"
      : `https://${
          env === "prod" ? "demo" : env
        }-reactive-analytics.adaptivecluster.com`

  // ensure we have a RA URL in the env for OpenFin substitution
  // AND in the code for use in Home search responses
  process.env = {
    VITE_RA_URL: reactiveAnalyticsUrl,
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  }

  const isDev = mode === "development"
  const baseUrl = getBaseUrl(isDev)
  const plugins = [copyOpenfinPlugin(isDev, env, process.env.VITE_RA_URL!)]

  return defineConfig({
    base: baseUrl,
    build: {
      sourcemap: true,
    },
    server: {
      port: PORT,
      proxy: {
        "/ws": {
          target:
            process.env.VITE_HYDRA_URL ||
            "wss://trading-web-gateway-rt-dev.demo.hydra.weareadaptive.com",
          changeOrigin: true,
          ws: true,
        },
      },
    },
    resolve: {
      // see https://vitejs.dev/config/shared-options.html#resolve-alias
      // then https://github.com/rollup/plugins/tree/master/packages/alias#entries
      // originally inspired by https://github.com/vitejs/vite/issues/279
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins,
  })
}

export default setConfig
