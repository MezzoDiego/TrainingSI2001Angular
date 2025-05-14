import { Utente } from "./utente";
import { Veicolo } from "./veicolo";

export interface Booking {
    id?: number;
    dataInizio?: Date;
    dataFine?: Date;
    flagApprovazione?: boolean;
    user?: Utente;
    vehicle?: Veicolo;
}