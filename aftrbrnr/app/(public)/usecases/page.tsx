import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import cardImag from '../../../public/images/use-case-page-content/cardImage.png';


export default function UseCasesPage() {
    return (
        <div className="mx-auto container py-4">
            <h1 className="text-2xl font-bold mb-4">Use Cases</h1>
            <p className="text-gray-600 mb-4">
                Our time tracking software is loved by teams worldwide. Here are some reasons why:
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <Image src={cardImag} alt="Image 1" width={100} height={100} className="rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Intuitive and seamless time tracking for employees</CardTitle>
                        <CardDescription>No more time-consuming timesheet entry.</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Image src={cardImag} alt="Image 2" width={100} height={100} className="rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>No need for admin time</CardTitle>
                        <CardDescription>Filter, sort, and export your data with ease.</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Image src={cardImag} alt="Image 3" width={100} height={100} className="rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Seamless integration with 100+ apps</CardTitle>
                        <CardDescription>Via browser extensions and native calendar integrations.</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Image src={cardImag} alt="Image 4" width={100} height={100} className="rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Accurate time reports</CardTitle>
                        <CardDescription>You can export in seconds.</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Image src={cardImag} alt="Image 5" width={100} height={100} className="rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Automatic time off tracking</CardTitle>
                        <CardDescription>No more manually tracking vacation and sick days.</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Image src={cardImag} alt="Image 6" width={100} height={100} className="rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Easy project and task management</CardTitle>
                        <CardDescription>No more spreadsheets for tracking project progress.</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Image src={cardImag} alt="Image 7" width={100} height={100} className="rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Flexible work hours</CardTitle>
                        <CardDescription>No more worrying about missing out on important meetings.</CardDescription>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Image src={cardImag} alt="Image 8" width={100} height={100} className="rounded-full" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Team collaboration</CardTitle>
                        <CardDescription>No more emailing timesheets back and forth.</CardDescription>
                    </CardContent>
                </Card>
            </div>
            <p className="text-gray-600 mt-4">
                Experience the love from 70,000+ teams worldwide.
            </p>
        </div>
    );
}