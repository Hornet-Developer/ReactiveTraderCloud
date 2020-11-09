import { action, ActionUnion } from 'rt-util'
import { TradesUpdate, HighlightRow } from './blotterService'

export enum BLOTTER_ACTION_TYPES {
  SUBSCRIBE_TO_BLOTTER_ACTION = '@ReactiveTraderCloud/SUBSCRIBE_TO_BLOTTER_ACTION',
  BLOTTER_SERVICE_NEW_TRADES = '@ReactiveTraderCloud/BLOTTER_SERVICE_NEW_TRADES',
  BLOTTER_SERVICE_HIGHLIGHT_TRADE = '@ReactiveTraderCloud/BLOTTER_SERVICE_HIGHLIGHT_TRADE',
  BLOTTER_SERVICE_REMOVE_HIGHLIGHT_TRADE = '@ReactiveTraderCloud/BLOTTER_SERVICE_REMOVE_HIGHLIGHT_TRADE',
}

export const BlotterActions = {
  createNewTradesAction: action<BLOTTER_ACTION_TYPES.BLOTTER_SERVICE_NEW_TRADES, TradesUpdate>(
    BLOTTER_ACTION_TYPES.BLOTTER_SERVICE_NEW_TRADES
  ),
  subscribeToBlotterAction: action(BLOTTER_ACTION_TYPES.SUBSCRIBE_TO_BLOTTER_ACTION),
  highlightTradeAction: action<BLOTTER_ACTION_TYPES.BLOTTER_SERVICE_HIGHLIGHT_TRADE, HighlightRow>(
    BLOTTER_ACTION_TYPES.BLOTTER_SERVICE_HIGHLIGHT_TRADE
  ),
  removeHighlightTradeAction: action<
    BLOTTER_ACTION_TYPES.BLOTTER_SERVICE_REMOVE_HIGHLIGHT_TRADE,
    HighlightRow
  >(BLOTTER_ACTION_TYPES.BLOTTER_SERVICE_REMOVE_HIGHLIGHT_TRADE),
}

export type BlotterAction = ActionUnion<typeof BlotterActions>
