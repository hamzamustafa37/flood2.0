/* eslint-disable require-await */
import NextAuth from 'next-auth';
import type { AuthOptions } from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';

// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID ?? '',
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
//             authorization: {
//                 params: {
//                     redirect_uri: process.env.REDIRECT_URI,
//                 },
//             },
//         }),
//     ],
//     callbacks: {
//         async jwt(token: any, user: any) {
//             if (user && !user?.email_verified) {
//                 throw new Error('Email not verified');
//             }
//             return token;
//         },
//         async session(session: any, token: any): Promise<any> {
//             session.user = token?.user;
//             return session;
//         },
//         redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
//             return url.startsWith(baseUrl) ? url : `${baseUrl}/login`;
//         },
//     },
// };
import authOptions from '../../../../lib/configs/auth/authOptions';
const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };
