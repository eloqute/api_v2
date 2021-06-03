import { Response } from "express";
import { ResourcefulRequest, NextFunction } from "../utils";
import Policy from "../policies/base";

export default function authorize<R, V>(policy : Policy<R>) {
  return (req : ResourcefulRequest<R>, res : Response, next : NextFunction<V>) => {
    if (policy.hasPermission(req.user, req.resource)) {
      next();
    } else {
      res.status(403).send({ status: 403, message: "Forbidden" });
    }
  };
}
