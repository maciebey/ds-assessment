import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
    className?: string;
}

const Card = ({ className, children }: PropsWithChildren<CardProps>) => {
    return (
        // TODO: review AI gen styles
        <div className={twMerge(
            "bg-white rounded-lg shadow-md p-6 mb-4",
            "border border-gray-200 dark:border-gray-700",
            "hover:shadow-lg transition-shadow duration-300",
            className
        )}>
            {children}
        </div>
    );
};

export default Card;
