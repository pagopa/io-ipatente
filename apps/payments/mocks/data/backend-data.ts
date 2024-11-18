import {
  Iuv,
  Pagamento,
  StatoIuv,
  StatoRichiestaPagamento,
} from "@/generated/bff-openapi";
import { faker } from "@faker-js/faker/locale/it";

const statoRichiestaPagamentoValues: StatoRichiestaPagamento[] = [
  { codice: "A", descrizione: "PARZIALMENTE ANNULLATA" },
  { codice: "B", descrizione: "BRUCIATA" },
  { codice: "C", descrizione: "CREAZIONE IN CORSO" },
  { codice: "D", descrizione: "DA PAGARE" },
  { codice: "E", descrizione: "DA INTEGRARE IN ERRORE" },
  { codice: "G", descrizione: "DISAGGREGATA" },
  { codice: "I", descrizione: "PAGAMENTO IN CORSO" },
  { codice: "L", descrizione: "CANCELLATA" },
  { codice: "M", descrizione: "PARZIALMENTE RIMBORSATA" },
  { codice: "N", descrizione: "DA INTEGRARE" },
  { codice: "P", descrizione: "PAGATA" },
  { codice: "R", descrizione: "RIMBORSATA" },
  { codice: "X", descrizione: "ELABORATA CON ERRORE" },
  { codice: "Z", descrizione: "PARZIALMENTE CANCELLATA" },
];

const tariffarioValues: string[] = [
  "NAZIONALE",
  "TRENTO",
  "SICILIA",
  "BOLZANO",
];

const statoIuvValues: StatoIuv[] = [
  { codice: "A", descrizione: "ANNULLATO" },
  { codice: "B", descrizione: "BRUCIATO" },
  { codice: "C", descrizione: "CREAZIONE IN CORSO" },
  { codice: "D", descrizione: "DA PAGARE" },
  { codice: "E", descrizione: "INVIO IN ERRORE" },
  { codice: "M", descrizione: "DA RIMBORSARE" },
  { codice: "N", descrizione: "PAGAMENTO IN CORSO" },
  { codice: "P", descrizione: "PAGATO" },
  { codice: "R", descrizione: "RIVITALIZZATO" },
  { codice: "S", descrizione: "SCADUTO" },
  { codice: "T", descrizione: "RIMBORSATO" },
];

const getIuv = (): Iuv => ({
  codiceIuv: faker.string.uuid(),
  contoCorrente: faker.finance.accountNumber(),
  dataScadenzaIuv: faker.date.future().toISOString().split("T")[0],
  importo: +faker.commerce.price(),
  statoIuv: faker.helpers.arrayElement([...statoIuvValues]),
  tipoIncasso: faker.lorem.sentence(),
});

export const getListaIuv = () =>
  faker.helpers.arrayElement([
    [],
    Array.from({ length: faker.number.int({ max: 5, min: 1 }) }, () =>
      getIuv(),
    ),
  ]);

const getPagamento = (): Pagamento => ({
  causale: faker.lorem.sentence(5),
  codiceFiscalePagatore: "AAAAAA00A00A000A",
  codiceTipoPratica: "ABC123",
  cognomePagatore: faker.person.lastName(),
  dataInserimentoRichiesta: faker.date.past().toISOString().split("T")[0],
  descrizioneTipoPratica: faker.lorem.sentence(5),
  flagAbbinamento: faker.helpers.arrayElement([true, false]),
  flagCumulativo: faker.helpers.arrayElement([true, false]),
  flagEsenzione: faker.helpers.arrayElement([true, false]),
  flagUrgenza: faker.helpers.arrayElement([true, false]),
  idCarrello: faker.number.int(),
  idRichiesta: faker.number.int(),
  listaIuv: [...getListaIuv()],
  nomePagatore: faker.person.firstName(),
  numeroPratiche: faker.number.int({ max: 100, min: 10 }),
  statoPratica: faker.helpers.arrayElement([...statoRichiestaPagamentoValues]),
  tariffario: faker.helpers.arrayElement([...tariffarioValues]),
});

export const getMockPayments = () =>
  faker.helpers.arrayElement([
    [],
    Array.from({ length: faker.number.int({ max: 5, min: 1 }) }, () =>
      getPagamento(),
    ),
  ]);
