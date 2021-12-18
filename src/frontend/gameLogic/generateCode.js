async function fetchNumbers(codeLength, maxDigit) {
  let request = await fetch(
    `https://www.random.org/integers/?num=${codeLength}&min=1&max=${maxDigit}&col=1&base=10&format=plain&rnd=new`
  );
  let numbers = await request.text();
  return numbers.trim();
}

function processNumbers(string) {
  let nums = string.split("\n");
  let countOfNums = nums.reduce((acc, number) => {
    acc[number] = acc[number] + 1 || 1;
    return acc;
  }, {});
  return { nums, countOfNums };
}

export async function generateCode(codeLength, maxDigits) {
  return processNumbers(await fetchNumbers(codeLength, maxDigits));
}
