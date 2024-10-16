import { client } from "@/common/client";
import { Veicolo } from "@/generated/openapi";
import { useQuery } from "@tanstack/react-query";

const fetchVehicles = async () => {
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
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
