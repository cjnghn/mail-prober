import { Client } from "."
import { SMTPResult } from "../types"

async function checkSMTP(
  to: string,
  host: string,
  port: number
): Promise<SMTPResult> {
  const c = new Client(host, port)

  try {
    await c.connect()

    await c.send("HELO", "hi")
    await c.send("MAIL FROM:", "<>")
    await c.send("RCPT TO:", `<${to}>`)

    return { valid: true }
  } catch (err) {
    console.error(err)

    return { valid: false }
  } finally {
    c.disconnect()
  }
}

export default checkSMTP
