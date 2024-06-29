import { Request, Response } from 'express';
import AstuceModele, { TypeAstuce } from '../models/astuceModele';
import { MongooseError } from 'mongoose';

// Récuperer toutes les astuces
export const getAstuces = async (req: Request, res: Response): Promise<void> => {
  try {
    const astuces: TypeAstuce[] = await AstuceModele.find({});
    res.json(astuces);
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: "AstuceController - Une erreur s'est produite lors de la récupération des astuces" });
    } else {
      res.status(500).json({ message: "Une erreur inconnue s'est produite" });
    }
  }
};

export default { getAstuces };
