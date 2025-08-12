export interface Normalized<T extends { id: string }> {
  byId: Record<string, T>;
  allIds: string[];
}

export function toNormalized<T extends { id: string }>(
  array: T[]
): Normalized<T> {
  return {
    byId: Object.fromEntries(array.map((entry) => [entry.id, entry])),
    allIds: array.map((entry) => entry.id),
  };
}
