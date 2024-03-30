import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import hero from '../../../public/images/hero.jpg'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react';

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
                    <h1 className="text-8xl font-bold mb-6 text-black">
                        Aftrbrnr
                    </h1>
                    <h2 className="text-3xl mb-8 font-semibold text-black">
                        Ignite your time tracking.
                    </h2>
                    <Button variant="outline" className='inline-flex items-center text-black'>
                        <Link href="/signin" className='flex items-center text-lg'>
                            Get Started <span className="ml-2"><LinkIcon className='h-5 w-5'/></span>
                        </Link>
                    </Button>
                </div>
            </div>
            <div className='py-5'>
                <div className="">
                    <div className="">
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Details</CardTitle>
                                <CardDescription>
                                    Lipsum dolor sit amet, consectetur adipiscing elit
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Name</Label>

                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="description">Description</Label>

                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default HomePage;