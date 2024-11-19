import ExpositionModele, { TypeExposition } from '../models/expositionModele'

export const getAllExpositions = async (): Promise<TypeExposition[]> => {
  return await ExpositionModele.find({});
};

export const getExpositionById = async (expositionId: string): Promise<TypeExposition | null> => {
  return await ExpositionModele.findById(expositionId);
};

export const createExposition = async (nom: string): Promise<TypeExposition> => {
  const nouvelleExposition = new ExpositionModele({ nom });
  await nouvelleExposition.save();
  return nouvelleExposition;
};

export const updateExposition = async (expositionId: string, nom: string): Promise<TypeExposition | null> => {
  const expositionExistante = await ExpositionModele.findById(expositionId);
  if (!expositionExistante) {
    return null;
  }
  expositionExistante.nom = nom;
  await expositionExistante.save();
  return expositionExistante;
};

export const deleteExposition = async (expositionId: string): Promise<boolean> => {
  const result = await ExpositionModele.findByIdAndDelete(expositionId);
  return result !== null;
};
