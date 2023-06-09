import { EMPTY, Observable } from "rxjs"
import { switchMap } from "rxjs/operators"

import { ConnectionStatus, connectionStatus$ } from "./connection"

export const withConnection =
  () =>
  <T>(source$: Observable<T>) =>
    connectionStatus$.pipe(
      switchMap((connection) =>
        connection === ConnectionStatus.CONNECTED ? source$ : EMPTY,
      ),
    )
