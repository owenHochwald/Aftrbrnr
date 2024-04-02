import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function FAQPage() {
    return (
        <div className="mx-auto container py-4">
        <h1 className="text-3xl font-bold text-center mb-8">FAQ Page</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="max-w-md mx-auto">
            <CardContent>
              <CardTitle className="text-2xl font-bold mb-4">General</CardTitle>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-blue-500">
                    How do I sign up?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-500">
                    How do I log in?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-500">
                    What is your refund policy?
                  </Link>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                View All
              </Button>
            </CardFooter>
          </Card>
          <Card className="max-w-md mx-auto">
            <CardContent>
              <CardTitle className="text-2xl font-bold mb-4">Support</CardTitle>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-blue-500">
                    How can I contact support?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-500">
                    What are your support hours?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-500">
                    What types of issues can I get support for?
                  </Link>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                View All
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
}