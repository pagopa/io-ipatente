import { client } from "@/common/client";
import { useQuery } from "@tanstack/react-query";

const fetchVehicles = async (fiscalCode: string) => {
  const response = await client.getInfoVeicoli({
    queries: {
      codiceFiscaleProprietario: fiscalCode,
    },
  });
  return response;
};

export const useVehicles = (fiscalCode: string) =>
  useQuery({
    queryFn: () => fetchVehicles(fiscalCode),
    queryKey: ["vehicles"],
  });
