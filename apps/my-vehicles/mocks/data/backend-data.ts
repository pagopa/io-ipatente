import { faker } from "@faker-js/faker/locale/it";

export const getMockVehicles = [
  {
    targaVeicolo: faker.vehicle.vrm(),
    tipoVeicolo: "C",
  },
];

export const aMockBadRequestError = {
  codice: "ERR-VEIC-BE-InfoVeicoli-100",
  descrizione: "Codice Fiscale obbligatorio",
};

export const aMockNotAuthorizedError = {
  codice: "ERR-VEIC-BE-InfoVeicoli-020",
  descrizione: "Operazione non autorizzata",
};

export const aMockForbiddenError = {
  codice: "ERR-VEIC-BE-InfoVeicoli-020",
  descrizione: "Operazione non autorizzata",
};

export const aMockNotFoundError = {
  codice: "ERR-VEIC-BE-InfoVeicoli-010",
  descrizione: "Dati non trovati",
};
