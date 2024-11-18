import { client } from "@/common/client";
import { Pagamento } from "@/generated/bff-openapi";
import { useQuery } from "@tanstack/react-query";

const fetchPayments = async (): Promise<Pagamento[]> => {
  const response = await client.getPagamenti();
  return response;
};

export const usePayments = <TData = Pagamento[]>(
  select?: (data: Pagamento[]) => TData,
) =>
  useQuery({
    queryFn: () => fetchPayments(),
    queryKey: ["payments"],
    select,
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
