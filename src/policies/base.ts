import { Express } from "express";

export default interface Policy<A> {
  publiclyAccessible : boolean;
  hasPermission(user? : Express.User, resource? : A ) : boolean;
}
