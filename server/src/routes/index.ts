import { Router } from 'express';
import astuceRoutes from './astuceRoutes';

const router = Router();

router.use('/astuces', astuceRoutes);

export default router;
