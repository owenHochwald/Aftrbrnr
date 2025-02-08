'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import reports from '../../../public/images/home-page-content/reports.png';
import Image from 'next/image';
import placeHolderImage from './public/placeHolderImage.png';


export const CardSelector: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState('button1');

    return (
        <Card>
            <CardHeader className='flex'>
                <CardTitle className='text-center text-center text-5xl font-bold py-6'>
                    Free, flexible time tracking tool for your business and personal needs
                </CardTitle>
                <CardDescription className='text-center text-lg space-x-6 py-4'>
                    <Button variant="outline" className='text-xl' onClick={() => setSelectedButton('button1')}>
                        Project tracking
                    </Button>
                    <Button variant="outline" className='text-xl' onClick={() => setSelectedButton('button2')}>
                        Time billing
                    </Button>
                    <Button variant="outline" className='text-xl' onClick={() => setSelectedButton('button3')}>
                        Time reporting
                    </Button>
                </CardDescription>
            </CardHeader>
            <CardContent className='flex justify-center align-center'>
                {selectedButton === 'button1' && (
                    <div className="flex">
                        <div className="w-1/2 p-4">
                            <Label className='text-md font-medium py-4'>ORGANIZED PROJECT TIME TRACKING</Label>
                            <h1 className='text-3xl font-bold py-4'>No more late deadlines or unprofitable projects.</h1>
                            <p>
                                Organize project tasks, track project hours, and compare
                                estimated vs. actual time and costs to deliver projects profitably.
                            </p>
                        </div>
                        <div className="w-1/2 p-4">
                            <Image
                                src={placeHolderImage}
                                alt="Aftrbrnr Organized Time Tracking"
                                className="h-screen w-full object-cover"
                                style={{
                                    width: 'auto',
                                    height: 'auto',
                                }}
                            />
                        </div>
                    </div>
                )}
                {selectedButton === 'button2' && (
                    <div className="flex">
                        <div className="w-1/2 p-4">
                            <Label className='text-md font-medium py-4'>ACCURATE TIME BILLING</Label>
                            <h1 className='text-3xl font-bold py-4'>We&apos;ll take care of the hours while you put in the work.</h1>
                            <p>
                                Set hourly rates, track billable time, create invoices,
                                and share them with your clients to get paid on time.
                            </p>
                        </div>
                        <div className="w-1/2 p-4">
                        <Image
                                src={placeHolderImage}
                                alt="Aftrbrnr Time Billing"
                                className="h-screen w-full object-cover"
                                style={{
                                    width: 'auto',
                                    height: 'auto',
                                }}
                            />
                        </div>
                    </div>
                )}
                {selectedButton === 'button3' && (
                    <div className="flex">
                        <div className="w-1/2 p-4">
                            <Label className='text-md font-medium py-4'>INSIGHTFUL TIME REPORTING</Label>
                            <h1 className='text-3xl font-bold py-4'>Know exactly how much time your team spends on tasks.</h1>
                            <p>
                                Say goodbye to inaccurate weekly timesheets and get
                                a handle on your team&apos;s exact billable and non-billable hours.
                            </p>
                        </div>
                        <div className="w-1/2 p-4">
                            <Image
                                src={reports}
                                alt="Aftrbrnr Time Reports"
                                className="h-screen w-full object-cover"
                                style={{
                                    width: 'auto',
                                    height: 'auto',
                                }}
                            />
                        </div>
                    </div>
                )}
                {/* Add similar conditional rendering for other buttons */}

                {/* Add similar buttons for other options */}
            </CardContent>
        </Card>
    );
};