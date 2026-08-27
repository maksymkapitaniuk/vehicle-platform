export function falsyStringToValue<T>(
  value: T,
  data: string | undefined,
): string | T {
  if (!data) {
    return value;
  }

  return data;
}
