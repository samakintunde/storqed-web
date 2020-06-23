export const parseWeight = (weight: string | undefined) => {
  if (!weight) return null;

  const numRegex = new RegExp("d+");
  const unitRegex = new RegExp("D+");

  const weightValue = weight.match(numRegex)?.join("");
  const weightUnit = weight.match(unitRegex)?.join("");

  return {
    value: weightValue ? parseInt(weightValue) : undefined,
    unit: weightUnit ? weightUnit : undefined,
  };
};

export const joinWeight = (value: number | string, unit: string) => {
  return `${value}${unit}`;
};
