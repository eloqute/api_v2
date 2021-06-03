import User from "../models/user";

interface Policy<A> {
  publiclyAccessible : boolean;
  hasPermission(user? : User, resource? : A) : boolean;
}

export default Policy;
