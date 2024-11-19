import { Router } from 'express';
import plante_environnementController from '../controllers/plante_environnementController';

const router = Router();

router.get('/', plante_environnementController.getAllEnvironnementPlante);
router.get('/:planteId/:environnementId', plante_environnementController.getEnvironnementPlante);

router.post('/:planteId/:environnementId', plante_environnementController.addEnvironnementToOnePlante);
router.put('/:planteEnvironnementId/:environnementId', plante_environnementController.updateEnvironnementToOnePlante);

router.delete('/:planteEnvironnementId', plante_environnementController.deleteEnvironnementToOnePlante);

export default router;
