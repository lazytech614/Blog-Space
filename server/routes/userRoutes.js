import { Router } from "express";
import { subscribeUser } from "../controllers/subscribeUser.js";
import { checkSubscription } from "../controllers/checkSubscription.js";
import { getAllSubscribers } from "../controllers/getAllSubscribers.js";
import { getAllUsers } from "../controllers/getAllUsers.js";

const router = Router();

router.get("/users", getAllUsers);
router.post("/subscribe/:username", subscribeUser);
router.get("/check-subscription/:username", checkSubscription);
router.get("/subscribers", getAllSubscribers);

export default router;
