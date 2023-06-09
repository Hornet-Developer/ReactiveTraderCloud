import styled from "styled-components"

import { Trade } from "@/services/trades"

import { useColDef, useColFields, useTrades$ } from "../Context"
import { ColDef, useTableTrades } from "../TradesState"

const ExcelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="25"
    viewBox="0 0 16 25"
    className="svg-size"
  >
    <g fill="none" fillRule="evenodd">
      <g fill="#FFF" className="svg-fill">
        <path d="M11.278 9.198c.334.256.4.732.15 1.07l-4.713 6.374a.745.745 0 0 1-1.052.148.772.772 0 0 1-.15-1.072l4.713-6.373a.745.745 0 0 1 1.052-.147z" />
        <path d="M5.663 9.198a.772.772 0 0 0-.15 1.07l4.713 6.374a.745.745 0 0 0 1.052.148.772.772 0 0 0 .15-1.072L6.715 9.345a.745.745 0 0 0-1.052-.147z" />
      </g>
      <path
        className="svg-stroke"
        fillRule="nonzero"
        stroke="#FFF"
        strokeWidth="1.949"
        d="M1.355 5.876a.585.585 0 0 0-.38.548v12.152c0 .244.151.463.38.548l12.882 4.803a.585.585 0 0 0 .789-.548V1.621a.585.585 0 0 0-.79-.548L1.356 5.876z"
      />
    </g>
  </svg>
)

const Button = styled("button")`
  opacity: 0.59;
  height: 100%;
  .svg-fill {
    fill: ${({ theme }) => theme.core.textColor};
  }
  .svg-stroke {
    stroke: ${({ theme }) => theme.core.textColor};
  }

  margin: 5px;

  .svg-size {
    transform: scale(0.7);
  }
`

const downloadCsv = (
  trades: Trade[],
  colDef: ColDef,
  colFields: (string | number)[],
) => {
  let csv = ""
  // CSV header
  colFields.forEach((field) => {
    csv += colDef[field].headerName + ","
  })
  csv += "\n"
  // CSV body
  trades.map((trade) => {
    colFields.map((field) => {
      const res =
        colDef[field].excelValueFormatter?.(trade[field]) ??
        colDef[field].valueFormatter?.(trade[field]) ??
        trade[field]
      csv += res + ", "
    })
    csv += "\n"
  })

  // Create and cleanup hidden element to trigger download in browser
  const hiddenElement = document.createElement("a")
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv)
  hiddenElement.target = "_blank"
  hiddenElement.download = "RT-Blotter.csv"
  hiddenElement.click()
  hiddenElement.parentElement?.removeChild(hiddenElement)
}

export const ExcelButton = () => {
  const rows$ = useTrades$()
  const colDef = useColDef()
  const colFields = useColFields()
  const trades = useTableTrades(rows$, colDef)

  return (
    <Button
      onClick={() => downloadCsv(trades, colDef, colFields)}
      aria-label="Export to CSV"
    >
      <ExcelIcon />
    </Button>
  )
}
