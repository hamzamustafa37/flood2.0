import { Poppins } from 'next/font/google';

export const poppins = Poppins({
    weight: ['300', '400', '500', '700', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--poppins',
});
