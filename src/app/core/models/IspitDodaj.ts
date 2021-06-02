export class IspitDodaj {
    id?: number;
    naslov: string;
    opis: string;
    urlDokumenta?: string;
    vrijemePocetka?: Date;
    vrijemeZavrsetka?: Date;
    organizacijaKursaId: number;
    
    constructor(id?:number,
                naslov?:string,
                opis?:string,
                urldokumenta?:string,
                vrijemepocetka?:Date,
                vrijemezavrsetka?:Date,
                organizacijakursaid?:number)
    {
        this.id = id != undefined ? id : -1;
        this.naslov = naslov != undefined ? naslov : 'NaN';
        this.opis = opis != undefined ? opis : 'NaN';
        this.urlDokumenta = urldokumenta != undefined ? urldokumenta : 'NaN';
        this.vrijemePocetka = vrijemepocetka != undefined ? vrijemepocetka : undefined;
        this.vrijemeZavrsetka = vrijemezavrsetka != undefined ? vrijemezavrsetka : undefined;
        this.organizacijaKursaId = organizacijakursaid != undefined ? organizacijakursaid : -1;
    }
}
