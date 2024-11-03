import { Router } from "express";
import { subscribeUser } from "../controllers/subscribeUser.js";
import { checkSubscription } from "../controllers/checkSubscription.js";
import { getAllSubscribers } from "../controllers/getAllSubscribers.js";

const router = Router();

router.post("/subscribe/:username", subscribeUser);
router.get("/check-subscription/:username", checkSubscription);
router.get("/subscribers", getAllSubscribers);

export default router;
