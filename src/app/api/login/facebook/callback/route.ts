import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { facebookAuth } from "@/auth";
import { createFacebookUserUseCase } from "@/use-cases/users";
import { getAccountByFacebookIdUseCase } from "@/use-cases/accounts";
import { afterLoginUrl } from "@/app-config";
import { setSession } from "@/lib/session";

export interface FacebookUser {
  id: string;
  name: string;
  email: string;
  picture?: {
    data: {
      url: string;
    };
  };
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const allCookies = await cookies();
  const storedState = allCookies.get("facebook_oauth_state")?.value ?? null;
  
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await facebookAuth.validateAuthorizationCode(code);
    const accessToken = tokens.accessToken();
    
    const facebookUserResponse = await fetch(
      "https://graph.facebook.com/me?fields=id,name,email,picture",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const facebookUser: FacebookUser = await facebookUserResponse.json();

    const existingAccount = await getAccountByFacebookIdUseCase(facebookUser.id);

    if (existingAccount) {
      await setSession(existingAccount.userId);
      return new Response(null, {
        status: 302,
        headers: {
          Location: afterLoginUrl,
        },
      });
    }

    const userId = await createFacebookUserUseCase(facebookUser);
    await setSession(userId);
    return new Response(null, {
      status: 302,
      headers: {
        Location: afterLoginUrl,
      },
    });
  } catch (e) {
    console.error(e);
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
