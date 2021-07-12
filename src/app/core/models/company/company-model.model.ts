export class CompanyModel {
    id: number=0;
    name: string='';
    vatNumber: string='';
    uniqueIdentificationNumber: string='';
    period: string='';
    file!: File;
}