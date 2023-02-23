import dns from "dns";
import type { MxResult } from "../types";

async function checkMX(domain: string): Promise<MxResult> {
  return new Promise((resolve) => {
    dns.resolveMx(domain, (err, mxRecords) => {
      if (err) return resolve({ valid: false, mxRecords: [] });
      else resolve({ valid: true, mxRecords });
    });
  });
}

export default checkMX;
