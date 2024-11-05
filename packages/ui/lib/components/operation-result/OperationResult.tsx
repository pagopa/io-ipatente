import { Box, Button, ButtonProps, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export interface OperationResultProps {
  /** Action button */
  action?: OperationResultAction;
  /** Operation description */
  description?: string;
  /** Used to display an image above the title */
  illustration?: ReactNode;
  /** Operation result main title */
  title: string;
}

type OperationResultAction = {
  label: string;
} & Pick<ButtonProps, "endIcon" | "onClick" | "startIcon">;

/** Operation result screen component */
export const OperationResult = ({
  action,
  description,
  illustration,
  title,
}: OperationResultProps) => (
  <Stack
    alignItems="center"
    justifyContent="center"
    padding={3}
    spacing={4}
    textAlign="center"
  >
    {illustration && <Box>{illustration}</Box>}
    <Stack alignItems="center" justifyContent="center" spacing={1}>
      <Typography fontWeight={700} variant="h5">
        {title}
      </Typography>
      {description && <Typography variant="body2">{description}</Typography>}
    </Stack>
    {action && (
      <Button
        endIcon={action.endIcon}
        onClick={action.onClick}
        size="small"
        startIcon={action.startIcon}
        variant="contained"
      >
        {action.label}
      </Button>
    )}
  </Stack>
);
