
/**
 * Constrains a number to be within 2 bounding values, inclusive
 * @param value The value in question
 * @param min The minimum allowed value
 * @param max The maximum allowed value
 */
export function clamp(n: number, min: number, max: number) {
  return min < max
    ? (n < min ? min : n > max ? max : n)
    : (n < max ? max : n > min ? min : n)
}


/**
 * Rounds a number to the nearest multiple of 'multiple'.
 * Examples:
 *  roundToMultipleOf(5,  12)  = 10
 *  roundToMultipleOf(5,  16)  = 15
 *  roundToMultipleOf(10, 16)  = 20
 *  roundToMultipleOf(10, 26)  = 30
 * @param multiple The multiple to round to
 * @param n The number in question
 */
export function roundToMultipleOf(multiple: number, n: number) {
  return Math.round(n / multiple) * multiple
}
