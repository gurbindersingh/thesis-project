export function createHslColorSteps(
  start: number,
  end: number,
  steps: number,
): number[] {
  // In a real project we'd add some error handling here to make sure that the
  // input values are within the acceptable HSL range.
  const stepSize = (end - start) / (steps - 1);
  const values = [];

  for (let i = start; i <= end && i <= 360; i += stepSize) {
    console.log(i);
    values.push(i);
  }
  return values;
}
