import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import * as planteEnvironnementService from '../services/plante_environnementService';
import PlanteModel from '../models/planteModele';
import EnvironnementModel from '../models/environnementModele';

export const getAllEnvironnementPlante = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const plantesEnvironnements = await planteEnvironnementService.getAllEnvironnementPlante();
        res.json(plantesEnvironnements);
    } catch (error) {
        next(error);
    }
};

export const getEnvironnementPlante = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { planteId, environnementId } = req.params;
        const environnement = await planteEnvironnementService.getEnvironnementPlante(planteId, environnementId);
        res.json(environnement);
    } catch (error) {
        next(error);
    }
};

export const addEnvironnementToOnePlante = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { planteId, environnementId } = req.params;

        const planteExistante = await PlanteModel.findById(planteId);
        if (!planteExistante) {
            res.status(404).json({ message: "La plante spécifiée n'existe pas." });
            return;
        }

        const environnementExistant = await EnvironnementModel.findById(environnementId);
        if (!environnementExistant) {
            res.status(404).json({ message: "L'environnement spécifié n'existe pas." });
            return;
        }

        const planteEnvironnementExistant = await planteEnvironnementService.getEnvironnementPlante(planteId, environnementId);
        if (planteEnvironnementExistant.length > 0) {
            res.status(400).json({ message: "Cette plante est déjà associée à cet environnement." });
            return;
        }

        const nouveauPlanteEnvironnement = await planteEnvironnementService.addEnvironnementToOnePlante(planteId, environnementId);
        res.status(201).json(nouveauPlanteEnvironnement);
    } catch (error) {
        next(error);
    }
};

export const updateEnvironnementToOnePlante = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { planteEnvironnementId, environnementId } = req.params;

        const environnementExistant = await EnvironnementModel.findById(environnementId);
        if (!environnementExistant) {
            res.status(404).json({ message: "L'environnement spécifié n'existe pas." });
            return;
        }

        const planteEnvironnementExistant = await planteEnvironnementService.updateEnvironnementToOnePlante(planteEnvironnementId, new mongoose.Types.ObjectId(environnementId));
        if (!planteEnvironnementExistant) {
            res.status(404).json({ message: "Cette association plante/environnement n'existe pas." });
            return;
        }

        res.status(200).json(planteEnvironnementExistant);
    } catch (error) {
        next(error);
    }
};

export const deleteEnvironnementToOnePlante = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { planteEnvironnementId } = req.params;

        const planteEnvironnementExistant = await planteEnvironnementService.getEnvironnementPlante(planteEnvironnementId, '');
        if (planteEnvironnementExistant.length === 0) {
            res.status(404).json({ message: "L'association plante/environnement spécifiée n'existe pas." });
            return;
        }

        await planteEnvironnementService.deleteEnvironnementToOnePlante(planteEnvironnementId);
        res.status(200).json({ message: "L'association plante/environnement a été supprimée avec succès." });
    } catch (error) {
        next(error);
    }
};


export default {
    getAllEnvironnementPlante,
    getEnvironnementPlante,
    addEnvironnementToOnePlante,
    updateEnvironnementToOnePlante,
    deleteEnvironnementToOnePlante
  };
  