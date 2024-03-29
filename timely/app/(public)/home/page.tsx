import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">  {/* Tailwind classes for layout */}
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="mb-8 md:mb-0 mr-8 md:mr-0">
          <Image
            src="/path/to/your/hero-image.png" // Replace with your image path
            alt="App Hero Image"
            width={400}
            height={300}
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">
            Your App Name
          </h1>
          <h2 className="text-lg mb-8">
            A short description of your app and its benefits.
          </h2>
          <Button variant="outline">Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;