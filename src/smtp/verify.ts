import { Client } from "smtp-fetch";
import { SMTPResult } from "../types";

async function checkSMTP(
  to: string,
  host: string,
  port: number,
  timeout: number = 5000
): Promise<SMTPResult> {
  const c = new Client(host, port);

  try {
    await c.connect({ timeout });

    await c.mail("");
    await c.rcpt(to);
    await c.quit();

    return {
      valid: true,
    };
  } catch (err: any) {
    return {
      valid: false,
      error: err.message,
    };
  } finally {
    c.close();
  }
}

export default checkSMTP;
