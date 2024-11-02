import { Router } from "express";
import { signIn } from "../controllers/signIn.js";
import { logOut } from "../controllers/LogOut.js";

const router = Router();

router.post("/signin", signIn);
router.post("/signup");
router.post("/logout", logOut);

export default router;
