import {
  getAccountByFacebookId,
  getAccountByGoogleId,
} from "@/data-access/accounts";

export async function getAccountByGoogleIdUseCase(googleId: string) {
  return await getAccountByGoogleId(googleId);
}

export async function getAccountByFacebookIdUseCase(facebookId: string) {
  return await getAccountByFacebookId(facebookId);
}
