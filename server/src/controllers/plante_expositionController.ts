import { Request, Response, NextFunction } from 'express';
import * as expositionService from '../services/plante_expositionService';
import PlanteModel from '../models/planteModele';
import ExpositionModel from '../models/expositionModele';

//Récupérer toutes les plantes expositions
export const getExpositionAllPlantes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
        const expositions = await expositionService.getExpositionToOnePlante;
        res.json(expositions);
    } catch (error) {
        next(error);
    }
};

//Récupère le couple plante/exposition pour une plante
export const getExpositionToOnePlante = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { planteId } = req.params;
        const expositions = await expositionService.getExpositionToOnePlante(planteId);
        res.json(expositions);
    } catch (error) {
        next(error);
    }
};

//Ajoute le couple plante/exposition pour une plante
export const addExpositionToOnePlante = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { planteId, expositionId } = req.params;

        const planteExistante = await PlanteModel.findById(planteId);
        if (!planteExistante) {
            res.status(404).json({ message: "La plante spécifiée n'existe pas." });
            return;
        }

        const expositionExistante = await ExpositionModel.findById(expositionId);
        if (!expositionExistante) {
            res.status(404).json({ message: "L'exposition spécifiée n'existe pas." });
            return;
        }

        const planteExpositionExistante = await expositionService.getExpositionToOnePlante(planteId);
        if (planteExpositionExistante.some(exposition => exposition.exposition.toString() === expositionId)) {
            res.status(400).json({ message: "Cette plante est déjà associée à cette exposition." });
            return;
        }

        const nouvellePlanteExposition = await expositionService.addExpositionToOnePlante(planteId, expositionId);
        res.status(201).json(nouvellePlanteExposition);

    } catch (error) {
        next(error);
    }
};

//modifie le couple plante/exposition pour une plante
export const updateExpositiontoOnePlante = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { planteId, expositionId } = req.params;

        const planteExistante = await PlanteModel.findById(planteId);
        if (!planteExistante) {
            res.status(404).json({ message: "La plante spécifiée n'existe pas." });
            return;
        }

        const expositionExistante = await ExpositionModel.findById(expositionId);
        if (!expositionExistante) {
            res.status(404).json({ message: "L'exposition spécifiée n'existe pas." });
            return;
        }

        const updatedPlanteExposition = await expositionService.updateExpositionToOnePlante(planteId, expositionId);
        if (!updatedPlanteExposition) {
            res.status(400).json({ message: "Cette association n'existe pas." });
            return;
        }

        res.status(200).json(updatedPlanteExposition);
    } catch (error) {
        next(error);
    }
};

//Supprimer le couple plante/exposition pour une plante
export const deleteExpositionToOnePlante = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { planteId, expositionId } = req.params;

        const planteExpositionExistante = await expositionService.getExpositionToOnePlante(planteId);

        if (!planteExpositionExistante.some(exposition => exposition.exposition.toString() === expositionId)) {
            res.status(404).json({ message: "L'association plante-exposition spécifiée n'existe pas." });
            return;
        }

        await expositionService.deleteExpositionToOnePlante(planteId, expositionId);
        res.status(200).json({ message: "L'association entre la plante et l'exposition a été supprimée avec succès." });
    } catch (error) {
        next(error);
    }
};

export default {
    getExpositionToOnePlante,
    addExpositionToOnePlante,
    updateExpositiontoOnePlante,
    deleteExpositionToOnePlante,
}