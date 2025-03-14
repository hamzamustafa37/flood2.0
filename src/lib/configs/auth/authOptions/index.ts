/* eslint-disable require-await */
import { appRoute, msgResponse } from "@/utils";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          redirect_uri: process.env.REDIRECT_URI,
        },
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
    }: {
      token: any;
      user: any;
      account: any;
      profile: any;
    }) {
      if (user && !profile?.email_verified) {
        throw new Error(msgResponse.emailNotVerified);
      }
      return { token, user, account, profile };
    },
    async session(params: any): Promise<any> {
      return params;
    },
    redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return url.startsWith(baseUrl) ? url : `${baseUrl}${appRoute.default}`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
