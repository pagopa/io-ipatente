import { Pagamento } from "@/generated/bff-openapi";
import { BADGES_CONFIG_BY_CODE } from "@/utils/consts";
import { CardInfo, CardInfoItem, Icon } from "@io-ipatente/ui";
import { Chip } from "@mui/material";
import { useTranslation } from "next-i18next";

interface MetadataListItem {
  items: ({ isVisible: boolean } & CardInfoItem)[];
}

export interface PaymentSectionDetailsProps {
  data: Pagamento;
}

export const PaymentSectionDetails = ({ data }: PaymentSectionDetailsProps) => {
  const { t } = useTranslation();

  const {
    causale,
    codiceFiscalePagatore,
    cognomePagatore,
    dataInserimentoRichiesta,
    descrizioneTipoPratica,
    flagAbbinamento,
    flagCumulativo,
    flagEsenzione,
    flagUrgenza,
    idCarrello,
    idRichiesta,
    nomePagatore,
    numeroPratiche,
    statoPratica,
    tariffario,
  } = data;

  const metadataListItems: MetadataListItem = {
    items: [
      {
        isVisible: !!descrizioneTipoPratica,
        label: t("paymentDetails.info.description"),
        value: descrizioneTipoPratica,
      },
      {
        isVisible: !!statoPratica.descrizione,
        label: t("paymentDetails.info.status"),
        value: statoPratica.codice && (
          <Chip
            color={BADGES_CONFIG_BY_CODE[statoPratica.codice].color}
            icon={
              <Icon
                fontSize="small"
                name={BADGES_CONFIG_BY_CODE[statoPratica.codice].icon}
              />
            }
            key={statoPratica.descrizione}
            label={t(`paymentDetails.info.statoPratica.${statoPratica.codice}`)}
          />
        ),
      },
      {
        isVisible: !!idCarrello,
        label: t("paymentDetails.info.cartID"),
        value: `${idCarrello}`,
      },
      {
        isVisible: !!tariffario,
        label: t("paymentDetails.info.requestID"),
        value: `${tariffario}`,
      },
      {
        isVisible: !!idRichiesta,
        label: t("paymentDetails.info.tariff"),
        value: `${idRichiesta}`,
      },
      {
        isVisible: !!`${nomePagatore}${cognomePagatore}`,
        label: t("paymentDetails.info.payer"),
        value: `${nomePagatore} ${cognomePagatore}`,
      },
      {
        isVisible: !!codiceFiscalePagatore,
        label: t("paymentDetails.info.fiscalCode"),
        value: codiceFiscalePagatore,
      },
      {
        isVisible: !!causale,
        label: t("paymentDetails.info.cause"),
        value: causale,
      },
      {
        isVisible: !!dataInserimentoRichiesta,
        label: t("paymentDetails.info.requestDate"),
        value: dataInserimentoRichiesta,
      },
      {
        isVisible: !!numeroPratiche,
        label: t("paymentDetails.info.practicesNumber"),
        value: `${numeroPratiche}`,
      },
      {
        isVisible: flagCumulativo !== undefined,
        label: t("paymentDetails.info.cumulative"),
        value: flagCumulativo
          ? t("paymentDetails.info.yes")
          : t("paymentDetails.info.no"),
      },
      {
        isVisible: flagUrgenza !== undefined,
        label: t("paymentDetails.info.urgency"),
        value: flagUrgenza
          ? t("paymentDetails.info.yes")
          : t("paymentDetails.info.no"),
      },
      {
        isVisible: flagEsenzione !== undefined,
        label: t("paymentDetails.info.exemption"),
        value: flagEsenzione
          ? t("paymentDetails.info.yes")
          : t("paymentDetails.info.no"),
      },
      {
        isVisible: flagAbbinamento !== undefined,
        label: t("paymentDetails.info.combine"),
        value: flagAbbinamento
          ? t("paymentDetails.info.yes")
          : t("paymentDetails.info.no"),
      },
    ],
  };

  const filteredMetadataListItems = metadataListItems.items.filter(
    (item) => item.isVisible !== false,
  );

  return (
    <CardInfo
      icon={<Icon fontSize="medium" name="detail" />}
      items={filteredMetadataListItems}
      title={t("paymentDetails.info.title")}
    />
  );
};
