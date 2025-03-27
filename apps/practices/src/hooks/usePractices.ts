import { client } from "@/common/client";
import { Pratica } from "@/generated/bff-openapi";
import { useQuery } from "@tanstack/react-query";

const fetchPractices = async (): Promise<Pratica[]> => {
  const response = await client.getPratiche();
  return response;
};

export const usePractices = <TData = Pratica[]>(
  select?: (data: Pratica[]) => TData,
) =>
  useQuery({
    queryFn: () => fetchPractices(),
    queryKey: ["practices"],
    select,
  });
