import { Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import { ResourcefulRequest, NextFunction } from "../utils";

export type FinderType<R> = (params : ParamsDictionary) => Promise<R | null>

export default function loadResource<R, V>(finder : FinderType<R>) {
  return (req : ResourcefulRequest<R>, res : Response, next : NextFunction<V>) => {
    const resourcePromise = finder(req.params);
    resourcePromise.then((resource) => {
      if (resource) {
        req.resource = resource;
        next();
      } else {
        res.status(404).send({ status: 404, message: "Not found" });
      }
    });
  };
}
