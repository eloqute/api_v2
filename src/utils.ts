import { Response } from "express";

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

export async function guard404<A>(
  resource : A | null, response : Response, callback : (_arg0 : A) => Response
) {
  if (resource) {
    return callback(resource);
  }
  return response.status(404).send({ status: 404, message: "Not found." });
}
