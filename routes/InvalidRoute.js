import { Router } from 'express';
const router = Router();

router.all("*", (req, res) => {
    res.status(404).json({
        message: `Invalid route ${req.url} with method ${req.method}`
    })
})
export default router;
