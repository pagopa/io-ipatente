import { AxiosError } from "axios";

export enum ErrorSource {
  BFF = "BFF",
  DG_MOT = "DG_MOT",
  PDND = "PDND",
}

export interface ErrorInfo {
  descriptionKey: string;
  showRetry: boolean;
  titleKey: string;
}

export const getErrorInfo = (error: AxiosError | null): ErrorInfo => {
  // Generic error
  if (!error) {
    return {
      descriptionKey: "failure.generic.description",
      showRetry: true,
      titleKey: "failure.generic.title",
    };
  }

  const status = error.response?.status ?? error.status;
  const code = error.code;
  const source = (error.response?.data as { source?: ErrorSource })?.source;

  // Authentication errors (401 Unauthorized, 403 Forbidden)
  if (status === 401 || status === 403) {
    return {
      descriptionKey: "failure.expiredSession.description",
      showRetry: false,
      titleKey: "failure.expiredSession.title",
    };
  }

  // No internet connection or network failure
  if (
    !status &&
    (code === "ERR_NETWORK" ||
      code === "ERR_INTERNET_DISCONNECTED" ||
      code === "ENETUNREACH" ||
      code === "ENOTFOUND")
  ) {
    return {
      descriptionKey: "failure.networkError.description",
      showRetry: true,
      titleKey: "failure.networkError.title",
    };
  }

  // Timeout errors
  if (code === "ECONNABORTED" || code === "ETIMEDOUT") {
    return {
      descriptionKey: "failure.timeout.description",
      showRetry: true,
      titleKey: "failure.timeout.title",
    };
  }

  if (source === "DG_MOT") {
    return {
      descriptionKey: "failure.dg_mot.description",
      showRetry: false,
      titleKey: "failure.dg_mot.title",
    };
  } else if (source === "PDND") {
    return {
      descriptionKey: "failure.pdnd.description",
      showRetry: false,
      titleKey: "failure.pdnd.title",
    };
  } else if (source === "BFF") {
    return {
      descriptionKey: "failure.bff.description",
      showRetry: false,
      titleKey: "failure.bff.title",
    };
  }

  // Generic fallback for unknown errors
  return {
    descriptionKey: "failure.generic.description",
    showRetry: true,
    titleKey: "failure.generic.title",
  };
};
