import mongoose from 'mongoose';
import PlanteAstuceModel, { PlanteAstuceType } from '../models/plante_astuceModele';


// Récupérer toutes les astuces pour une plante
export const getAllAstuceToOnePlante = async (planteId: string): Promise<PlanteAstuceType[]> => {
    return await PlanteAstuceModel.find({ plante: planteId }).populate('astuce').exec();
};

// Créer un nouveau couple plante/astuce
export const createPlanteAstuce = async (planteId: string, astuceId: string): Promise<PlanteAstuceType> => {
    const nouvelleRelation = new PlanteAstuceModel({ plante: planteId, astuce: astuceId });
    return await nouvelleRelation.save();
};

// Mettre à jour un couple plante/astuce
export const updatePlanteAstuce = async (planteId: string, oldAstuceId: string, newAstuceId: string): Promise<PlanteAstuceType | null> => {
    const relationExistante = await PlanteAstuceModel.findOne({ plante: planteId, astuce: oldAstuceId });
    if (!relationExistante) {
      return null;
    }
    
    relationExistante.astuce = new mongoose.Types.ObjectId(newAstuceId);
    await relationExistante.save();
    
    return relationExistante;
  };

// Supprimer un couple plante/astuce
export const deletePlanteAstuce = async (planteId: string, astuceId: string): Promise<void> => {
    await PlanteAstuceModel.findOneAndDelete({ plante: planteId, astuce: astuceId }).exec();
};


