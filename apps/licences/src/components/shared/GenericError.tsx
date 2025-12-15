import { getErrorInfo } from "@io-ipatente/core";
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

  const errorInfo = getErrorInfo(error);

  return (
    <OperationResult
      action={
        errorInfo.showRetry
          ? {
              endIcon: <Cached />,
              label: t("failure.generic.retry"),
              onClick: onRetry,
            }
          : undefined
      }
      description={t(errorInfo.descriptionKey, { defaultValue: "" })}
      illustration={<IllusError />}
      title={t(errorInfo.titleKey, { defaultValue: "" })}
    />
  );
};
