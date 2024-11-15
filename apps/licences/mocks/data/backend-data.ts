import { MovPat, Patenti, TipoCqc, TipoEvento } from "@/generated/bff-openapi";
import { faker } from "@faker-js/faker/locale/it";

const tipoCqcValues: TipoCqc[] = [
  {
    codice: "M",
    descrizione: "Merci",
  },
  {
    codice: "MP",
    descrizione: "Merci e persone",
  },
  {
    codice: "P",
    descrizione: "Persone",
  },
];

const tipoEventoValues: TipoEvento[] = [
  {
    codice: "0001",
    descrizione: "ATTRIBUZIONE PUNTEGGIO INIZIALE",
  },
  {
    codice: "0002",
    descrizione: "CORSO DI AGGIORNAMENTO",
  },
  {
    codice: "0003",
    descrizione: "RIPRISTINO PUNTEGGIO",
  },
  {
    codice: "0004",
    descrizione: "VERBALE DI VIOLAZIONE",
  },
  {
    codice: "0005",
    descrizione: "INFRAZIONE VERBALE",
  },
  {
    codice: "0006",
    descrizione: "BLOCCO REINTEGRO PUNTI",
  },
];

const getMovimentazione = (): MovPat => ({
  codiceVerbale: faker.string.alphanumeric({ casing: "upper", length: 6 }),
  dataAttribuzionePunteggio: faker.date.past().toISOString().split("T")[0],
  dataEmissioneVerbale: faker.date.past().toISOString().split("T")[0],
  descrizioneAusiliarioAge: faker.person.fullName(),
  descrizioneDenominazioneEnteAccertatore: faker.company.name(),
  descrizioneDenonimazioneEnteAccertatoreEmissione: faker.company.name(),
  descrizioneEventoPunteggio: "INCREMENTO ASSENZA VIOLAZIONI",
  punteggioEffettuato: faker.number.int({
    max: 5,
    min: -5,
  }),
  punteggioNominativo: faker.number.int({
    max: 5,
    min: -5,
  }),
  tipoEvento: faker.helpers.arrayElement([...tipoEventoValues]),
});

const getMovPat = (total: number) =>
  Array.from({ length: total }, () => getMovimentazione());

export const getMockLicences = (): Patenti => ({
  anagrafica: {
    codiceFiscale: "AAAAAA00A00A000A",
    dataNascita: faker.date.past().toISOString().split("T")[0],
    descrizioneCognome: faker.person.lastName(),
    descrizioneNome: faker.person.firstName(),
    progressivoPosizioneAnagrafica: faker.number.int({
      max: 99999999,
      min: 10000000,
    }),
  },
  datiPatente: [
    {
      dataScadenza: faker.date.future().toISOString().split("T")[0],
      movPat: getMovPat(
        faker.number.int({
          max: 10,
          min: 1,
        }),
      ),
      numeroPatente: faker.string.alphanumeric({ casing: "upper", length: 10 }),
      saldoPunti: faker.number.int({
        max: 30,
        min: 0,
      }),
      tipoCqc: faker.helpers.arrayElement([...tipoCqcValues]),
    },
  ],
  datiPatenteCqc: [
    {
      dataScadenza: faker.date.future().toISOString().split("T")[0],
      movPat: getMovPat(
        faker.number.int({
          max: 10,
          min: 1,
        }),
      ),
      numeroPatente: faker.string.alphanumeric({ casing: "upper", length: 10 }),
      saldoPunti: faker.number.int({
        max: 30,
        min: 0,
      }),
      tipoCqc: faker.helpers.arrayElement([...tipoCqcValues]),
    },
  ],
});
