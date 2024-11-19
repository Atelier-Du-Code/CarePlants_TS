import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface pour définir les types de données du schéma
export interface PlanteAstuceType extends Document {
    plante: mongoose.Types.ObjectId;
    astuce: mongoose.Types.ObjectId;
}

// Définition du schéma
const PlanteAstuceSchema: Schema<PlanteAstuceType> = new Schema({
    plante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plante',
        required: true,
    },

    astuce: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Astuce',
        required: true,
    },
});

// Définition du modèle
const PlanteAstuceModele: Model<PlanteAstuceType> = mongoose.model<PlanteAstuceType>('PlanteAstuce', PlanteAstuceSchema);

export default PlanteAstuceModele;
