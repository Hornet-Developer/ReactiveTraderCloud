import { act, fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BehaviorSubject } from "rxjs"

import { ComparatorType } from "@/App/Trades/TradesState"
import { Trade, tradesTestData } from "@/services/trades"
import { TestThemeProvider } from "@/utils/testUtils"

import FxTrades from "../CoreFxTrades"
import { setupWindow } from "./utils"

jest.mock("@/services/trades/trades")
jest.mock("../TradesState/tableTrades", () => ({
  ...jest.requireActual("../TradesState/tableTrades"),
  useFilterFields: jest.fn().mockReturnValue([]),
  useFxTradeRowHighlight: jest.fn().mockReturnValue(undefined),
}))

const { mockTrades } = tradesTestData

const renderComponent = () =>
  render(
    <TestThemeProvider>
      <FxTrades />
    </TestThemeProvider>,
  )

const _trades = require("@/services/trades/trades")

describe("for notional column", () => {
  const notionalFilterIcon = '[aria-label="Open Notional field filter pop up"]'
  const notionalFilterMenu =
    '[aria-label="Filter trades by Notional field value"]'
  const notionalFilterMenuInput = '[aria-label="Primary filter value"]'

  setupWindow()

  beforeEach(() => {
    const tradesSubj = new BehaviorSubject<Trade[]>(mockTrades)
    _trades.__setTrades(tradesSubj.asObservable())
  })

  it("no filter icon or menu should be rendered", () => {
    const { container } = renderComponent()
    expect(container.querySelector(notionalFilterIcon)).toBe(null)
    expect(container.querySelector(notionalFilterMenu)).toBe(null)
  })

  it("filter icon and menu should work correct", async () => {
    const { container, findAllByTestId } = renderComponent()

    act(() => {
      fireEvent.mouseOver(
        screen.getByText("Notional").closest("div") as Element,
      )
    })
    expect(container.querySelector(notionalFilterIcon)).not.toBe(null)

    act(() => {
      fireEvent.click(container.querySelector(notionalFilterIcon) as Element)
    })
    expect(container.querySelector(notionalFilterMenu)).not.toBe(null)

    const input = container.querySelector(
      notionalFilterMenuInput,
    ) as HTMLInputElement
    expect(input.value).toBe("")

    act(() => {
      fireEvent.change(input, { target: { value: "1000000" } })
    })
    expect(input.value).toBe("1000000")

    let rows = await findAllByTestId(/trades-grid-row/)

    expect(rows.length).toBe(2)

    act(() => {
      userEvent.selectOptions(
        container.querySelector("select") as Element,
        ComparatorType.Greater,
      )
    })
    rows = await findAllByTestId(/trades-grid-row/)
    expect(rows.length).toBe(1)

    act(() => {
      userEvent.selectOptions(
        container.querySelector("select") as Element,
        ComparatorType.NotEqual,
      )
    })
    rows = await findAllByTestId(/trades-grid-row/)
    expect(rows.length).toBe(1)
  })
})
