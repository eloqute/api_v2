import "../db";
import SectionStructure from "../models/sectionStructure";
import ModuleStructure from "../models/moduleStructure";
import ContentStructure from "../models/contentStructure";

export default {
  findAll: async () => SectionStructure.findAll({
    order: [
      ["position", "ASC"],
      [{ model: ModuleStructure, as: "modules" }, "position", "ASC"],
      [{ model: ModuleStructure, as: "modules" }, { model: ContentStructure, as: "contents" }, "position", "ASC"]
    ],
    include: [{
      model: ModuleStructure,
      include: [{
        model: ContentStructure
      }]
    }]
  })
};
