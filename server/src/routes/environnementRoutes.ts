import { Router } from 'express';
import environnementController from '../controllers/environnementController';

const router = Router();



router.get('/', environnementController.getEnvironnements);
router.get('/:environnementId', environnementController.getEnvironnementById);

router.post('/', environnementController.addEnvironnement);
router.put('/:environnementId', environnementController.updateEnvironnement);

router.delete('/:environnementId', environnementController.deleteEnvironnement);

export default router;
