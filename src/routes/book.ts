import { Router } from "express";

import overview from "./book/overview";
import notes from "./book/notes";
import content from "./book/content";

const router = Router();

router.use(overview);
router.use(notes);
router.use(content);

export default router;
