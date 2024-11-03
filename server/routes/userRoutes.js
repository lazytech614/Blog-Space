import { Router } from "express";
import { subscribeUser } from "../controllers/user controllers/subscribeUser.js";
import { checkSubscription } from "../controllers/user controllers/checkSubscription.js";
import { getAllSubscribers } from "../controllers/user controllers/getAllSubscribers.js";
import { getAllUsers } from "../controllers/user controllers/getAllUsers.js";
import { deleteUser } from "../controllers/user controllers/deleteUser.js";
import { cancelSubscription } from "../controllers/user controllers/cancelSubscription.js";

const router = Router();

router.get("/users", getAllUsers);
router.post("/subscribe/:username", subscribeUser);
router.get("/check-subscription/:username", checkSubscription);
router.get("/subscribers", getAllSubscribers);
router.delete("/delete-user/:id", deleteUser);
router.delete("/cancel-subscription/:id", cancelSubscription);

export default router;
