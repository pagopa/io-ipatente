import { useQuery } from "@tanstack/react-query";

import { client } from "@/common/client";
import { Veicolo } from "@/generated/bff-openapi";

const fetchVehicles = async (): Promise<Veicolo[]> => {
  const response = await client.getInfoVeicoli();
  return response;
};

export const useVehicles = <TData = Veicolo[]>(
  select?: (data: Veicolo[]) => TData,
) =>
  useQuery({
    queryFn: () => fetchVehicles(),
    queryKey: ["vehicles"],
    select,
  });
