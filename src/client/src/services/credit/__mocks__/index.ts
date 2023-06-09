import { defer, EMPTY, Observable, of } from "rxjs"

import { RfqDetails } from "../creditRfqs"

let _creditRfqsById$: Observable<Observable<Record<number, RfqDetails>>>

export const creditRfqsById$ = defer(() => _creditRfqsById$)

export const __creditRfqsById = (
  input: Observable<Observable<Record<number, RfqDetails>>>,
) => {
  _creditRfqsById$ = input
}

export const __resetMocks = () => {
  _creditRfqsById$ = EMPTY
}

export const isBlotterDataStale$ = of(false)
