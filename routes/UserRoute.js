import { Router } from "express";
import { updateUser } from "../controller/Auth/AuthController.js";
const router = Router();

router.patch("/:userId", updateUser)

export default router;