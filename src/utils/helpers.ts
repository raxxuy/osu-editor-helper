export type Parser<T> = (value: string, result: T) => void;

export const num =
  <T>(key: keyof T): Parser<T> =>
  (v, r) => {
    r[key] = Number(v) as never;
  };

export const bool =
  <T>(key: keyof T): Parser<T> =>
  (v, r) => {
    r[key] = (v === "1") as never;
  };

export const str =
  <T>(key: keyof T): Parser<T> =>
  (v, r) => {
    r[key] = v as never;
  };

export const arr =
  <T>(key: keyof T, map: (v: string) => unknown, sep = ","): Parser<T> =>
  (v, r) => {
    r[key] = v.split(sep).map(map) as never;
  };
