import { EXCEL_ADAPTER_NAME, PlatformName } from 'rt-platforms'
import { getEnvironment } from 'rt-util'
import { excelIcon, limitCheckerIcon, reactiveAnalyticsIcon, reactiveTraderIcon } from './icons'

// Safer than location.origin due to browser support
const ORIGIN = `${location.protocol}//${location.host}`

const defaultWindowOptions: OpenFinWindowOptions = {
  autoShow: true,
  defaultWidth: 1280,
  defaultHeight: 900,
  minWidth: 800,
  minHeight: 600,
  resizable: true,
  maximizable: true,
  defaultCentered: true,
  frame: false,
  shadow: true,
  icon: `${ORIGIN}/static/media/adaptive.ico`,
  accelerator:
    process.env.NODE_ENV !== 'development'
      ? {}
      : {
          devtools: true,
          reload: true,
          reloadIgnoringCache: true,
          zoom: true,
        },
}

const excelPreloadScripts: fin.DownloadPreloadOption[] = [
  // OpenFin Excel API not included here (not included in standard package)
  {
    url: `${ORIGIN}/plugin/service-loader.js`,
  },
  {
    url: `${ORIGIN}/plugin/fin.desktop.Excel.js`,
  },
]

type ApplicationType = 'window' | 'download' | 'application' | 'excel'

export interface ApplicationProvider {
  platformName: PlatformName
  applicationType: ApplicationType
  windowOptions?: OpenFinWindowOptions
}

export interface ApplicationConfig {
  name: string
  displayName: string
  tooltipName?: string
  uuid?: string
  url?: string
  icon: JSX.Element
  iconFillColor: string
  iconHoverFillColor?: string
  iconHoverBackgroundColor?: string
  provider?: ApplicationProvider
}

const excelJSAppConfig: ApplicationConfig = {
  name: 'Excel',
  displayName: 'EX',
  tooltipName: 'Launch Excel',
  icon: excelIcon,
  iconFillColor: '#CFCFCF',
  provider: {
    platformName: 'openfin',
    applicationType: 'excel',
    windowOptions: {
      preloadScripts: excelPreloadScripts,
      icon: `${ORIGIN}/static/media/excel-icon.ico`,
    },
  },
}

const excelLegacyAppConfig: ApplicationConfig = {
  name: 'Excel',
  displayName: 'EX',
  tooltipName: 'Launch Excel',
  icon: excelIcon,
  iconFillColor: '#CFCFCF',
  url: `${ORIGIN}/static/excel/instructions.html`,
  provider: {
    platformName: 'openfin',
    applicationType: 'application',
    windowOptions: {
      ...defaultWindowOptions,
      defaultWidth: 800,
      defaultHeight: 600,
      minWidth: 520,
      minHeight: 260,
      frame: true,
      alwaysOnTop: false,
      icon: `${ORIGIN}/static/media/excel-icon.ico`,
    },
  },
}

const excelAppConfig = EXCEL_ADAPTER_NAME === 'JS' ? excelJSAppConfig : excelLegacyAppConfig

const prodEnvs = ['demo']
const env = getEnvironment() || 'unknown'
const envFormatted = prodEnvs.includes(env) ? '' : `(${env.toUpperCase()})`

const baseAppConfigs: ApplicationConfig[] = [
  {
    name: `Reactive Trader Cloud ${envFormatted}`,
    displayName: 'RT',
    tooltipName: 'Launch Reactive Trader',
    uuid: `reactive-trader-cloud-web-${env}`,
    url: `${ORIGIN}`,
    icon: reactiveTraderIcon,
    iconFillColor: '#CFCFCF',
    iconHoverFillColor: '#ffffff',
    iconHoverBackgroundColor: '#28588d',
    provider: {
      platformName: 'openfin',
      applicationType: 'application',
      windowOptions: {
        ...defaultWindowOptions,
        preloadScripts: excelPreloadScripts,
        icon: `${ORIGIN}/static/media/reactive-trader.ico`,
      },
    },
  },
  {
    name: 'Reactive Analytics',
    displayName: 'RA',
    tooltipName: 'Launch Reactive Analytics',
    url: `http://${env === 'dev' ? env : 'demo'}-reactive-analytics.adaptivecluster.com/`,
    icon: reactiveAnalyticsIcon,
    iconFillColor: '#CFCFCF',
    iconHoverFillColor: '#ffffff',
    iconHoverBackgroundColor: '#AAABD1',
    provider: {
      platformName: 'openfin',
      applicationType: 'application',
      windowOptions: {
        ...defaultWindowOptions,
        frame: false,
        icon: `${ORIGIN}/static/media/reactive-analytics.ico`,
      },
    },
  },
  {
    name: 'Limit Checker',
    displayName: 'LC',
    tooltipName: 'Launch Limit Checker',
    icon: limitCheckerIcon,
    iconFillColor: '#CFCFCF',
    iconHoverFillColor: '#ffffff',
    provider: {
      platformName: 'openfin',
      applicationType: 'download',
      windowOptions: {
        ...defaultWindowOptions,
        icon: `${ORIGIN}/static/media/limit-checker-icon.ico`,
      },
    },
  },
  excelAppConfig,
]

export const appConfigs = baseAppConfigs
