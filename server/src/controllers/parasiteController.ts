
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import * as parasiteService from '../services/parasiteService';


// Récupérer toutes les parasites
export const getAllParasites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parasite = await parasiteService.getAllParasites();
    res.json(parasite);
  } catch (error) {
    next(error);
  }
};

// Récupérer un parasite par son ID
export const getParasiteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { parasiteId } = req.params;
  try {
    const parasite = await parasiteService.getParasiteById(parasiteId);
    if (parasite) {
      res.json(parasite);
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: "Le parasite n'a pas été trouvé" });
    }
  } catch (error) {
    next(error);
  }
};

// Ajouter un nouveau parasite
export const addParasite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { nom, description, contre_attaque } = req.body;
  try {
    const nouveauParasite = await parasiteService.createParasite(nom, description, contre_attaque);
    res.status(HttpStatus.CREATED).json({ message: "Le parasite a été créé avec succès", parasite: nouveauParasite });
  } catch (error) {
    next(error);
  }
};

// Mettre à jour un parasite
export const updateParasite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { parasiteId } = req.params;
  const { nom, description, contre_attaque } = req.body;
  try {
    const parasite = await parasiteService.updateParasite(parasiteId, nom, description, contre_attaque);
    if (parasite) {
      res.json({ message: "Le parasite a bien été mis à jour", parasite });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({message: "Le parasite n'a pas été trouvé" });
    }
  } catch (error) {
    next(error);
  }
};

// Supprimer un parasite
export const deleteParasite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { parasiteId } = req.params;
  try {
    const suppression = await parasiteService.deleteParasite(parasiteId);
    if (suppression) {
      res.json({ message: "Le parasite a bien été supprimé" });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: "Le parasite n'a pas été trouvé" });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  getAllParasites,
  getParasiteById,
  addParasite,
  updateParasite,
  deleteParasite,
};
