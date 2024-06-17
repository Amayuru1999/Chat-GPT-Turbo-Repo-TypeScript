"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openaiController_1 = require("../controllers/openaiController");
const router = express_1.default.Router();
router.post("/summary", openaiController_1.summaryController);
router.post("/paragraph", openaiController_1.paragraphController);
router.post("/chatbot", openaiController_1.chatbotController);
router.post("/js-converter", openaiController_1.jsconverterController);
router.post("/scifi-image", openaiController_1.scifiImageController);
router.post("/run", openaiController_1.runController);
exports.default = router;
