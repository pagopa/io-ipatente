import { client } from "@/common/client";
import { Patenti } from "@/generated/bff-openapi";
import { useQuery } from "@tanstack/react-query";

const fetchLicences = async () => {
  const response = await client.getPuntiPatente();
  return response;
};

export const useLicences = <TData = Patenti>(
  select?: (data: Patenti) => TData,
) =>
  useQuery({
    queryFn: () => fetchLicences(),
    queryKey: ["licences"],
    select,
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
