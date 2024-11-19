import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface pour définir les types de données du schéma
export interface PlanteExpositionType extends Document {
    plante: mongoose.Types.ObjectId;
    exposition: mongoose.Types.ObjectId;
}

// Définition du schéma
const PlanteExpositionSchema: Schema<PlanteExpositionType> = new mongoose.Schema({
    plante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plante',
    },
    exposition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exposition',
    },
});

// Définition du modèle
const PlanteExpositionModele: Model<PlanteExpositionType> = mongoose.model<PlanteExpositionType>('PlanteExposition', PlanteExpositionSchema);
export default PlanteExpositionModele;