import ParasiteModele, { TypeParasite } from '../models/parasiteModele';

export const getAllParasites = async (): Promise<TypeParasite[]> => {
  return await ParasiteModele.find({});
};

export const getParasiteById = async (parasiteId: string): Promise<TypeParasite | null> => {
  return await ParasiteModele.findById(parasiteId);
};

export const createParasite = async (nom: string, description: string, contre_attaque: string): Promise<TypeParasite> => {
  const nouveauParasite = new ParasiteModele({ nom, description, contre_attaque });
  await nouveauParasite.save();
  return nouveauParasite;
};

export const updateParasite = async (parasiteId: string, nom: string, description: string, contre_attaque: string): Promise<TypeParasite | null> => {
  const parasiteExistant = await ParasiteModele.findById(parasiteId);
  if (!parasiteExistant) {
    return null;
  }
  parasiteExistant.nom = nom;
  parasiteExistant.description = description;
  parasiteExistant.contre_attaque = contre_attaque;
  await parasiteExistant.save();
  return parasiteExistant;
};

export const deleteParasite = async (parasiteId: string): Promise<boolean> => {
  const supression = await ParasiteModele.findByIdAndDelete(parasiteId);
  return supression !== null;
};
