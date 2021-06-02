import { Router } from "express";

import overview from "./book/overview";
import content from "./book/content";

const router = Router();

router.use("/:publicationURL/overview", overview);
router.use("/:publicationURL/content", content);

export default router;
