import { Pagamento } from "@/generated/bff-openapi";
import { CardCarousel, Icon } from "@io-ipatente/ui";
import { Chip } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

import { BADGES_BY_IUV_STATUS } from "./consts";

export interface PaymentSectionIUVListProps {
  iuvList?: Pagamento["listaIuv"];
}

const IUVListDetails = ({ iuvList = [] }: PaymentSectionIUVListProps) => {
  const { t } = useTranslation();

  return (
    <CardCarousel
      icon="documentText"
      title={t("paymentDetails.info.iuv.title")}
    >
      {iuvList.map(
        (
          {
            codiceIuv,
            contoCorrente,
            dataScadenzaIuv,
            importo,
            statoIuv,
            tipoIncasso,
          },
          index,
        ) => (
          <CardCarousel.Item key={`slide-${codiceIuv}-${index}`}>
            <List
              sx={{
                bgcolor: "background.paper",
                height: "100%",
                width: "100%",
              }}
            >
              <ListItem>
                <Typography
                  display="inline"
                  fontWeight={400}
                  mr={1}
                  variant="body2"
                >
                  {t("paymentDetails.info.iuv.code")}
                </Typography>
                <Typography display="inline" fontWeight={600} variant="body2">
                  {codiceIuv}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  display="inline"
                  fontWeight={400}
                  mr={1}
                  variant="body2"
                >
                  {t("paymentDetails.info.iuv.status")}
                </Typography>
                <Typography display="inline" fontWeight={600} variant="body2">
                  {statoIuv.codice && (
                    <Chip
                      color={BADGES_BY_IUV_STATUS[statoIuv.codice].color}
                      icon={
                        <Icon
                          fontSize="small"
                          name={BADGES_BY_IUV_STATUS[statoIuv.codice].icon}
                        />
                      }
                      label={t(
                        `paymentDetails.info.iuv.statuses.${statoIuv.codice}`,
                      )}
                      size="small"
                    />
                  )}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  display="inline"
                  fontWeight={400}
                  mr={1}
                  variant="body2"
                >
                  {t("paymentDetails.info.iuv.checkingAccount")}
                </Typography>
                <Typography display="inline" fontWeight={600} variant="body2">
                  {contoCorrente}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  display="inline"
                  fontWeight={400}
                  mr={1}
                  variant="body2"
                >
                  {t("paymentDetails.info.iuv.amount")}
                </Typography>
                <Typography display="inline" fontWeight={600} variant="body2">
                  {importo}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  display="inline"
                  fontWeight={400}
                  mr={1}
                  variant="body2"
                >
                  {t("paymentDetails.info.iuv.expiration")}
                </Typography>
                <Typography display="inline" fontWeight={600} variant="body2">
                  {dataScadenzaIuv}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography
                  display="inline"
                  fontWeight={400}
                  mr={1}
                  variant="body2"
                >
                  {t("paymentDetails.info.iuv.collectionType")}
                </Typography>
                <Typography display="inline" fontWeight={600} variant="body2">
                  {tipoIncasso}
                </Typography>
              </ListItem>
            </List>
          </CardCarousel.Item>
        ),
      )}
    </CardCarousel>
  );
};

export default IUVListDetails;
