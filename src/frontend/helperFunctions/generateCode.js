export function createUrlWithParams(codeLength, maxDigit) {
  return `https://www.random.org/integers/?num=${codeLength}&min=1&max=${maxDigit}&col=1&base=10&format=plain&rnd=new`;
}

export async function fetchNumbers(url, fetchCallBack) {
  let request = await fetchCallBack(url);
  let numbers = await request.text();
  return numbers.trim();
}

export function processNumbers(string) {
  let nums = string.split("\n");
  let countOfNums = nums.reduce((acc, number) => {
    acc[number] = acc[number] + 1 || 1;
    return acc;
  }, {});
  return { nums, countOfNums };
}

export async function generateCode(codeLength, maxDigit) {
  return processNumbers(
    await fetchNumbers(createUrlWithParams(codeLength, maxDigit), fetch)
  );
}
