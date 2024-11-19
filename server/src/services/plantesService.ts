import PlanteModele, { TypePlante } from '../models/planteModele';

import ExpositionModele, { TypeExposition } from '../models/expositionModele';
import EnvironnementModele, { TypeEnvironnement } from '../models/environnementModele';
import ParasiteModele, { TypeParasite } from '../models/parasiteModele';
import AstuceModele, { TypeAstuce } from '../models/astuceModele';
import mongoose from 'mongoose';
import { createAstuce } from './astuceService';
import { getAllAstuces } from '../controllers/astuceController';

interface AstuceCreator {
    nom : string,
    description : string,
}

interface TypePlanteCreator {

    name : String;
    scientific_name: String;

    description: String;
    type: String;
    exposition: TypeExposition[];
    environnement: TypeEnvironnement;

    temp_min: Number;
    temp_max: Number;
    frequence_arrosage: String;
    parasite: TypeParasite;
    astuce: AstuceCreator[];
    interieur_exterieur: String;
    images: String[];
    asset3D: String;


}

//Récuperer toutes les plantes

export const getAllPlantes = async (): Promise<TypePlante[] | null> => {
    
    const plantes = await PlanteModele.find()
    .populate('exposition')
    .populate('environnement')
    .populate('parasite')
    .populate('astuce');

    return plantes;
};

export const getPlanteById = async (planteId: string): Promise<TypePlante | null> => {
    
    const plante = await PlanteModele.findById(planteId)
    .populate('exposition')
    .populate('environnement')
    .populate('parasite')
    .populate('astuce');
    
    return plante;
};

export const addPlante = async (planteData: TypePlanteCreator) => {

    //Champs remplis par l'utilisateur
     const name = planteData.name;
     const scientific_name = planteData.scientific_name;
     const description = planteData.description;     
     const temp_min = planteData.temp_min;
     const temp_max = planteData.temp_max;
     const frequence_arrosage = planteData.frequence_arrosage;     
     const images = planteData.images;
     const asset3D = planteData.asset3D;
    //Avec intégration diférente dans la base de données
    const astuce = planteData.astuce;

     //Champs avec selection combobox avec données manuelles
     const type = planteData.type;
     const interieur_exterieur = planteData.interieur_exterieur;

     //Champs avec selection combobox avec données dase de données
     const exposition = planteData.exposition;
     const environnement = planteData.environnement;
     const parasite = planteData.parasite;

    
    

    //Vérification des données de la base de données

    const expositionExistante = await ExpositionModele.find({ _id: { $in: exposition } });
    const environnementExistant = await EnvironnementModele.findById(environnement);
    const parasiteExistant = await ParasiteModele.findById(parasite);

     if (expositionExistante.length !== exposition.length) {
        throw new Error("Une ou plusieurs expositions spécifiées n'existent pas.");
    }

    if (!environnementExistant) {
        throw new Error("L'environnement spécifié n'existe pas.");
    }

    if (!parasiteExistant) {
        throw new Error("Le parasite spécifié n'existe pas.");
    }

    //Création des astuces dans la base pour en récupérer les identifients
    const idSAstuces: mongoose.Types.ObjectId[] = [];
    const AllAstuces: TypeAstuce[] = [];























    const astucesIds: mongoose.Types.ObjectId[] = [];

    //for (const astuceData of planteData.astuce) {
        
    //    const astuceId = await createAstuce(astuceDat); // Utiliser la fonction existante pour créer l'astuce
    //    astucesIds.push(astuceId);
    //}

};

