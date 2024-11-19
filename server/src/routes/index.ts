import { Router } from 'express';
import astuceRoutes from './astuceRoutes';
import environnementRoutes from './environnementRoutes';
import expositionRoutes from './expositionRoutes';
import parasiteRoutes from './parasiteRoutes';
import plantes from './plantesRoutes'
import plante_environnement from './plante_environnementRoutes';
import plante_exposition from './plante_ExpositionRoutes';


const router = Router();

router.use('/astuces', astuceRoutes);
router.use('/environnements', environnementRoutes);
router.use('/expositions', expositionRoutes);
router.use('/parasites', parasiteRoutes);
router.use('/plantes', plantes);
router.use('/plante_environnements', plante_environnement);
router.use('/plante_expositions', plante_exposition);




export default router;
