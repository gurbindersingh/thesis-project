export function createColorSteps(start: number, end: number, steps: number) {
  if (end <= start)
    throw Error("The end value must be larger than the start value");

  // OKLCH is a new color model in CSS that keeps the perceived lightness value
  // consistent across hues.
  const colors = Array.from({ length: steps }, (_, i) => i)
    .map((i) => i / (steps - 1))
    .map((fraction) => start + (end - start) * fraction)
    .map((hue) => Math.round(hue * 10) / 10)
    .map((hue) => [65, 0.35, hue, 50, 50])
    .map((values) => ({
      raw: values,
      css: `oklch(${values[0]}% ${values[1]} ${values[2]} / 1)`,
    }));
  console.log(colors);
  return colors;
}
