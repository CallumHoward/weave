const COLORS = [
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5",
];

function hashToNumber(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line unicorn/prefer-code-point
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function getCursorColor(userId: string) {
  return COLORS[hashToNumber(userId) % COLORS.length];
}
