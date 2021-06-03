import { Request, Response } from "express";

import Policy from "../policies/base";
import { NextFunction } from "../utils";

export default function authenticate<A, V>(policy : Policy<A>) {
  return (req : Request, res : Response, next : NextFunction<V>) => {
    if (req.user || policy.publiclyAccessible) {
      next();
    } else {
      res.status(401).send({ status: 401, message: "Not authenticated" });
    }
  };
}
