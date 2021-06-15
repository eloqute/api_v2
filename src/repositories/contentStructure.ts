import "../db";
import ContentStructure from "../models/contentStructure";
import ModuleStructure from "../models/moduleStructure";
import SectionStructure from "../models/sectionStructure";

export default {
  findContentStructure: (
    sectionPosition : string,
    modulePosition : string,
    contentType : string
  ) => ContentStructure.findOne({
    include: [{
      model: ModuleStructure,
      where: { position: modulePosition },
      include: [{
        model: SectionStructure,
        where: { position: sectionPosition }
      }]
    }],
    where: { contentType }
  }),

  findModuleStructure: (
    sectionPosition : string,
    position : string
  ) => ModuleStructure.findOne({
    include: [{
      model: SectionStructure,
      where: { position: sectionPosition }
    }],
    where: { position }
  })
};
