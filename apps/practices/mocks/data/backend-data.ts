import { Pratica } from "@/generated/bff-openapi";
import { faker } from "@faker-js/faker/locale/it";

const getPratica = (): Pratica => ({
  dataApertura: faker.date.past().toISOString().split("T")[0],
  numeroPratica: faker.number.int({ max: 999999, min: 1000 }),
  statoPratica: "todo",
  tipoPratica: {
    codice: "AX",
    descrizione: faker.lorem.sentence({ max: 10, min: 5 }),
  },
});

export const getMockPractices = () =>
  faker.helpers.arrayElement([
    [],
    Array.from({ length: faker.number.int({ max: 5, min: 1 }) }, () =>
      getPratica(),
    ),
  ]);
