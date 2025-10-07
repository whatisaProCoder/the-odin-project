function fibs(n) {
  res = []
  a = 0
  b = 1
  for (let i = 0; i < n; i++) {
    res.push(a)
    c = a + b
    a = b
    b = c
  }
  return res
}

function fibsRec(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const seq = fibsRec(n - 1);
  const nextNum = seq[seq.length - 1] + seq[seq.length - 2];
  return [...seq, nextNum];
}

console.log(fibs(5))
console.log(fibsRec(5))