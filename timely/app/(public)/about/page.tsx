import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import aboutImage from '../../../public/images/use-case-page-content/cardImage.png';

export default function AboutPage() {
    return (
        <div className="mx-auto container py-4">
            <h1 className="text-2xl font-bold mb-4">About Us</h1>
            <p className="text-gray-600 mb-4">
                Our company is dedicated to providing high-quality time tracking software to teams worldwide. Here's a bit about us:
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <Image src={aboutImage} alt="Image 1" width={100} height={100} className="rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Experienced team</CardTitle>
                        <CardDescription>Our team has years of experience in developing time tracking software.</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Image src={aboutImage} alt="Image 2" width={100} height={100} className="rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>User-friendly interface</CardTitle>
                        <CardDescription>Our software is designed to be intuitive and easy to use.</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Image src={aboutImage} alt="Image 3" width={100} height={100} className="rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Seamless integration</CardTitle>
                        <CardDescription>Our software integrates with popular apps and services.</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Image src={aboutImage} alt="Image 4" width={100} height={100} className="rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Accurate reports</CardTitle>
                        <CardDescription>Our software provides accurate and detailed reports.</CardDescription>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}