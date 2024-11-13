import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";

export interface CardInfoProps {
  /** Generic bottom content _(will be displayed after `items`)_ */
  bottomContent?: ReactNode;
  /** Main card icon */
  icon?: ReactNode;
  /** Structured list of `CardInfoItem` */
  items?: CardInfoItem[];
  /** Main card title */
  title?: string;
  /** Generic top content _(will be displayed before `items`)_ */
  topContent?: ReactNode;
}

export interface CardInfoItemsProps {
  items: CardInfoItem[];
}

export interface CardInfoItem {
  /** footer text _(will be displayed on bottom)_ */
  footerText?: string;
  /** Item icon */
  icon?: ReactNode;
  /** Item label */
  label: ReactNode | string;
  /** Item value */
  value: ReactNode | string;
}

const DATA_TEST_ID_PREFIX = "io-ipatente-card-info";

/** Basic info card component */
export const CardInfo = ({
  bottomContent,
  icon,
  items,
  title,
  topContent,
}: CardInfoProps) => (
  <Card data-testid={DATA_TEST_ID_PREFIX} sx={{ width: "100%" }}>
    <CardContent sx={{ padding: 2 }}>
      <Stack
        alignItems="center"
        direction="row"
        fontSize={24} // useful for inherited icon fontSize
        justifyContent="flex-start"
        spacing={1}
      >
        {icon}
        <Typography
          data-testid={`${DATA_TEST_ID_PREFIX}-title`}
          fontSize={20}
          fontWeight={600}
        >
          {title}
        </Typography>
      </Stack>
      <Stack
        alignItems="flex-start"
        direction="column"
        justifyContent="flex-start"
        marginTop={1.5}
        spacing={1}
      >
        {topContent}
        {items && items.length > 0 && <CardInfo.Items items={items} />}
        {bottomContent}
      </Stack>
    </CardContent>
  </Card>
);

/** Card Info items internal component */
const Items = ({ items }: CardInfoItemsProps) => (
  <List
    data-testid={`${DATA_TEST_ID_PREFIX}-items`}
    sx={{ padding: 0, width: "100%" }}
  >
    {items.map((item, index, items) => (
      <React.Fragment key={`${DATA_TEST_ID_PREFIX}-item-${index}`}>
        <ListItem disablePadding>
          <ListItemText
            disableTypography
            primary={
              typeof item.label === "string" ? (
                <Typography
                  color="text.secondary"
                  data-testid={`${DATA_TEST_ID_PREFIX}-item-${index}-label`}
                  fontSize={18}
                  fontWeight={600}
                >
                  {item.label}
                </Typography>
              ) : (
                item.label
              )
            }
            secondary={
              typeof item.value === "string" ? (
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography
                    data-testid={`${DATA_TEST_ID_PREFIX}-item-${index}-value`}
                    fontSize={20}
                    fontWeight={600}
                  >
                    {item.value}
                  </Typography>
                  {item?.icon}
                </Stack>
              ) : (
                item.value
              )
            }
          />
        </ListItem>
        {item.footerText && (
          <Typography
            color="text.secondary"
            dangerouslySetInnerHTML={{
              __html: item.footerText,
            }}
            data-testid={`${DATA_TEST_ID_PREFIX}-item-${index}-footer-text`}
            marginTop={1.5}
            variant="caption"
          ></Typography>
        )}
        {index < items.length - 1 ? <Divider /> : null}
      </React.Fragment>
    ))}
  </List>
);

// namespaced component
CardInfo.Items = Items;
