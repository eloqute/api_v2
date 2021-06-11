import "../db";
import ContentStructure from "../models/contentStructure";
import ModuleStructure from "../models/moduleStructure";
import SectionStructure from "../models/sectionStructure";

export default {
  findByPath: (
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
  })
};
