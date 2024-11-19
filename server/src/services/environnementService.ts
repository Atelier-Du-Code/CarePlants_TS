import EnvironnementModele from "../models/environnementModele";
import { TypeEnvironnement } from "../models/environnementModele"

export const getEnvironnements = async (): Promise<TypeEnvironnement[]> => {
    return await EnvironnementModele.find({});
  };


  export const getEnvironnementById = async (environnementId: string): Promise<TypeEnvironnement | null> => {
    return await EnvironnementModele.findById(environnementId);
  };
  
  export const createEnvironnement = async (nom: string): Promise<TypeEnvironnement> => {
    const nouvelEnvironnement = new EnvironnementModele({ nom });
    await nouvelEnvironnement.save();
    return nouvelEnvironnement;
  };
  
  export const updateEnvironnement = async (environnementId: string, nom: string): Promise<TypeEnvironnement | null> => {
    const environnementExistant = await EnvironnementModele.findById(environnementId);
    if (!environnementExistant) {
      return null;
    }

    environnementExistant.nom = nom;
    await environnementExistant.save();
    return environnementExistant;
  };
  
  export const deleteEnvironnement = async (environnementId: string): Promise<boolean> => {
    const suppression = await EnvironnementModele.findByIdAndDelete(environnementId);
    return suppression !== null;
  };
  