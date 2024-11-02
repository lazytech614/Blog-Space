import { Router } from "express";
import { subscribeUser } from "../controllers/subscribeUser.js";
import { checkSubscription } from "../controllers/checkSubscription.js";

const router = Router();

router.post("/subscribe/:username", subscribeUser);
router.get("/check-subscription/:username", checkSubscription);

export default router;
