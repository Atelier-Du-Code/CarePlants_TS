import { Router } from 'express';
import planteExpositionController from '../controllers/plante_expositionController';

const router = Router();

router.get('/', planteExpositionController.getExpositionToOnePlante);
//router.get('/:astuceId', astuceController.getAstuceById);

// router.post('/', astuceController.addAstuce);
// router.put('/:astuceId', astuceController.updateAstuce);

// router.delete('/:astuceId', astuceController.deleteAstuce);

export default router;
