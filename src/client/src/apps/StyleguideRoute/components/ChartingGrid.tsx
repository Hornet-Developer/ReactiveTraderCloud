import React from 'react'
import { styled } from 'rt-theme'
import { Caption } from '../elements'
import {
  LineChartWrapper,
  GraphNotionalWrapper,
} from '../../MainRoute/widgets/spotTile/components/analyticsTile/styled'
import AnalyticsTileChart from '../../MainRoute/widgets/spotTile/components/analyticsTile/AnalyticsTileChart'
import { SpotPriceTick } from 'apps/MainRoute'

const historicPrices: SpotPriceTick[] = Array.from(
  {
    length: 30,
  },
  () => ({
    ask: Math.floor(Math.random() * 20),
    bid: Math.floor(Math.random() * 20),
    mid: Math.floor(Math.random() * 20),
    creationTimestamp: new Date().getMilliseconds(),
    symbol: 'USD',
    valueDate: 'date',
  }),
).concat(
  Array.from(
    {
      length: 30,
    },
    () => ({
      ask: Math.floor(Math.random() * 20),
      bid: Math.floor(Math.random() * -20),
      mid: Math.floor(Math.random() * -20),
      creationTimestamp: new Date().getMilliseconds(),
      symbol: 'USD',
      valueDate: 'date',
    }),
  ),
)

export default (() => (
  <Root>
    <LabelColumn>
      <div></div>
      <label>Normal</label>
      <label>Active</label>
    </LabelColumn>
    <ChartingColumn>
      <ColumnTitle>
        Charting
        <Caption>molecules/pricing-tiles/fx/charting</Caption>
      </ColumnTitle>
      <PriceButtonVariants />
      <PriceButtonVariants />
    </ChartingColumn>
  </Root>
)) as React.FC

const PriceButtonVariants: React.FC = () => (
  <ChartingRow>
    <ChartingContainer>
      <GraphNotionalWrapper isTimerOn={true}>
        <LineChartWrapper isTimerOn={true}>
          <AnalyticsTileChart history={historicPrices} />
        </LineChartWrapper>
      </GraphNotionalWrapper>
    </ChartingContainer>
  </ChartingRow>
)

const GridColumn = styled.div`
  display: grid;
  grid-template-rows: 4rem repeat(2, 1fr);
  grid-row-gap: 0.5rem;
  align-items: center;
`

const LabelColumn = styled(GridColumn)`
  font-size: 0.6875rem;
  color: ${({ theme }) => theme.secondary.base};
`

const ColumnTitle = styled.div``
const ChartingRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0.5rem;
`
const ChartingColumn = styled(GridColumn)`
  min-width: 10rem;
`

const ChartingContainer = styled.div`
  width: 200px;
  display: flex;
  height: 100px;
  justify-content: space-between;
`

const Root = styled.div`
  max-width: 60rem;

  display: grid;
  grid-template-columns: minmax(auto, 120px) 1fr 1fr 1fr ;
  grid-column-gap: 2rem;

  padding-bottom: 2rem;

  ${ChartingColumn} + ${ChartingColumn} {
    position: relative;

    &::before {
      display: block;
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      box-shadow: 2rem 0 0 ${({ theme }) => theme.primary[1]};
      box-shadow: 2rem 0 0 black;
    }
  }
`
