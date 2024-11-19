import mongoose, { Schema, Document, Model } from 'mongoose';

export interface TypeParasite extends Document {
    id: number;
    nom: string
    description: string;
    contre_attaque: string;
}
const ParasiteSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    contre_attaque: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },   
});

const ParasiteModele: Model<TypeParasite> = mongoose.model<TypeParasite>('Parasite', ParasiteSchema);

export default ParasiteModele;
