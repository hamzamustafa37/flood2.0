'use client';
import Image from 'next/image';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

// Carousel items
const authContent = [
    {
        id: 1,
        title: 'Empower Your Voice',
        content:
            'Respond to unfair evaluations with confidence and clarity. Take control of your professional narrative.',
        img: '/images/mobile.svg',
    },
    {
        id: 2,
        title: 'Track Every Dispute',
        content:
            'Keep tabs on your progress. Our platform lets you easily monitor each step of your rebuttal journey.',
        img: '/images/mobile.svg',
    },
    {
        id: 3,
        title: 'Simplify Complex Processes',
        content:
            "Responding to reprimands shouldn't be overwhelming. We simplify the process for quicker, clearer responses utilizing your employers handbook and your recollections.",
        img: '/images/mobile.svg',
    },
    {
        id: 4,
        title: 'Customizable Templates',
        content:
            'Save time with expert-crafted templates that streamline your responses to negative performance reviews.',
        img: '/images/mobile.svg',
    },
    {
        id: 5,
        title: 'Strengthen Your Case',
        content:
            'Build compelling rebuttals with evidence and well-structured arguments, protecting your professional reputation.',
        img: '/images/mobile.svg',
    },
    {
        id: 6,
        title: 'Secure & Confidential',
        content:
            'Your privacy is our priority. Safeguard sensitive documents and communications with top-tier security measures.',
        img: '/images/mobile.svg',
    },
    {
        id: 7,
        title: 'Expert Guidance at Hand',
        content:
            'Access professional tips and strategies to enhance the effectiveness of your rebuttals.',
        img: '/images/mobile.svg',
    },
    {
        id: 8,
        title: 'Fighting for Fairness',
        content:
            'RebutIT stands with the working class, ensuring everyone has a fair chance to challenge unfair treatment.',
        img: '/images/mobile.svg',
    },
];

export const AuthSlider: React.FC = (): React.ReactElement => (
    <Carousel
        responsive={responsive}
        showDots={true}
        autoPlay={true}
        dotListClass="custom-dot-list-style"
    >
        {authContent.map(item => (
            <div
                key={item.id}
                className="flex flex-col items-center justify-center px-4 py-6"
            >
                <div className="bg-white rounded-xl border border-primaryLight py-16 px-10">
                    <Image
                        className="m-auto py-6"
                        width={345}
                        height={245}
                        src={item.img}
                        alt={item.title}
                    />
                </div>
                <h5 className="text-center text-lg font-medium mt-6 mb-3">
                    {item.title}
                </h5>
                <p className="text-center text-base text-primaryGray">
                    {item.content}
                </p>
            </div>
        ))}
    </Carousel>
);
