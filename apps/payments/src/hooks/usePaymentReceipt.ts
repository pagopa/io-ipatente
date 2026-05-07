import { useQuery } from "@tanstack/react-query";

import { client } from "@/common/client";
import { EsitoStampaTelematica } from "@/generated/bff-openapi";

const fetchPaymentReceipt = async (
  idRichiestaPagamento: string,
): Promise<EsitoStampaTelematica> => {
  const response = await client.stampaRicevutaTelematica({
    params: {
      idRichiestaPagamento,
    },
  });
  return response;
};

export const usePaymentReceipt = (idRichiestaPagamento: string) =>
  useQuery({
    enabled: false,
    queryFn: () => fetchPaymentReceipt(idRichiestaPagamento),
    queryKey: ["payments", idRichiestaPagamento],
  });
