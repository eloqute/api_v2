import { Request, Router } from "express";

import authorize from "./middleware/authorize";
import loadResource, { FinderType } from "./middleware/loadResource";
import authenticate from "./middleware/authenticate";

import Policy from "./policies/base";

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

export function loadAndAuthorizeResource<A>(router : Router, policy : Policy<A>, finder : FinderType<A>) {
  router.use(authenticate(policy));
  router.use(loadResource(finder));
  router.use(authorize(policy));
}

export interface ResourcefulRequest<A> extends Request {
  resource? : A
}
