import { Tipologia } from "./tipologia";

export interface Veicolo {
    id?: number;
    casaCostruttrice?: string;
    modello?: string;
    annoImmatricolazione?: string;
    targa?: string;
    cilindrata?: number;
    potenza?: number;
    emissioni?: string;
    alimentazione?: string;
    numeroTelaio?: string;
    kilometraggio?: string;
    consumoMedioCarburanteUrbano?: string;
    consumoMedioCarburanteExtraurbano?: string;
    tipologia?: Tipologia;
}
