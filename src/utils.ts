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

export interface ResourcefulRequest<A> extends Request {
  resource? : A
}

export type NextFunction<V> = (error?: Error | null) => V;
