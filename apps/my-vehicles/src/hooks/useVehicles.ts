import { client } from "@/common/client";
import { useQuery } from "@tanstack/react-query";

const fetchVehicles = async () => {
  const response = await client.getInfoVeicoli();
  return response;
};

export const useVehicles = () =>
  useQuery({
    queryFn: () => fetchVehicles(),
    queryKey: ["vehicles"],
  });
