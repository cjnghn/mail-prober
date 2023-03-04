import { Client } from "smtp-fetch";
import { SMTPResult } from "../types";

async function checkSMTP(
  to: string,
  host: string,
  port: number
): Promise<SMTPResult> {
  const c = new Client(host, port);

  try {
    await c.connect();

    await c.mail("");
    await c.rcpt(to);
    await c.quit();

    return { valid: true };
  } catch (err) {
    return { valid: false };
  } finally {
    c.close();
  }
}

export default checkSMTP;
