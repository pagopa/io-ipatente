import {
  ClasseAmbientaleEnum,
  CoperturaRCA,
  DatiVeicolo,
  EsitoRevisioneEnum,
  Revisione,
  TipoVeicoloEnum,
  Veicolo,
} from "@/generated/openapi";
import { faker } from "@faker-js/faker/locale/it";

const NPDA_EXTRAMASSA_MSG001 =
  "IL VEICOLO NON RIENTRA NELLE CONDIZIONI DI CUI ALL'ARTICOLO 116, CO.3, LETT. F), N. 2, CDS";
const NPDA_EXTRAMASSA_MSG002 =
  "Il veicolo di categoria N2, alimentato con combustibile alternativo e con una massa autorizzata massima compresa tra 3.500 kg e 4.250 kg, adibito al trasporto di merci e che opera senza rimorchio, può essere condotto dai titolari di una patente di guida di categoria B rilasciata da almeno due anni.";

const NPDA_NEOPAT_MSG001 = "Il veicolo può essere guidato da un neopatentato.";
const NPDA_NEOPAT_MSG002 =
  "Il veicolo non può essere guidato da un conducente che abbia conseguito la patente da meno di un anno. Tale limite non si applica se a fianco del conducente si trova, in funzione di istruttore, persona di età non superiore a sessantacinque anni, munita di patente valida per la stessa categoria, conseguita da almeno dieci anni, ovvero valida per la categoria superiore.";
const NPDA_NEOPAT_MSG003 = "Dati tecnici mancanti.";
const NPDA_NEOPAT_MSG004 = "Dato Non Verificabile.";

const getDatiVeicolo = (): DatiVeicolo => ({
  classeAmbientale: faker.helpers.arrayElement([
    undefined,
    ...ClasseAmbientaleEnum.options,
  ]),
  extraMassa: faker.helpers.arrayElement([
    undefined,
    NPDA_EXTRAMASSA_MSG001,
    NPDA_EXTRAMASSA_MSG002,
  ]),
  neopatentati: faker.helpers.arrayElement([
    undefined,
    NPDA_NEOPAT_MSG001,
    NPDA_NEOPAT_MSG002,
    NPDA_NEOPAT_MSG003,
    NPDA_NEOPAT_MSG004,
  ]),
});

const getRevisione = (): Revisione => ({
  dataRevisione: faker.date.past().toISOString().split("T")[0],
  esitoRevisione: faker.helpers.arrayElement([...EsitoRevisioneEnum.options]),
  kmPercorsi: faker.helpers.arrayElement([
    undefined,
    faker.number.int({ max: 250000, min: 10000 }),
  ]),
  kmTotali: faker.helpers.arrayElement([
    undefined,
    faker.number.int({ max: 250000, min: 10000 }),
  ]),
});

const getStoricoRevisioni = (total: number) =>
  Array.from({ length: total }, () => getRevisione());

const getCoperturaRCA = (): CoperturaRCA => ({
  compagniaAssicuratrice: faker.company.name(),
  dataScadenzaCopertura: faker.date.future().toISOString().split("T")[0],
});

const getVeicolo = (): Veicolo => ({
  coperturaRCA: faker.helpers.arrayElement([undefined, getCoperturaRCA()]),
  datiVeicolo: faker.helpers.arrayElement([undefined, getDatiVeicolo()]),
  storicoRevisioni: faker.helpers.arrayElement([
    undefined,
    [],
    getStoricoRevisioni(faker.number.int({ max: 10, min: 1 })),
  ]),
  targaVeicolo: faker.vehicle.vrm(),
  tipoVeicolo: faker.helpers.arrayElement([...TipoVeicoloEnum.options]),
});

export const getMockVehicles = () =>
  faker.helpers.arrayElement([
    [],
    Array.from({ length: faker.number.int({ max: 5, min: 1 }) }, () =>
      getVeicolo(),
    ),
  ]);
