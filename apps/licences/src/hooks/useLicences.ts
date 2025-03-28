import { client } from "@/common/client";
import { Patenti } from "@/generated/bff-openapi";
import { useQuery } from "@tanstack/react-query";

const fetchLicences = async (): Promise<Patenti> => {
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
  });
