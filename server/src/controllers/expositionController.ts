import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import * as expositionService from '../services/expositionService';


// Récupérer toutes les expositions
export const getAllExpositions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const expositions = await expositionService.getAllExpositions();
    res.json(expositions);
  } catch (error) {
    next(error);
  }
};

// Récupérer une exposition par son ID
export const getExpositionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { expositionId } = req.params;
  try {
    const exposition = await expositionService.getExpositionById(expositionId);
    if (exposition) {
      res.json(exposition);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: "L'exposition n'a pas été trouvée" });
    }
  } catch (error) {
    next(error);
  }
};

// Ajouter une nouvelle exposition
export const addExposition = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { nom} = req.body;
  try {
    const nouvelleExposition = await expositionService.createExposition(nom);
    res.status(HttpStatus.CREATED).json({ message: "L'exposition a été créée avec succès", exposition: nouvelleExposition });
  } catch (error) {
    next(error);
  }
};

// Mettre à jour une exposition
export const updateExposition = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { expositionId } = req.params;
  const { nom } = req.body;
  try {
    const exposition = await expositionService.updateExposition(expositionId, nom);
    if (exposition) {
      res.json({ message: "L'exposition a bien été mise à jour", exposition });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({message: "L'exposition n'a pas été trouvée" });
    }
  } catch (error) {
    next(error);
  }
};

// Supprimer une exposition
export const deleteExposition = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { expositionId } = req.params;
  try {
    const deleted = await expositionService.deleteExposition(expositionId);
    if (deleted) {
      res.json({ message: "L'exposition a bien été supprimée" });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: "L'exposition n'a pas été trouvée" });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  getAllExpositions,
  getExpositionById,
  addExposition,
  updateExposition,
  deleteExposition,
};
