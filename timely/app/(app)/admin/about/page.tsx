import Head from "next/head";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"



export default async function AboutPage() {
    return (
        <div className="min-h-screen p-8">
            <Head>
                <title>About Us</title>
                <meta name="description" content="A clean and informative About page" />
            </Head>
            <div className="max-w-2xl mx-auto">
                {/* Hero Section */}
                <h1 className="text-4xl font-bold mb-8">About Us</h1>
                {/* Mission and Values Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Mission */}
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-medium mb-2">Our Mission</h3>
                        <p>
                            Our mission is to empower individuals and teams with a clean and
                            efficient time tracking system, enabling them to make data-driven
                            decisions and achieve their goals.
                        </p>
                    </div>

                    {/* Values */}
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-medium mb-2">Our Values</h3>
                        <ul className="list-disc pl-4">
                            <li className="text-gray-700">Simplicity</li>
                            <li className="text-gray-700">Efficiency</li>
                            <li className="text-gray-700">Innovation</li>
                            <li className="text-gray-700">Collaboration</li>
                        </ul>
                    </div>
                </section>

                {/* Testimonials Section */}
                <h2 className="text-2xl font-semibold mb-4 pt-8">What our users say</h2>
                <div className="space-y-4">
                    {/* Testimonial 1 */}
                    <div className="p-4 border rounded-md shadow-md">
                        <p className="text-lg leading-relaxed font-light">
                            This time tracking system is a game-changer! It helps me stay
                            organized and accountable, leading to increased productivity.
                        </p>
                        <p className="text-sm font-medium mt-2">
                            - Sarah Lee, Marketing Manager
                        </p>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="p-4 border rounded-md shadow-md">
                        <p className="text-lg leading-relaxed font-light">
                            The user interface is intuitive and easy to navigate. I highly
                            recommend this platform for anyone looking to improve their time
                            management skills.
                        </p>
                        <p className="text-sm font-medium mt-2">
                            - Michael Jones, Project Manager
                        </p>
                    </div>
                </div>

                {/* Contact Information Section */}
                <h2 className="text-2xl font-semibold mb-4 pt-8">Contact Us</h2>
                <ul className="flex space-x-4">
                    <li className="text-gray-600 hover:text-blue-500">
                        <HoverCard>
                            <HoverCardTrigger>
                                <a href="mailto:support@example.com">support@example.com</a>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                Support for all your needs! Created and maintained by @aftrbrnr.
                            </HoverCardContent>
                        </HoverCard>

                    </li>
                    <li><span>-</span></li>
                    <li className="text-gray-600 hover:text-blue-500">
                        <HoverCard>
                            <HoverCardTrigger>
                                <a href="tel:+1234567890">+1 (234) 567-890</a>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                Support for all your needs! Created and maintained by @aftrbrnr.
                            </HoverCardContent>
                        </HoverCard>

                    </li>
                </ul>
            </div>
        </div>
    )
}