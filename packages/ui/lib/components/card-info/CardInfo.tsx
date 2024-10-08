import { Divider, List, ListItem, ListItemText, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
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
  /** Item label */
  label: string;
  /** Item value */
  value: ReactNode | string;
}

const DATA_TEST_ID_PREFIX = "io-ipatente-card-info";
const TEXT_SECONDARY_COLOR = "text.secondary";

/** Basic info card component */
export const CardInfo = ({
  bottomContent,
  icon,
  items,
  title,
  topContent,
}: CardInfoProps) => (
  <Card
    data-testid={DATA_TEST_ID_PREFIX}
    sx={{ backgroundColor: "background.default", width: "100%" }}
  >
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
        <CardInfo.Items items={items ?? []} />
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
              <Typography
                color={TEXT_SECONDARY_COLOR}
                data-testid={`${DATA_TEST_ID_PREFIX}-item-${index}-label`}
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
                <Typography
                  data-testid={`${DATA_TEST_ID_PREFIX}-item-${index}-value`}
                  fontSize={20}
                  fontWeight={600}
                >
                  {item.value}
                </Typography>
              )
            }
          />
        </ListItem>
        {item.footerText && (
          <Typography
            color={TEXT_SECONDARY_COLOR}
            dangerouslySetInnerHTML={{
              __html: item.footerText,
            }}
            data-testid={`${DATA_TEST_ID_PREFIX}-item-${index}-footer-text`}
            fontSize={12}
            fontWeight={600}
            marginTop={1.5}
          ></Typography>
        )}
        {index < items.length - 1 ? <Divider sx={{ marginY: 1.5 }} /> : null}
      </React.Fragment>
    ))}
  </List>
);

// namespaced component
CardInfo.Items = Items;
