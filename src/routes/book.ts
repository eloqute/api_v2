import { Router } from "express";

import overview from "./book/overview";
import notes from "./book/notes";
import content from "./book/content";
import glossary from "./book/glossary";
import bibliography from "./book/bibliography";

const router = Router();

router.use(overview);
router.use(notes);
router.use(content);
router.use(glossary);
router.use(bibliography);

export default router;
