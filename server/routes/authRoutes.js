import { Router } from "express";
import { signIn } from "../controllers/signIn.js";
import { logOut } from "../controllers/LogOut.js";
import { signUp } from "../controllers/signUp.js";

const router = Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/logout", logOut);

export default router;
