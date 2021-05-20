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

export async function guard<A>(
  status: number, message : string,
  resource : A | null, response : Response,
  callback : (_arg0 : A) => Promise<Response>
) {
  if (resource) {
    return callback(resource);
  }
  return response.status(status).send({ status, message });
}

export async function guard404<A>(
  resource : A | null, response : Response,
  callback : (_arg0 : A) => Promise<Response>
) {
  return guard(404, "Not found", resource, response, callback);
}

export async function guard401<A>(
  resource : A | null, response : Response,
  callback : (_arg0 : A) => Promise<Response>
) {
  return guard(401, "Not authenticated", resource, response, callback);
}
