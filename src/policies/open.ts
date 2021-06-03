import Policy from "./base";

const open : Policy<any> = {
  publiclyAccessible: true,
  hasPermission: (_user, _resource) => true
};

export default open;
