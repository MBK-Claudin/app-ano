export interface Programmes {
    id: number,
    objectif_id: number,
    libelle: string,
    objectif_specifique: string,
    date_debut: Date,
    date_fin: Date,
    organisation: string[],
    ancrage: string[],
    responsable: string[]
    email: string[]
}
