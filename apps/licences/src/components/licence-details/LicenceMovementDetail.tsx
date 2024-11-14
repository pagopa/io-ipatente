import { MovPat } from "@/generated/bff-openapi";
import { CardInfoItem } from "@io-ipatente/ui";
import {
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import React from "react";

interface MetadataListItem {
  items: ({ isVisible: boolean } & CardInfoItem)[];
}

export interface LicenceSectionDetailsProps {
  data: MovPat;
}

export const LicenceMovementDetail = ({ data }: LicenceSectionDetailsProps) => {
  const { t } = useTranslation();

  const {
    codiceVerbale,
    dataEmissioneVerbale,
    descrizioneDenominazioneEnteAccertatore,
    descrizioneDenonimazioneEnteAccertatoreEmissione,
    punteggioNominativo,
  } = data;

  const metadataListItems: MetadataListItem = {
    items: [
      {
        isVisible: !!codiceVerbale,
        label: t("licenceDetails.history.detail.code"),
        value: codiceVerbale,
      },
      {
        isVisible: !!dataEmissioneVerbale,
        label: t("licenceDetails.history.detail.releaseDate"),
        value: new Date(dataEmissioneVerbale || "").toLocaleDateString(),
      },
      {
        isVisible: !!descrizioneDenominazioneEnteAccertatore,
        label: t("licenceDetails.history.detail.detectedBy"),
        value: descrizioneDenominazioneEnteAccertatore,
      },
      {
        isVisible: !!descrizioneDenonimazioneEnteAccertatoreEmissione,
        label: t("licenceDetails.history.detail.verifiedBy"),
        value: descrizioneDenonimazioneEnteAccertatoreEmissione,
      },
      {
        isVisible: !!punteggioNominativo,
        label: t("licenceDetails.history.detail.points"),
        value: (
          <Chip
            color={(punteggioNominativo || 0) < 0 ? "error" : "info"}
            label={punteggioNominativo || 0}
            sx={{ borderRadius: 1, justifySelf: "end", paddingInline: 1 }}
          />
        ),
      },
    ],
  };

  const filteredMetadataListItems = metadataListItems.items.filter(
    (item) => item.isVisible !== false,
  );

  return (
    <List sx={{ padding: 0, width: "100%" }}>
      {filteredMetadataListItems.map((item, index, items) => (
        <>
          <ListItem disablePadding>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  color="text.secondary"
                  fontSize={18}
                  fontWeight={600}
                >
                  {item.label}
                </Typography>
              }
              secondary={
                React.isValidElement(item.value) ? (
                  item.value
                ) : (
                  <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Typography fontSize={20} fontWeight={600}>
                      {item.value}
                    </Typography>
                    {item?.icon}
                  </Stack>
                )
              }
            />
          </ListItem>

          {index < items.length - 1 ? <Divider /> : null}
        </>
      ))}
    </List>
  );
};
