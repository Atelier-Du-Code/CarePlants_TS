import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import * as plante_astuceService from '../services/plante_astuceService';



// Obtenir toutes les astuces pour une plante
export const getAstucesForPlanteController = async (req: Request, res: Response,  next: NextFunction) => {
    const { planteId } = req.params;
    try {
        const relations = await plante_astuceService.getAllAstuceToOnePlante(planteId);
        res.status(200).json(relations);
    } catch (error) {
        next(error);
    }
};


// Créer un nouveau couple plante/astuce
export const createPlanteAstuceController = async (req: Request, res: Response, next: NextFunction) => {
    const { planteId, astuceId } = req.body;
    try {
        const newCouple = await plante_astuceService.createPlanteAstuce(planteId, astuceId);
        res.status(201).json(newCouple);
    } catch (error) {
        next(error);

    }
};

// Supprimer un couple plante/astuce
export const deletePlanteAstuceController = async (req: Request, res: Response, next: NextFunction) => {
    const { planteId, astuceId } = req.body;
    try {
        await plante_astuceService.deletePlanteAstuce(planteId, astuceId);
        res.status(200).json({ message: 'Couple plante/astuce supprimé avec succès.' });
    } catch (error) {
        next(error);
    }
};