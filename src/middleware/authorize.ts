import { Response, NextFunction } from "express";
import { ResourcefulRequest } from "../utils";
import Policy from "../policies/base";

export default function authorize<R>(policy : Policy<R>) {
  return (req : ResourcefulRequest<R>, res : Response, next : NextFunction) => {
    if(policy.hasPermission(req.user, req.resource)) {
      next();
    } else {
      res.status(403).send({status: 403, message: "Forbidden" });
    }
  }
}
