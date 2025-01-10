import { Check } from "@mui/icons-material";
import { Box, Button, ButtonProps, Stack, Typography } from "@mui/material";

export interface ConsentViewProps {
  /** Consent View main description */
  description: string;
  /** More information text */
  moreInfo: string;
  /** Props for primary action button */
  primaryActionProps: Pick<ButtonProps, "onClick" | "value">;
  /** Consent data section */
  requiredData: {
    /** List of user data for which consent is required */
    data: string[];
    /** Consent section title */
    title: string;
  };
  /** Props for secondary action button */
  secondaryActionProps: Pick<ButtonProps, "onClick" | "value">;
  /** Consent View main title */
  title: string;
}

/** Operation result screen component */
export const ConsentView = ({
  description,
  moreInfo,
  primaryActionProps,
  requiredData,
  secondaryActionProps,
  title,
}: ConsentViewProps) => (
  <Box display="flex" flex={1} flexDirection="column">
    {/* Scrollable content */}
    <Box flex={1} overflow="auto">
      <Stack paddingY={1} spacing={1}>
        <Typography fontWeight={700} variant="h4">
          {title}
        </Typography>
        <Typography
          dangerouslySetInnerHTML={{ __html: description }}
          variant="body2"
        />
        <Stack paddingBottom={2} paddingTop={3} spacing={1}>
          <Typography variant="overline">{requiredData.title}</Typography>
          {requiredData.data.map((value, index) => (
            <Stack
              alignItems="center"
              bgcolor="#FAFAFA"
              direction="row"
              justifyContent="space-between"
              key={`required-data-${index}`}
              padding={1.5}
            >
              <Typography fontWeight={600} variant="body2">
                {value}
              </Typography>
              <Check></Check>
            </Stack>
          ))}
        </Stack>
        <Typography
          color="text.secondary"
          dangerouslySetInnerHTML={{
            __html: moreInfo,
          }}
          fontSize="14px"
          fontWeight={400}
        />
      </Stack>
    </Box>
    {/* Sticky bottom actions */}
    <Box
      bgcolor="background.default"
      bottom={0}
      paddingTop={2}
      position="sticky"
      textAlign="center"
    >
      <Stack alignItems="stretch" bottom={0} direction="column" spacing={1}>
        <Button onClick={primaryActionProps.onClick} variant="contained">
          {primaryActionProps.value}
        </Button>
        <Button onClick={secondaryActionProps.onClick} variant="text">
          {secondaryActionProps.value}
        </Button>
      </Stack>
    </Box>
  </Box>
);
