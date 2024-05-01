type uni = number; // between 0 and 1
type bipo = number; // between -1 and 1

export const clip = (v: number, min: number = -1, max: number = 1): number =>
  v < min ? min : max < v ? max : v;

export const wrap = (x: number, min: number = 0, max: number = 1): number =>
  ((((x - min) % (max - min)) + (max - min)) % (max - min)) + min;

export const wrapInt = (x: number, min: number = 0, max: number = 1): number =>
  (x = x < min ? max : x > max ? min : x);

export const scale = (
  v: number,
  oMin: number,
  oMax: number,
  tMin: number,
  tMax: number
): number => {
  v = ((v - oMin) * (tMax - tMin)) / (oMax - oMin) + tMin;
  return v < tMin ? tMin : v > tMax ? tMax : v;
};

export const invert = (v: bipo): bipo => 1 - v;
