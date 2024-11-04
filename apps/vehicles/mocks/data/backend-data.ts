import {
  ClasseAmbientaleEnum,
  CoperturaRCA,
  DatiVeicolo,
  EsitoRevisione,
  ExtraMassa,
  Neopatentati,
  Revisione,
  TipoVeicoloEnum,
  Veicolo,
} from "@/generated/bff-openapi";
import { faker } from "@faker-js/faker/locale/it";

const extraMassaValues: ExtraMassa[] = [
  {
    codice: "EXTRAM_MSG_001",
    descrizione:
      "Il veicolo di categoria N2, alimentato con combustibile alternativo e con una massa autorizzata massima compresa tra 3.500 kg e 4.250 kg, adibito al trasporto di merci e che opera senza rimorchio, puo' essere condotto dai titolari di una patente di guida di categoria B rilasciata da almeno due anni",
  },
  {
    codice: "EXTRAM_MSG_002",
    descrizione:
      "QUANTITA' MASSA TOTALE ASSENTE SU OMOLOGAZIONE - IMPOSSIBILE CALCOLARE L'EXTRAMASSA",
  },
  {
    codice: "EXTRAM_MSG_003",
    descrizione:
      "QUANTITA' MASSA TOTALE ASSENTE - IMPOSSIBILE CALCOLARE L'EXTRAMASSA",
  },
  {
    codice: "EXTRAM_MSG_004",
    descrizione:
      "MASSA SUPPLEMENTARE NON DISPONIBILE - CONTATTARE LA CASA COSTRUTTRICE PER L'INSERIMENTO DI TALE INFORMAZIONE",
  },
  {
    codice: "EXTRAM_MSG_005",
    descrizione:
      "ERRORE IMPREVISTO, CONTROLLARE IL LOG PER MAGGIORI INFORMAZIONI",
  },
];

const neopatentatiValues: Neopatentati[] = [
  {
    codice: "NEOP_MSG_001",
    descrizione: "Autorizzato alla guida",
  },
  {
    codice: "NEOP_MSG_002",
    descrizione: "Non autorizzato alla guida",
  },
  {
    codice: "NEOP_MSG_003",
    descrizione: "Dato Non Verificabile",
  },
];

const esitoRevisioneValues: EsitoRevisione[] = [
  {
    codice: "REV_MSG_001",
    descrizione: "Regolare",
  },
  {
    codice: "REV_MSG_002",
    descrizione: "Da ripetere",
  },
  {
    codice: "REV_MSG_003",
    descrizione: "Sospesa",
  },
];

const tipoDestinazioneUsoVeicoloValues = [
  "DI TERZI DA NOLEGGIO CON CONDUC.",
  "DI TERZI DA LOCARE SENZA CONDUC.",
  "DI TERZI",
  "PROPRIO",
  "DI TERZI CON AUTORIZZAZIONI VINCOLATE",
  "DI TERZI CON AUTORIZZAZIONE LIBERA",
  "USO SPECIALE",
  "PRIV.,LOCAZIONE FAC. COMPERA",
];

const tipoUsoVeicoloValues = [
  "AUTOVEICOLO IN SERVIZIO PUBBLICO DI LINEA INTEGRATIVO",
  "AUTOVEICOLO USO ESCLUSIVO DI POLIZIA",
  "AUTOVETTURA PER TRASPORTO DI PERSONE",
  "AUTOBUS PER TRASPORTO DI PERSONE",
  "AUTOCARRO PER TRASPORTO DI COSE",
  "AUTOCARAVAN",
  "AUTOVEICOLO PER USO SPECIALE",
  "TRAS.SPECIFICO PERSONE PART.CONDIZIONI",
  "AUTOVEIC.TRASP.PROMISCUO PERSONE/COSE",
  "TRATTORE STRADALE PER RIMORCHIO",
  "TRATTORE PER SEMIRIMORCHIO",
  "AUTOVEICOLO PER TRASPORTO SPECIFICO",
  "QUADRICICLO PER TRASP. DI PERSONE",
  "QUADRICICLO PER TRASP.DI COSE",
  "QUADRICICLO PER USO SPECIALE",
  "QUADRICICLO TRASP. SPECIFICO",
  "MOTOVEICOLO USO ESCLUSIVO DI POLIZIA",
  "TRICICLO PER TRASPORTO PROMISCUO",
  "TRICICLO PER USO SPECIALE",
  "TRICICLO PER TRASPORTO SPECIFICO",
  "MOTOCICLO PER TRASPORTO PERSONE",
  "TRICICLO PER TRASPORTO COSE",
  "TRICICLO PER TRASPORTO DI PERSONE",
  "SEMIRIMORCHIO PER TRASPORTO SPECIFICO",
  "SEMIRIMORCHIO PER TRASPORTO COSE",
  "RIMORCHIO PER TRASPORTO ATTREZZATURE TURISTICHE E SPORTIVE",
  "RIMORCHIO PER TRASPORTI SPECIFICI",
  "SEMIRIMORCHIO PER TRASPORTO PERSONE",
  "RIMORCHIO PER TRASPORTO COSE",
  "CARAVAN",
  "RIMORCHIO PER TRASPORTO PERSONE",
  "RIMORCHIO PER USO SPECIALE",
  "SEMIRIMORCHIO PER USO SPECIALE",
  "CICLOMOTORE",
  "VEICOLO USO SPECIALE AUTOSCUOLA",
  "QUADRICICLO USO ESCLUSIVO DI POLIZIA",
  "USO SPEC AUTOSCUOLA RIMORCHIO ABB ESCL VEIC USO SPEC AUTOSC",
  "AUTOVEICOLO PER USO SPECIALE DELLA POLIZIA LOCALE",
];

const getDatiVeicolo = (): DatiVeicolo => ({
  classeAmbientale: faker.helpers.arrayElement([
    undefined,
    ...ClasseAmbientaleEnum.options,
  ]),
  extraMassa: faker.helpers.arrayElement([undefined, ...extraMassaValues]),
  neopatentati: faker.helpers.arrayElement([undefined, ...neopatentatiValues]),
  tipoDestinazioneUsoVeicolo: faker.helpers.arrayElement([
    undefined,
    ...tipoDestinazioneUsoVeicoloValues,
  ]),
  tipoUsoVeicolo: faker.helpers.arrayElement([
    undefined,
    ...tipoUsoVeicoloValues,
  ]),
});

const getRevisione = (): Revisione => ({
  dataRevisione: faker.date.past().toISOString().split("T")[0],
  esitoRevisione: faker.helpers.arrayElement([...esitoRevisioneValues]),
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
