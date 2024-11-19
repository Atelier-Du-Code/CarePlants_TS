import { Router } from 'express';
import expositionController from '../controllers/expositionController';

const router = Router();

router.get('/', expositionController.getAllExpositions);
router.get('/:expositionId', expositionController.getExpositionById);

router.post('/', expositionController.addExposition);
router.put('/:expositionId', expositionController.updateExposition);

router.delete('/:expositionId', expositionController.deleteExposition);

export default router;
