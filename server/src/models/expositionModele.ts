import mongoose,  { Schema, Document, Model }from 'mongoose';

export interface TypeExposition extends Document {
    id: number;
    nom: string;
}

const ExpositionSchema: Schema = new Schema({
    nom: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
   
});

const ExpositionModele: Model<TypeExposition> = mongoose.model<TypeExposition>('Exposition', ExpositionSchema);

export default ExpositionModele;
