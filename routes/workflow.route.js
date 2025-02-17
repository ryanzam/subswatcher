import { Router } from "express";
import { sendReminders } from "../controllers/wf.controller.js";

const wfRouter = Router()

wfRouter.post("/subs/reminder", sendReminders)

export default wfRouter