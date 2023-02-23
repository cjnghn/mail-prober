import type { MxRecord } from "dns"

type SyntaxResult = {
  valid: boolean
  username?: string
  domain?: string
}

type MxResult = {
  valid: boolean
  mxRecords?: MxRecord[]
}

type SMTPResult = {
  valid: boolean
}

type Result = {
  email: string
  reachable: boolean

  syntax: SyntaxResult
  mx: MxResult
  smtp: SMTPResult
}
