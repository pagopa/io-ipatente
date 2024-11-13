import { LinearProgress, Stack, Typography } from "@mui/material";

export interface ProgressBarProps {
  description?: string;
  title?: string;
  total: number;
  value: number;
}
export const ProgressBar = ({
  description,
  title,
  total,
  value,
}: ProgressBarProps) => (
  <Stack rowGap="8px" width={"100%"}>
    {(title || description) && (
      <Stack direction="row" justifyContent={title ? "space-between" : "end"}>
        {title && (
          <Typography
            data-testid="progress-bar-title"
            fontSize={20}
            fontWeight={600}
          >
            {title}
          </Typography>
        )}
        {description && (
          <Typography
            data-testid="progress-bar-description"
            fontSize={20}
            fontWeight={600}
          >
            {description}
          </Typography>
        )}
      </Stack>
    )}
    <LinearProgress
      sx={{
        borderRadius: "16px",
        height: "8px",
      }}
      value={(value / total) * 100}
      variant="determinate"
    />
  </Stack>
);
