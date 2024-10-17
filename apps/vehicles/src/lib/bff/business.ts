import { Veicolo } from "@/generated/openapi";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const retrieveVehicles = (fiscalCode: string): Promise<Veicolo[]> =>
  // TODO: just a placeholder for target implementation
  new Promise((resolve) => {
    const vehicles: Veicolo[] = [{ targaVeicolo: "ZZ123XY", tipoVeicolo: "A" }];
    resolve(vehicles);
  });
