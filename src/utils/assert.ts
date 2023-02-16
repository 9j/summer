export function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(`Expected string, got ${typeof value}`);
  }
}
