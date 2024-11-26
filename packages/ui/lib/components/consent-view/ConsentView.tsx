import { Check } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";

export interface ConsentViewProps {
  /** Labels for bottm action buttons */
  actionLabels: {
    /** Label for consent action */
    consent: string;
    /** Label for decline consent action */
    dissent: string;
  };
  /** Consent View main description */
  description: string;
  /** More information text */
  moreInfo: string;
  /** Event triggered when user click on consent action */
  onConsentClick: () => void;
  /** Event triggered when user click on dissent action */
  onDissentClick: () => void;
  /** Consent data section */
  requiredData: {
    /** List of user data for which consent is required */
    data: string[];
    /** Consent section title */
    title: string;
  };
  /** Consent View main title */
  title: string;
}

/** Operation result screen component */
export const ConsentView = ({
  actionLabels,
  description,
  moreInfo,
  onConsentClick,
  onDissentClick,
  requiredData,
  title,
}: ConsentViewProps) => (
  <Box display="flex" flex={1} flexDirection="column">
    {/* Scrollable content */}
    <Box flex={1} overflow="auto">
      <Stack paddingY={1} spacing={1}>
        <Typography fontWeight={700} variant="h5">
          {title}
        </Typography>
        <Typography variant="body2">
          <span
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </Typography>
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
        <Typography color="text.secondary" fontSize="14px" fontWeight={400}>
          <span
            dangerouslySetInnerHTML={{
              __html: moreInfo,
            }}
          />
        </Typography>
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
        <Button onClick={onConsentClick} variant="contained">
          {actionLabels.consent}
        </Button>
        <Button onClick={onDissentClick} variant="text">
          {actionLabels.dissent}
        </Button>
      </Stack>
    </Box>
  </Box>
);
