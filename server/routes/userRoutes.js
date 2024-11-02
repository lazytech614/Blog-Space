import { Router } from "express";
import { subscribeUser } from "../controllers/subscribeUser.js";

const router = Router();

router.post("/subscribe", subscribeUser);

export default router;
