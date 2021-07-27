import { Request } from "express";

export async function asyncReduce<X, Y>(
  xs : X[],
  cb : ((acc : Y, x : X) => Promise<Y>),
  init : Y
) : Promise<Y> {
  return xs.reduce(
    async (acc, x) => acc.then((y) => cb(y, x)),
    Promise.resolve(init)
  );
}

export async function asyncMap<X, Y>(
  xs : X[],
  f : ((x : X) => Promise<Y>)
) : Promise<Array<Y>> {
  return asyncReduce(
    xs,
    async (ys : Y[], x : X) => {
      const y = await f(x);
      return [...ys, y];
    },
    [] as Y[]
  );
}

export function maybeParseInt(str : string | undefined) : number | undefined {
  if (str === undefined) return undefined;
  const int = parseInt(str, 10);
  return Number.isNaN(int) ? undefined : int;
}

export interface ResourcefulRequest<A> extends Request {
  resource? : A
}

export type NextFunction<V> = (error?: Error | null) => V;
