export const sanitizeRedirectPath = (origin: string, redirectPath: string) => {
  try {
    const decodedPath = decodeURIComponent(redirectPath);

    const currentUrl = new URL(origin);
    const redirectUrl = new URL(decodedPath, origin);

    return currentUrl.origin === redirectUrl.origin ? redirectUrl : null;
  } catch (e) {
    return null;
  }
};
