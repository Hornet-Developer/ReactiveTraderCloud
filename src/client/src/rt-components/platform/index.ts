export { default as Platform } from './platform'
export {
  PlatformAdapter,
  WindowConfig,
  openFinNotifications,
  setupGlobalOpenfinNotifications,
  InteropServices,
} from './adapters'
export { PlatformProvider } from './context'
export { withPlatform } from './withPlatform'
export { externalWindowDefault } from './externalWindowDefault'
