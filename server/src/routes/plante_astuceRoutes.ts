import { Router } from 'express';
import astuceController from '../controllers';

const router = Router();

router.get('/', astuceController.getAllAstuces);
router.get('/:astuceId', astuceController.getAstuceById);

router.post('/', astuceController.addAstuce);
router.put('/:astuceId', astuceController.updateAstuce);

router.delete('/:astuceId', astuceController.deleteAstuce);

export default router;
