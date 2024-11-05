import { Revisione } from "@/generated/bff-openapi";
import { inspectionResultByCode } from "@/utils/strings";
import { CardCarousel, CardInfo, Icon } from "@io-ipatente/ui";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

export interface VehicleSectionInspectionsProps {
  inspections?: Revisione[];
}

export const VehicleSectionInspections = ({
  inspections = [],
}: VehicleSectionInspectionsProps) => {
  const { t } = useTranslation();

  if (inspections.length === 0) {
    return (
      <CardInfo
        icon={<Icon fontSize="medium" name="documentText" />}
        title={t("vehicleDetails.inspections.title")}
        topContent={
          <Typography
            color="text.secondary"
            paddingTop={2}
            textAlign="center"
            variant="body2"
          >
            {t("vehicleDetails.inspections.empty")}
          </Typography>
        }
      />
    );
  }

  return (
    <CardCarousel
      icon="documentText"
      title={t("vehicleDetails.inspections.title")}
    >
      {inspections.map(({ dataRevisione, esitoRevisione, kmTotali }, index) => (
        <CardCarousel.Item key={`slide-${dataRevisione}-${index}`}>
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
                {t("vehicleDetails.inspections.date")}
              </Typography>
              <Typography display="inline" fontWeight={600} variant="body2">
                {dataRevisione}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography
                display="inline"
                fontWeight={400}
                mr={1}
                variant="body2"
              >
                {t("vehicleDetails.inspections.result")}
              </Typography>
              <Chip
                color={inspectionResultByCode[esitoRevisione.codice].color}
                icon={
                  <Icon
                    fontSize="small"
                    name={inspectionResultByCode[esitoRevisione.codice].icon}
                  />
                }
                label={t(inspectionResultByCode[esitoRevisione.codice].label)}
                size="small"
              />
            </ListItem>
            {kmTotali && (
              <ListItem>
                <Typography
                  display="inline"
                  fontWeight={400}
                  mr={1}
                  variant="body2"
                >
                  {t("vehicleDetails.inspections.kilometersDetected")}
                </Typography>
                <Typography display="inline" fontWeight={600} variant="body2">
                  {kmTotali}
                </Typography>
              </ListItem>
            )}
          </List>
        </CardCarousel.Item>
      ))}
    </CardCarousel>
  );
};
