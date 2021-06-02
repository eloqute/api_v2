import { Request, Response, NextFunction } from "express";
import Policy from "../policies/base";

export default function authenticate<A>(policy : Policy<A>) {
  return (req : Request, res : Response, next : NextFunction) => {
    if(req.user || policy.publiclyAccessible) {
      next();
    } else {
      res.status(401).send({ status: 401, message: "Not authenticated"});
    }
  };
}
