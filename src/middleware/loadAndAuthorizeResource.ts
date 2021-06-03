import { compose } from "compose-middleware";

import authorize from "./authorize";
import loadResource, { FinderType } from "./loadResource";
import authenticate from "./authenticate";

import Policy from "../policies/base";

export default function loadAndAuthorizeResource<A>(
  policy : Policy<A>,
  finder : FinderType<A>
) {
  return compose([
    authenticate(policy),
    loadResource(finder),
    authorize(policy)
  ]);
}
