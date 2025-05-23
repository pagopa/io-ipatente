import {
  CANCEL_CALLBACK_URL,
  getConfiguration,
  sanitizeRedirectPath,
} from "@io-ipatente/core";
import { ConsentView } from "@io-ipatente/ui";
import Box from "@mui/material/Box";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCallback, useEffect, useState } from "react";

const { APP_URL } = getConfiguration();

export default function Consent() {
  const { t } = useTranslation();
  const router = useRouter();

  const [redirectPath, setRedirectPath] = useState<string>();

  const onConfirm = useCallback(() => {
    document.cookie = "io-ipatente-consent=true; expires=0; path=/";
    const url =
      sanitizeRedirectPath(APP_URL, redirectPath ?? "/licences") ?? "/licences";

    console.log(
      `[consent] sanitizeRedirectPath: ${APP_URL}, ${redirectPath} => ${url}`,
    );

    router.replace(url);
  }, [redirectPath, router]);

  const onCancel = useCallback(() => {
    window.location.href = CANCEL_CALLBACK_URL;
  }, []);

  useEffect(() => {
    try {
      const cookieString = document.cookie;
      const match = cookieString.match(/(?:^|; )redirectPath=([^;]+)/);
      const value = match ? decodeURIComponent(match[1]) : undefined;
      console.log("[consent] redirectPath cookie value: " + value);
      setRedirectPath(value);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column" height="100vh" padding={3}>
      <ConsentView
        description={t("consent.description")}
        moreInfo={t("consent.moreInfo", {
          privacyUrl: getConfiguration().FIMS_PRIVACY_URL,
        })}
        primaryActionProps={{
          onClick: onConfirm,
          value: t("consent.primaryAction"),
        }}
        requiredData={{
          data: [t("consent.requiredData.fiscalCode")],
          title: t("consent.requiredData.title"),
        }}
        secondaryActionProps={{
          onClick: onCancel,
          value: t("consent.secondaryAction"),
        }}
        title={t("consent.title")}
      />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
