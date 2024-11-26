import {
  Card,
  CardContent,
  Divider,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

import { Icon, IconType } from "../icon";

interface ContactItem {
  description?: string;
  href: string;
  icon: IconType;
  title: string;
  value: string;
}

interface AssistanceItem {
  contacts: ContactItem[];
}

export interface AssistanceInfoProps {
  items: AssistanceItem[];
}

export const AssistanceInfo = ({ items }: AssistanceInfoProps) => (
  <Stack my={3} spacing={2}>
    {items.map(({ contacts }, index) => (
      <Card
        key={`assistance-${index}`}
        sx={{ bgcolor: "background.paper" }}
        variant="outlined"
      >
        <CardContent sx={{ p: 0 }}>
          {contacts.map(({ description, href, icon, title, value }, index) => (
            <Fragment key={value}>
              <ListItem>
                <ListItemIcon>
                  <Icon color="inherit" fontSize="medium" name={icon} />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItem>
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
              {index < contacts.length - 1 ? <Divider sx={{ mx: 2 }} /> : null}
            </Fragment>
          ))}
        </CardContent>
      </Card>
    ))}
  </Stack>
);
