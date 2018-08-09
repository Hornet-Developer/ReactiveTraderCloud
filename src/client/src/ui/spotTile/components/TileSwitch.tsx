import React from 'react'
import { CurrencyPair, Direction } from 'rt-types'
import { SpotTileData } from '../model/spotTileData'
import { TileBooking } from './notifications'
import NotificationContainer from './notifications'
import SpotTile from './SpotTile'
import TileControls from './TileControls'

interface Props {
  currencyPair: CurrencyPair
  spotTileData: SpotTileData
  tornOff?: boolean
  executeTrade: (direction: Direction, notional: number) => void
  onPopoutClick?: () => void
  onNotificationDismissedClick: () => void
}

const TileSwitch: React.SFC<Props> = ({
  currencyPair,
  spotTileData,
  executeTrade,
  tornOff,
  onPopoutClick,
  onNotificationDismissedClick
}) => {
  const { lastTradeExecutionStatus, isTradeExecutionInFlight } = spotTileData
  const isPriceStale = !lastTradeExecutionStatus && spotTileData.price && spotTileData.price.priceStale

  return (
    <SpotTile currencyPair={currencyPair} spotTileData={spotTileData} executeTrade={executeTrade}>
      <TileControls tornOff={tornOff} onPopoutClick={onPopoutClick} />
      <TileBooking show={isTradeExecutionInFlight} />
      <NotificationContainer
        isPriceStale={isPriceStale}
        lastTradeExecutionStatus={lastTradeExecutionStatus}
        currencyPair={currencyPair}
        onNotificationDismissedClick={onNotificationDismissedClick}
      />
    </SpotTile>
  )
}

export default TileSwitch
