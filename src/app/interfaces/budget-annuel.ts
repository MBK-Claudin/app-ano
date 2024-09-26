export interface BudgetAnnuel {
    id: number;
    programme_id: number,
    periode: string;
    date_debut: Date;
    date_fin: Date;
    excel: File ;
}
