import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import HttpStatus from 'http-status-codes';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    //Erreur par défaut
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR; 
    let message = "Une erreur s'est produite sur le serveur.";

    // Gestion des erreurs Mongoose
    if (err instanceof mongoose.Error.ValidationError) {
        statusCode = HttpStatus.BAD_REQUEST;
        message = "Les données fournies sont invalides.";
    } else if (err instanceof mongoose.Error.CastError) {
        statusCode = HttpStatus.BAD_REQUEST;
        message = "L'identifiant fourni est invalide.";
    } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        statusCode = HttpStatus.NOT_FOUND;
        message = "Le document spécifié n'existe pas.";
    } else if (err instanceof mongoose.Error.MongooseServerSelectionError) {
        statusCode = HttpStatus.SERVICE_UNAVAILABLE;
        message = "La connexion à la base de données est déconnectée.";
    } else if (err.code === 11000) {
        statusCode = HttpStatus.CONFLICT;
        message = "Le document existe déjà.";
    }

    // Gestion des erreurs personnalisées
    else if (err.name === 'NotFoundError') {
        statusCode = HttpStatus.NOT_FOUND;
        message = "La ressource demandée n'a pas été trouvée.";
    } else if (err.name === 'BadRequestError') {
        statusCode = HttpStatus.BAD_REQUEST;
        message = "La requête est mal formulée ou une ou plusieurs de ses données sont invalides.";
    }


    //Autres

    else if (err.message) {
        message = err.message;
    }

    console.error(err);
    res.status(statusCode).json({ message });
};

export default errorMiddleware;
