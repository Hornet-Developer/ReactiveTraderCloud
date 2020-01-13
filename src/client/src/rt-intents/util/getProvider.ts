import { OpenFinFDC3, FDC3 } from '../fdc3'
import { NoopProvider } from '../noop'

const isOpenFin = 'fin' in window

export const getProvider = () => {
  if (isOpenFin) {
    const openFinFDC3 = new OpenFinFDC3()
    return new FDC3(openFinFDC3)
  }

  return new NoopProvider()
}
