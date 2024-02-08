export function toInt(val: number): number {
  return Math.round(val)
}

export function toFixedFloat(val: number): number {
  return parseFloat(val.toFixed(2))
}