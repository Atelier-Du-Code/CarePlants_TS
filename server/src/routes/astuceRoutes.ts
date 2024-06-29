import { Router } from 'express';
import astuceController from '../controllers/astuceController';

const router = Router();

router.get('/', astuceController.getAstuces);


export default router;
