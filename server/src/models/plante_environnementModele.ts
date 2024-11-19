import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface pour définir les types de données du schéma
export interface PlanteEnvironnementType extends Document {
    plante: mongoose.Types.ObjectId;
    environnement: mongoose.Types.ObjectId;
}

// Définition du schéma
const PlanteEnvironnementSchema: Schema<PlanteEnvironnementType> = new Schema({
    plante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plante',
        required: true,
        },

    environnement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Environnement',
        required: true,
    },
});

// Définition du modèle
const PlanteEnvironnementModele: Model<PlanteEnvironnementType> = mongoose.model<PlanteEnvironnementType>('PlanteEnvironnement', PlanteEnvironnementSchema);

export default PlanteEnvironnementModele;
