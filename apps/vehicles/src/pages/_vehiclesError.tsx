import { useVehicles } from "@/hooks/useVehicles";
import { OperationResult } from "@io-ipatente/ui";
import { IllusError } from "@pagopa/mui-italia";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

const VehiclesError = () => {
  const { t } = useTranslation();

  const { refetch } = useVehicles();

  const [disableButton, setDisableButton] = useState<boolean>(false);

  const handleRetryFetch = useCallback(() => {
    setDisableButton(true);
    refetch();
    setTimeout(() => {
      setDisableButton(false);
    }, 5000);
  }, [refetch]);

  return (
    <OperationResult
      action={{
        disabled: disableButton,
        label: "Ricarica",
        onClick: handleRetryFetch,
      }}
      description={t("error.description")}
      illustration={<IllusError />}
      title={t("error.title")}
    />
  );
};

export default VehiclesError;
