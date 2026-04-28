export const appConfig: {
  mode: "maintenance" | "live";
} = {
  mode: "live",
};

export const protectedRoutes = ["/purchases", "/account", "/admin"];
export const applicationName = "KINDRA";
export const companyName = "KINDRA Inc";

export const MAX_UPLOAD_IMAGE_SIZE_IN_MB = 5;
export const MAX_UPLOAD_IMAGE_SIZE = 1024 * 1024 * MAX_UPLOAD_IMAGE_SIZE_IN_MB;

export const TOKEN_LENGTH = 32;
export const TOKEN_TTL = 1000 * 60 * 5; // 5 min
export const VERIFY_EMAIL_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days

export const MAX_GROUP_LIMIT = 1;
export const MAX_GROUP_PREMIUM_LIMIT = 10;

export const afterLoginUrl = "/account";
