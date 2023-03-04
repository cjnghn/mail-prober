import { checkEmail } from "../src/index";

async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), ms);
  });
}

async function main() {
  const reachable: string[] = [];

  for (let i = 100; i < 1000; i++) {
    const resp = await checkEmail(`chotnt${i}@naver.com`);
    if (resp.reachable) reachable.push(resp.email);

    console.log(JSON.stringify(resp, null, 2));

    await wait(300);
  }

  console.log("📮 REACHABLE > ", reachable);
}

main();
