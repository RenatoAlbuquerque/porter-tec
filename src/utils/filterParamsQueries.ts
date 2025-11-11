export const filteredParams = (dataFilter: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(dataFilter).filter(
      ([, value]) => value !== null && value !== undefined && value !== "",
    ),
  ) as Record<string, unknown>;
