import { Router } from 'express';
import parasiteController from '../controllers/parasiteController';

const router = Router();

router.get('/', parasiteController.getAllParasites);
router.get('/:parasiteId', parasiteController.getParasiteById);

router.post('/', parasiteController.addParasite);
router.put('/:parasiteId', parasiteController.updateParasite);

router.delete('/:parasiteId', parasiteController.deleteParasite);

export default router;
