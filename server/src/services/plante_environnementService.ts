import mongoose from 'mongoose';
import PlanteEnvironnementModel, { PlanteEnvironnementType } from '../models/plante_environnementModele';

export const getAllEnvironnementPlante = async (): Promise<PlanteEnvironnementType[]> => {
    return await PlanteEnvironnementModel.find({});
};

export const getEnvironnementPlante = async (planteId: string, environnementId: string): Promise<PlanteEnvironnementType[]> => {
    return await PlanteEnvironnementModel.find({ plante: planteId, environnement: environnementId }).populate('environnement');
};

export const addEnvironnementToOnePlante = async (planteId: string, environnementId: string): Promise<PlanteEnvironnementType> => {
    const nouveauPlanteEnvironnement = new PlanteEnvironnementModel({ plante: planteId, environnement: environnementId });
    return await nouveauPlanteEnvironnement.save();
};

export const updateEnvironnementToOnePlante = async (planteEnvironnementId: string, environnementId: mongoose.Types.ObjectId): Promise<PlanteEnvironnementType | null> => {
    const planteEnvironnementExistant = await PlanteEnvironnementModel.findById(planteEnvironnementId);
    if (planteEnvironnementExistant) {
        planteEnvironnementExistant.environnement = environnementId;
        return await planteEnvironnementExistant.save();
    }
    return null;
};

export const deleteEnvironnementToOnePlante = async (planteEnvironnementId: string): Promise<void> => {
    await PlanteEnvironnementModel.findByIdAndDelete(planteEnvironnementId);
};
