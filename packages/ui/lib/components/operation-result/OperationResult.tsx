import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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

export interface OperationResultAction {
  /** Element placed after button label */
  endIcon?: ReactNode;
  /** Action button label */
  label: string;
  /** Event triggered on action button click */
  onClick: () => void;
  /** Element placed before button label */
  startIcon?: ReactNode;
}

export const DATA_TEST_ID_OPERATION_RESULT_PREFIX =
  "io-ipatente-operation-result";

/** Operation result screen component */
export const OperationResult = ({
  action,
  description,
  illustration,
  title,
}: OperationResultProps) => (
  <Stack
    alignItems="center"
    direction="column"
    justifyContent="center"
    padding={3}
    textAlign="center"
  >
    <Stack
      alignItems="center"
      direction="column"
      justifyContent="center"
      spacing={4}
    >
      {illustration && <Box>{illustration}</Box>}
      <Stack
        alignItems="center"
        direction="column"
        justifyContent="center"
        spacing={1}
      >
        <Typography fontWeight={700} variant="h5">
          {title}
        </Typography>
        {description && <Typography variant="body2">{description}</Typography>}
      </Stack>
      {action && (
        <Button
          data-testid={`${DATA_TEST_ID_OPERATION_RESULT_PREFIX}-action`}
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
  </Stack>
);
