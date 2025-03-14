// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
    interface Session {
        token?: {
            token?: {
                account?: {
                    access_token?: string;
                };
                token?: {
                    name?: string;
                    email?: string;
                    picture?: string;
                    sub?: string;
                };
            };
        };
    }
}
