import { Router } from 'express';
import planteController from '../controllers/planteController';

const router = Router();

router.get('/', planteController.getAllPlantes);
router.get('/:planteId', planteController.getPlanteById);

// router.post('/', planteController.addAstuce);
// router.put('/:astuceId', planteController.updateAstuce);

// router.delete('/:astuceId', planteController.deleteAstuce);

export default router;
