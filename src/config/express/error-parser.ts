import { Response } from "express";
import { CustomError, CustomErrorType } from "../../utils/customError"

export const customErrorToResponse = (err: CustomError, res: Response) => {
    let statusCode = 500;
    let body = {
        mensagem: 'Erro desconhecido'
    };

    switch(err.type) {
        case CustomErrorType.InvalidInputDTO:
        case CustomErrorType.BusinessRuleViolation:
            statusCode = 400;
            body = {
                mensagem: err.message
            };
            break;
        case CustomErrorType.RepositoryDataNotFound:
            statusCode = 404;
            body = {
                mensagem: err.message
            };
            break;
        case CustomErrorType.RepositoryUnknownError:
            statusCode = 500;
            body = {
                mensagem: err.message
            };
            break;
    }

    res.status(statusCode).json(body);
}