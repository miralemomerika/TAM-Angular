export class Kurs
{
    id?: number;
    naziv?: string;
    cijena?: number;
    brojCasova?: number;
    opis?: string;
    kapacitet?: number;
    kategorijaKursa!: {
      id: number,
      naziv: string
  };
}
