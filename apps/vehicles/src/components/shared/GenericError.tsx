import { OperationResult } from "@io-ipatente/ui";
import { Cached } from "@mui/icons-material";
import { IllusError } from "@pagopa/mui-italia";
import { AxiosError } from "axios";
import { useTranslation } from "next-i18next";

export interface GenericErrorProps {
  error: AxiosError | null;
  onRetry: () => void;
}

export const GenericError = ({ error, onRetry }: GenericErrorProps) => {
  const { t } = useTranslation();

  if (error && error.status !== 401 && error.status !== 403) {
    return (
      <OperationResult
        action={{
          endIcon: <Cached />,
          label: t("failure.generic.retry"),
          onClick: onRetry,
        }}
        description={t("failure.generic.description")}
        illustration={<IllusError />}
        title={t("failure.generic.title")}
      />
    );
  }

  return (
    <OperationResult
      illustration={<IllusError />}
      title={t("failure.expiredSession.title")}
    />
  );
};
