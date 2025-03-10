export const isString = (value: number | string): value is string => {
  return typeof value === 'string';
};

export const isNumber = (value: number | string): value is number => {
  return typeof value === 'number';
};
