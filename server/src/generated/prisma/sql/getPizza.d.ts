import * as $runtime from "../runtime/library"

/**
 */
export const getPizza: () => $runtime.TypedSql<getPizza.Parameters, getPizza.Result>

export namespace getPizza {
  export type Parameters = []
  export type Result = {
    id: number
    name: string
    quantity: number
    path: string | null
  }
}
