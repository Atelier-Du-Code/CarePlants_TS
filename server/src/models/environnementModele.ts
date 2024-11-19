import mongoose, { Schema, Document, Model } from 'mongoose';

// Définition de l'interface pour le document Environnement
export interface TypeEnvironnement extends Document {
  id: number;
  nom: string;  
}

// Création du schéma pour l'environnement
const EnvironnementSchema: Schema = new Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  }
});

// Création du modèle en utilisant l'interface IAstuce
const EnvironnementModele: Model<TypeEnvironnement> = mongoose.model<TypeEnvironnement>('Environnement', EnvironnementSchema);

export default EnvironnementModele;
