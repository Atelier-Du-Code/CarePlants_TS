// services/astuceService.ts

import AstuceModele, { TypeAstuce } from '../models/astuceModele';

export const getAstuces = async (): Promise<TypeAstuce[]> => {
  return await AstuceModele.find({});
};

export const getAstuceById = async (astuceId: string): Promise<TypeAstuce | null> => {
  return await AstuceModele.findById(astuceId);
};

export const createAstuce = async (nom: string, description: string): Promise<TypeAstuce> => {
  const nouvelleAstuce = new AstuceModele({ nom, description });
  await nouvelleAstuce.save();
  return nouvelleAstuce;
};

export const updateAstuce = async (astuceId: string, nom: string, description: string): Promise<TypeAstuce | null> => {
  const astuceExistante = await AstuceModele.findById(astuceId);
  if (!astuceExistante) {
    return null;
  }
  astuceExistante.nom = nom;
  astuceExistante.description = description;
  await astuceExistante.save();
  return astuceExistante;
};

export const deleteAstuce = async (astuceId: string): Promise<boolean> => {
  const result = await AstuceModele.findByIdAndDelete(astuceId);
  return result !== null;
};
