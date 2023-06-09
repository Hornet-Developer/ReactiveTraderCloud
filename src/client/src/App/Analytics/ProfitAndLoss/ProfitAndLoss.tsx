import { merge } from "rxjs"
import styled from "styled-components"

import {
  AnalyticsLineChartWrapper,
  ProfitAndLossHeader,
  Title,
} from "../styled"
import { LastPosition, lastPosition$ } from "./LastPosition"
import { LineChart, lineChart$ } from "./LineChart"

export const ProfitAndLossStyle = styled.div`
  width: 100%;
  height: auto;
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column: 1/-1;
`
export const ProfitAndLoss = () => (
  <ProfitAndLossStyle>
    <ProfitAndLossHeader>
      <Title>Profit &amp; Loss</Title>
      <LastPosition />
    </ProfitAndLossHeader>
    <AnalyticsLineChartWrapper>
      <LineChart />
    </AnalyticsLineChartWrapper>
  </ProfitAndLossStyle>
)

export const profitAndLoss$ = merge(lastPosition$, lineChart$)
