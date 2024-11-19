import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface pour définir les types de données du schéma
export interface TypePlante extends Document {
    name: string;
    scientific_name: string;
    description: string;
    type: string;
    exposition: mongoose.Types.ObjectId[];
    environnement: mongoose.Types.ObjectId;
    temp_min: number;
    temp_max: number;
    frequence_arrosage: string;
    parasite: mongoose.Types.ObjectId;
    astuce: mongoose.Types.ObjectId[];
    interieur_exterieur: string;
    images: string[];
    asset3D: string;
}

// Définition du schéma
const PlanteSchema: Schema<TypePlante> = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    scientific_name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },  
    type: {
        type: String,
        required: true,
    },  
    exposition: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exposition',
        required: true,
    }],
    environnement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Environnement',
        required: true,
    },
    temp_min: {
        type: Number,
        required: true, 
    },
    temp_max: {
        type: Number,
        required: true, 
    },
    frequence_arrosage: {
        type: String,
        required: true, 
        trim: true,
        lowercase: false,
    },
    parasite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parasite',
        required: true,
    },
    astuce: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Astuce',
        required: true,
    }],
    interieur_exterieur: {
        type: String,
        required: true,
    },

    images: [{
        type: String,
        required: false,
    }],
    asset3D: {
        type: String,
        required: false,
    },
});

// Définition du modèle
const PlanteModele: Model<TypePlante> = mongoose.model<TypePlante>('Plante', PlanteSchema);

export default PlanteModele;
