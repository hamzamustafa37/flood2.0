import React from 'react';
import Link from 'next/link';
import { redirectUrl } from '@/utils/helpers/redirectUrl';

export const CustomerSupport: React.FC = () => (
    <p className="text-center text-gray mt-5">
        Facing issues? We are here to assist you. {''}
        <Link
            href={redirectUrl.signUp}
            className="text-primary hover:text-secondary underline font-medium"
        >
            Customer Support
        </Link>
    </p>
);
