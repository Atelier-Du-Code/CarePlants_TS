import mongoose, { Schema, Document, Model } from 'mongoose';

// Définition de l'interface pour le document Astuce
export interface TypeAstuce extends Document {
  id: number;
  nom: string;
  description: string;
}

// Création du schéma pour l'astuce
const AstuceSchema: Schema = new Schema({
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
});

// Création du modèle en utilisant l'interface IAstuce
const AstuceModele: Model<TypeAstuce> = mongoose.model<TypeAstuce>('Astuce', AstuceSchema);

export default AstuceModele;
