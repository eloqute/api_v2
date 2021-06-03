import Policy from "./base";

const signedIn : Policy<any> = {
  publiclyAccessible: false,
  hasPermission: (_user, _resource) => true
};

export default signedIn;
