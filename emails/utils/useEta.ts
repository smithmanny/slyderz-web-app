import { Eta } from "eta";
import path from 'path';


const eta = new Eta({
  tags: ["{{", "}}"],
  views: path.join(__dirname, "/emails/transactional",)
});

export default eta;
