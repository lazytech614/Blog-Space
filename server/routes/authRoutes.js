import { Router } from "express";
import { signIn } from "../controllers/auth controllers/signIn.js";
import { logOut } from "../controllers/auth controllers/LogOut.js";
import { signUp } from "../controllers/auth controllers/signUp.js";

const router = Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/logout", logOut);

export default router;
