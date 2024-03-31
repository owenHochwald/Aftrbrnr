import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import hero from '../../../public/images/hero.jpg'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react';
import { CardSelector } from './homepage-content-card';

const HomePage: React.FC = () => {
    return (
        <div className=''>
            <div className="relative mx-auto">
                <Image
                    src={hero}
                    alt="Aftrbrnr Hero Image"
                    className="h-screen w-full object-cover"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
                    <h1 className="text-9xl font-bold mb-6 text-black">
                        Aftrbrnr.
                    </h1>
                    <h2 className="text-3xl mb-8 font-semibold text-black">
                        Ignite your time tracking.
                    </h2>
                    <h2 className="text-3xl mb-8 font-semibold text-black italic">
                        Free. Forever.
                    </h2>
                    <Button variant="outline" className='inline-flex items-center text-black'>
                        <Link href="/signin" className='flex items-center text-lg'>
                            Get Started <span className="ml-2"><LinkIcon className='h-5 w-5' /></span>
                        </Link>
                    </Button>
                </div>
            </div>
            <div className='py-10 mt-7'>
                <CardSelector />
            </div>
            <div>
                <Card className="w-full bg-black py-10">
                    <CardHeader>
                        <CardTitle className='flex flex-col text-center text-5xl font-bold text-white'>
                            <h1>Time tracking for anyone.</h1> 
                            <h1>Anywhere.</h1>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='space-x-4'>
                        <div className="grid gap-6 grid-cols-3 justify-center">
                            <Card className='text-center'>
                                <CardHeader>
                                    <CardTitle className='text-5xl font-bold py-3'>Enterprise Teams</CardTitle>
                                </CardHeader>
                                <CardDescription className='flex flex-col text-lg pb-10 py-5'>
                                    <span>Frictionless time reporting for employees and customizable time insights for managers.</span>
                                    <Label className='text-medium italic text-base'>Make it easy</Label>
                                </CardDescription>
                                <Button className='inline-flex items-center justify-center'>
                                    <Link href="/signin" className='flex items-center'>
                                        Learn More
                                    </Link>
                                </Button>
                            </Card>
                            <Card className='text-center'>
                                <CardHeader>
                                    <CardTitle className='text-5xl font-bold py-3'>Consultants</CardTitle>
                                </CardHeader>
                                <CardDescription className='flex flex-col text-lg pb-10 py-5'>
                                    <span>Track your own time and boost your efficiency to make the most of your resources.</span>
                                    <Label className='text-medium italic text-base'>Make every minute count.</Label>
                                </CardDescription>
                                <Button className='inline-flex items-center justify-center'>
                                    <Link href="/signin" className='flex items-center'>
                                        Learn More
                                    </Link>
                                </Button>
                            </Card>
                            <Card className='text-center'>
                                <CardHeader>
                                    <CardTitle className='text-5xl font-bold py-3'>Personal Use</CardTitle>
                                </CardHeader>
                                <CardDescription className='flex flex-col text-lg pb-10 py-5'>
                                    <span>Make them most of your own time with self managed activities.</span>
                                    <Label className='text-medium italic text-base'>Stay focused.</Label>
                                </CardDescription>
                                <Button className='inline-flex items-center justify-center'>
                                    <Link href="/signin" className='flex items-center'>
                                        Learn More
                                    </Link>
                                </Button>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <footer className="bg-gray-100 py-10">
                <div className="container mx-auto">
                    <Card className="max-w-6xl">
                        <CardContent className="grid grid-cols-4 gap-8">
                            <div>
                                <CardTitle className="text-3xl font-bold">Product</CardTitle>
                                <ul>
                                    <li>Features</li>
                                    <li>Pricing</li>
                                    <li>Integrations</li>
                                    <li>Case Studies</li>
                                    <li>API</li>
                                    <li>Use Cases</li>
                                </ul>
                            </div>
                            <div>
                                <CardTitle className="text-3xl font-bold">Billing and Invoicing</CardTitle>
                                <ul>
                                    <li>Employee Time Tracking</li>
                                    <li>Project Budgeting</li>
                                    <li>Reporting</li>
                                    <li>Payroll</li>
                                    <li>Work Hours Tracker</li>
                                    <li>Timesheet App</li>
                                </ul>
                            </div>
                            <div>
                                <CardTitle className="text-3xl font-bold">Download</CardTitle>
                                <ul>
                                    <li>Mobile Apps</li>
                                    <li>Desktop Apps</li>
                                    <li>Browser Extensions</li>
                                </ul>
                            </div>
                            <div>
                                <CardTitle className="text-3xl font-bold">Help</CardTitle>
                                <ul>
                                    <li>Support & Knowledge Base</li>
                                    <li>Request A Demo</li>
                                    <li>Toggl Affiliate Program</li>
                                    <li>Contact Us</li>
                                </ul>
                            </div>
                            <div>
                                <CardTitle className="text-3xl font-bold">Resources</CardTitle>
                                <ul>
                                    <li>Work From Home Hub</li>
                                    <li>Timesheet Templates</li>
                                    <li>Time Card Calculator</li>
                                    <li>Media Kit</li>
                                    <li>Privacy Policy</li>
                                    <li>Terms of Service</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;