import PlanteExpositionModel, { PlanteExpositionType } from '../models/planteExpositionModele';
import mongoose from 'mongoose';




export const getExpositionToOnePlante = async (planteId: string): Promise<PlanteExpositionType[]> => {
    return await PlanteExpositionModel.find({ plante: new mongoose.Types.ObjectId(planteId) }).populate('exposition');
};


// Obtenir toutes les plantes pour une astuce donnée
export const getAllPlantesToOneExposition = async (expositionId: string): Promise<PlanteExpositionType[]> => {
    return await PlanteExpositionModel.find({ exposition: expositionId }).populate('plante').exec();
};

export const addExpositionToOnePlante = async (planteId: string, expositionId: string): Promise<PlanteExpositionType> => {
    const nouvellePlanteExposition = new PlanteExpositionModel({
        plante: new mongoose.Types.ObjectId(planteId),
        exposition: new mongoose.Types.ObjectId(expositionId),
    });
    return await nouvellePlanteExposition.save();
};

export const updateExpositionToOnePlante = async (planteId: string, expositionId: string): Promise<PlanteExpositionType | null> => {
    const planteExpositionExistante = await PlanteExpositionModel.findOne({ plante: new mongoose.Types.ObjectId(planteId), exposition: new mongoose.Types.ObjectId(expositionId) });
    if (planteExpositionExistante) {
        planteExpositionExistante.plante = new mongoose.Types.ObjectId(planteId);
        planteExpositionExistante.exposition = new mongoose.Types.ObjectId(expositionId);
        return await planteExpositionExistante.save();
    }
    return null;
};

export const deleteExpositionToOnePlante = async (planteId: string, expositionId: string): Promise<void> => {
    await PlanteExpositionModel.deleteOne({ plante: new mongoose.Types.ObjectId(planteId), exposition: new mongoose.Types.ObjectId(expositionId) });
};
