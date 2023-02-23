import { checkMX } from "./mx";
import { checkSMTP } from "./smtp";
import { checkSyntax } from "./syntax";

import type { Result } from "./types";

const DEFAULT_RESULT = {
  reachable: false,

  syntax: { valid: false },
  mx: { valid: false },
  smtp: { valid: false },
};

async function checkEmail(email: string): Promise<Result> {
  const result: Result = { email, ...DEFAULT_RESULT };

  const syntax = checkSyntax(email);
  if (!syntax.valid) {
    return { ...result, syntax };
  }

  const mx = await checkMX(syntax.domain!);
  if (!mx.valid || !mx.mxRecords) {
    return { ...result, syntax, mx };
  }

  const records = mx.mxRecords.sort((a, b) => a.priority - b.priority);
  const smtp = await checkSMTP(email, records[0].exchange, 25);
  if (!smtp.valid) {
    return { ...result, syntax, mx, smtp };
  }

  return { ...result, reachable: true, syntax, mx, smtp };
}

export default checkEmail;
