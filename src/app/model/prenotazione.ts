import { Utente } from "./utente";
import { Veicolo } from "./veicolo";

export interface Prenotazione {
    id?: number;
    dataInizio?: Date;
    dataFine?: Date;
    flagApprovazione?: boolean;
    utente?: Utente;
    veicolo?: Veicolo;
}