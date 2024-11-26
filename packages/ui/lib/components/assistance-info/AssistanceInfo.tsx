import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

import { Icon, IconType } from "../icon";

interface ContactItem {
  description?: string;
  href: string;
  value: string;
}

interface AssistanceItem {
  contacts: ContactItem[];
  icon: IconType;
  title: string;
}

export interface AssistanceInfoProps {
  items: AssistanceItem[];
}

export const AssistanceInfo = ({ items }: AssistanceInfoProps) => (
  <Stack my={3} spacing={2}>
    {items.map(({ contacts, icon, title }) => (
      <Card key={title} sx={{ bgcolor: "background.paper" }} variant="outlined">
        <CardHeader
          avatar={<Icon color="inherit" fontSize="medium" name={icon} />}
          sx={{ color: "text.secondary" }}
          title={
            <Typography color="inherit" fontSize={18} fontWeight={600}>
              {title}
            </Typography>
          }
        />
        <CardContent sx={{ p: 0 }}>
          {contacts.map(({ description, href, value }, index) => (
            <Fragment key={value}>
              <ListItem>
                <ListItemText
                  primary={
                    <Link fontSize={20} fontWeight={600} href={href}>
                      {value}
                    </Link>
                  }
                  secondary={
                    <Typography
                      color="text.secondary"
                      fontSize={14}
                      fontWeight={400}
                    >
                      {description}
                    </Typography>
                  }
                />
              </ListItem>
              {index < contacts.length - 1 ? <Divider sx={{ m: 2 }} /> : null}
            </Fragment>
          ))}
        </CardContent>
      </Card>
    ))}
  </Stack>
);
