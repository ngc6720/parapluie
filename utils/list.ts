export const arrSkip =
  <T>(n: number) =>
  (arr: Array<T>): Array<T> => {
    const filtered: Array<T> = [];

    for (let i = 0; i < arr.length; i += n) {
      filtered.push(arr[i]);
    }

    return filtered;
  };

export const arrTrimWithOffset = <T>(
  arr: Array<T>,
  padding: number,
  offset: number = 0
): Array<T> => {
  return arr.slice(padding + offset, -padding + offset);
};
