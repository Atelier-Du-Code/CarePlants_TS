import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import * as astuceService from '../services/astuceService';


// Récupérer toutes les astuces
export const getAllAstuces = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const astuces = await astuceService.getAstuces();
    res.json(astuces);
  } catch (error) {
    next(error);
  }
};

// Récupérer une astuce par son ID
export const getAstuceById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { astuceId } = req.params;
  try {
    const astuce = await astuceService.getAstuceById(astuceId);
    res.json(astuce);
   
  } catch (error) {
    next(error);
  }
};

// Ajouter une nouvelle astuce
export const addAstuce = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { nom, description } = req.body;
  try {
    const nouvelleAstuce = await astuceService.createAstuce(nom, description);
    res.status(HttpStatus.CREATED).json({ message: "L'astuce a été créée avec succès", astuce: nouvelleAstuce });
  } catch (error) {
    next(error);
  }
};

// Mettre à jour une astuce
export const updateAstuce = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { astuceId } = req.params;
  const { nom, description } = req.body;
  try {
    const astuce = await astuceService.updateAstuce(astuceId, nom, description);
    if (astuce) {
      res.json({ message: "L'astuce a bien été mise à jour", astuce });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({message: "L'astuce n'a pas été trouvée" });
    }
  } catch (error) {
    next(error);
  }
};

// Supprimer une astuce
export const deleteAstuce = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { astuceId } = req.params;
  try {
    const deleted = await astuceService.deleteAstuce(astuceId);
    if (deleted) {
      res.json({ message: "L'astuce a bien été supprimée" });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: "L'astuce n'a pas été trouvée" });
    }
  } catch (error) {
    next(error);
  }
};

export default {
  getAllAstuces,
  getAstuceById,
  addAstuce,
  updateAstuce,
  deleteAstuce,
};
