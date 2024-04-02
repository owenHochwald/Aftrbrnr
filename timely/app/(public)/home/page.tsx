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
            <div className='pb-10'>
                <div className="px-10 bg-black pt-10 pb-20">
                    <div className='text-white text-center font-bold text-5xl pb-8'>
                        <h1>Time tracking for anyone.</h1>
                        <h1>Anywhere.</h1>
                    </div>
                    <div className='flex grid gap-6 grid-cols-3 space-x-4 justify-center items-center'>
                        <Card className='text-center'>
                            <CardHeader>
                                <CardTitle className='text-5xl font-bold py-3'>Enterprise Teams</CardTitle>
                            </CardHeader>
                            <CardDescription className='flex flex-col text-lg pb-10 py-5 mb-40'>
                                <span className='mb-10'>Frictionless time reporting for employees and customizable time insights for managers.</span>
                                <Label className='text-medium italic text-base'>Make it easy</Label>
                            </CardDescription>
                            <CardFooter className='flex items-center justify-center border-t p-4'>
                                <Button className='inline-flex items-center'>
                                    <Link href="/signin" className='flex items-center'>
                                        Learn More
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className='text-center'>
                            <CardHeader>
                                <CardTitle className='text-5xl font-bold py-3'>Consultants</CardTitle>
                            </CardHeader>
                            <CardDescription className='flex flex-col text-lg pb-10 py-5 mb-40 px-1'>
                                <span className='mb-10'>Track your own time and boost your efficiency to make the most of your resources.</span>
                                <Label className='text-medium italic text-base'>Make every minute count.</Label>
                            </CardDescription>
                            <CardFooter className='flex items-center justify-center border-t p-4'>
                                <Button className='inline-flex items-center justify-center'>
                                    <Link href="/signin" className='flex items-center'>
                                        Learn More
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className='text-center'>
                            <CardHeader>
                                <CardTitle className='text-5xl font-bold py-3'>Personal Use</CardTitle>
                            </CardHeader>
                            <CardDescription className='flex flex-col text-lg pb-8 py-5 mb-36'>
                                <span className='mb-16'>Make them most of your own time with self managed activities.</span>
                                <Label className='text-medium italic text-base'>Stay focused.</Label>
                            </CardDescription>
                            <CardFooter className='flex items-center justify-center border-t p-4'>
                                <Button className='inline-flex items-center justify-center'>
                                    <Link href="/signin" className='flex items-center'>
                                        Learn More
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
            <footer className="bg-gray-50 pt-10 w-full">
                <Card className="max-w-screen mx-auto pt-8 text-center justify-center">
                    <CardContent className="grid grid-cols-3 gap-5">
                        <div>
                            <CardTitle className="text-3xl font-bold">Product</CardTitle>
                            <ul className='mt-4'>
                                <li>
                                    <Link href="/features">Features</Link>
                                </li>
                                <li>
                                    <Link href="/faq">FAQ</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <CardTitle className="text-3xl font-bold">Company</CardTitle>
                            <ul className='mt-4'>
                                <li>
                                    <Link href="/about">About</Link>
                                </li>
                                <li>
                                    <Link href="/team">Our Team</Link>
                                </li>
                                <li>
                                    <Link href="/blog">Blog</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <CardTitle className="text-3xl font-bold">Support</CardTitle>
                            <ul className='mt-4'>
                                <li>
                                    <Link href="/contact">Contact Us</Link>
                                </li>
                                <li>
                                    <Link href="/help">Help Center</Link>
                                </li>
                                <li>
                                    <Link href="/terms">Terms of Service</Link>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </footer>
        </div>
    );
};


export default HomePage;