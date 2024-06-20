import express, { Router } from "express";
import {
  summaryController,
  paragraphController,
  chatbotController,
  jsconverterController,
  scifiImageController,
  runController
} from "../controllers/openaiController";

const router: Router = express.Router();


router.post("/summary", summaryController);
router.post("/paragraph", paragraphController);
router.post("/chatbot", chatbotController);
router.post("/js-converter", jsconverterController);
router.post("/scifi-image", scifiImageController);
router.post("/run", runController);

export default router;
