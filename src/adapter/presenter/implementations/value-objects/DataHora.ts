import { CustomError, CustomErrorType } from "../../../../utils";

export class DataHora {
    constructor (private readonly data: Date) {
        if(!DataHora.validaData(data))
            throw new CustomError(CustomErrorType.InvalidInput, 'A data é inválida');
    }

    formataData(): string {
        let dataString = this.data.toISOString();
        const [dataDateString, dataHoraString] = dataString.split("T");
        dataString = `${dataDateString.split("-").reverse().join("/")} ${dataHoraString.substring(0, 5)}`;        
        return dataString;
    };

    private static validaData(data: Date) {
        if(data === null || data === undefined)
            return false;
        if(data.getTime() > Date.now())
            return false;
        return true;
    }
}