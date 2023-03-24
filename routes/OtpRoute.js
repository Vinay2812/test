import { Router } from 'express';
import { sendOtp, verifyOtp } from '../controller/Otp/OtpController.js';

const router = Router();

router.get("/send/:phone", sendOtp)
router.post("/verify", verifyOtp);

export default router;