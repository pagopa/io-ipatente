import { faker } from "@faker-js/faker/locale/it";

// TODO: just a placeholder, replace with correct mock vehicle object
export const getMockVehicle = () => ({
  todo: faker.lorem.word(),
});

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
