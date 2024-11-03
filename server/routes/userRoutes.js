import { Router } from "express";
import { subscribeUser } from "../controllers/user controllers/subscribeUser.js";
import { checkSubscription } from "../controllers/user controllers/checkSubscription.js";
import { getAllSubscribers } from "../controllers/user controllers/getAllSubscribers.js";
import { getAllUsers } from "../controllers/user controllers/getAllUsers.js";
import { deleteUser } from "../controllers/user controllers/deleteUser.js";

const router = Router();

router.get("/users", getAllUsers);
router.post("/subscribe/:username", subscribeUser);
router.get("/check-subscription/:username", checkSubscription);
router.get("/subscribers", getAllSubscribers);
router.get("/delete-user/:id", deleteUser);

export default router;
