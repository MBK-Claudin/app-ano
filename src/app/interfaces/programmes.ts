export interface Programmes {
    id: number,
    objectif_id: number,
    libelle: string,
    date_debut: Date,
    date_fin: Date,
    organisation: string[],
    ancrage: string[],
    responsable: string[]
    email: string[]
}
