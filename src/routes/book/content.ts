import { Router } from "express";

import { loadAndAuthorizeResource } from "../../utils";
import BookRepository from "../../repositories/book";
import ContentRepository from "../../repositories/content";
import ContentItem from "../../models/contentItem";
import signedInPolicy from "../../policies/signedIn";

const router = Router({ mergeParams: true });
loadAndAuthorizeResource(router, signedInPolicy, (params) =>
  BookRepository.findByPublicationURL(params.publicationURL)
);

router.get("/:sectionPosition/:modulePosition/:contentType", async (req, res) => {
  const {
    publicationURL, sectionPosition, modulePosition, contentType
  } = req.params;
  const content = await ContentRepository.findByPublicationURLAndPath(
    publicationURL, sectionPosition, modulePosition, contentType
  );
  res.status(200).send(content.map((ci : ContentItem) => ci.asResponse()));
});

export default router;
