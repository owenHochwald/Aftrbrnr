import { Star, StarHalf } from 'lucide-react';
import React from 'react';

export default function ReviewsPage() {
    return (
        <div className="mx-auto container py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Add your review cards here */}
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </div>
        </div>
    );
}
function ReviewCard() {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">The Best Ever!</h2>
            <p className="text-gray-600 mb-2">Jon Doe</p>
            <p className="text-gray-600 mb-2">5/30/2024</p>
            <p className="text-gray-800 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel rutrum commodo, ligula nibh bibendum lectus, ac tincidunt nunc nibh vel nisl.</p>
            <RatingStars rating={4.5} />
        </div>
    );
}

function RatingStars({ rating }: { rating: number }) {
    const filledStars = Math.floor(rating);
    const halfStar = rating - filledStars >= 0.5;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(filledStars)].map((_, index) => (
                <Star key={index} className="h-5 w-5 text-yellow-500" />
            ))}
            {halfStar && <StarHalf className="h-5 w-5 text-yellow-500" />}
            {[...Array(emptyStars)].map((_, index) => (
                <Star key={index} className="h-5 w-5 text-gray-300" />
            ))}
            <p className="text-gray-600 ml-2">{rating}</p>
        </div>
    );
}
