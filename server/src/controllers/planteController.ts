import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import * as planteService from '../services/plantesService';


export const getAllPlantes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      const plantes = await planteService.getAllPlantes();
      res.json(plantes);
    } catch (error) {
      next(error);
    }
  };

  export const getPlanteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const { planteId } = req.params;

      const plante = await planteService.getPlanteById(planteId);
      res.json(plante);
    } catch (error) {
      next(error);
    }
  };

export default {
    getAllPlantes,
    getPlanteById,
}