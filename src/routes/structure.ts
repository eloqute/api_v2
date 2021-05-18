import { Router } from "express";
import SectionStructureRepository from "../repositories/sectionStructure";
import SectionStructure from "../models/sectionStructure";

const router = Router();

router.get("/", async (_req, res) => {
  const sections = await SectionStructureRepository.findAll();
  return res.status(200).send(sections.map((s : SectionStructure) => s.asResponse()));
});

export default router;
