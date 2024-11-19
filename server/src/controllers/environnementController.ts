import { Request, Response, NextFunction } from 'express';
import { MongooseError } from 'mongoose';
import HttpStatus from 'http-status-codes';

import EnvironnementModele, { TypeEnvironnement } from '../models/environnementModele.js';
import * as EnvironnementService from '../services/environnementService'


// Récupérer tous les environnements
export const getEnvironnements = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const environnements = await EnvironnementService.getEnvironnements();
      res.json(environnements);
    } catch (error) {
      next(error);
    }
  };


// Récupérer un environnement par son ID
export const getEnvironnementById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { environnementId } = req.params;
    try {
      const environnement = await EnvironnementService.getEnvironnementById(environnementId);
      if (environnement) {
        res.json(environnement);
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ message: "L'environnement n'a pas été trouvé" });
      }
    } catch (error) {
      next(error);
    }
  };


// Ajouter un environnement
export const addEnvironnement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { nom } = req.body;
    try {
      const nouvelEnvironnement = await EnvironnementService.createEnvironnement(nom);
      res.status(HttpStatus.CREATED).json({ message: "L'environnement a été créé avec succès", environnement: nouvelEnvironnement });
    } catch (error) {
      next(error);
    }
  };

// Modifier un environnement
export const updateEnvironnement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { environnementId } = req.params;
    const { nom } = req.body;
    try {
      const environnement = await EnvironnementService.updateEnvironnement(environnementId, nom);
      if (environnement) {
        res.json({ message: "L'environnement a bien été mis à jour", environnement });
      } else {
        res.status(HttpStatus.NOT_FOUND).json({message: "L'environnement n'a pas été trouvé" });
      }
    } catch (error) {
      next(error);
    }
  };

// Supprimer un environnement
export const deleteEnvironnement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { environnementId } = req.params;
    try {
      const suppression = await EnvironnementService.deleteEnvironnement(environnementId);
      if (suppression) {
        res.json({ message: "L'environnement a bien été supprimé" });
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ message: "L'environnement n'a pas été trouvé" });
      }
    } catch (error) {
      next(error);
    }
  };

export default {
    getEnvironnements,
    getEnvironnementById,
    addEnvironnement,
    updateEnvironnement,
    deleteEnvironnement
};
