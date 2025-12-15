import { View, Text } from 'react-native';

interface CardProps {
    title?: string;
    content?: string;
    children?: React.ReactNode;
    className?: string;
}

export default function Card({ title, content, children, className = '' }: CardProps) {
    return (
        <View className={`rounded-xl bg-tertiary p-4 shadow-md dark:bg-neutral-900 ${className}`}>
            {title && <Text className="mb-2 text-lg font-bold text-black dark:text-tertiary">{title}</Text>}
            {content && (
                <Text className="mb-2 text-base text-gray-700 dark:text-gray-200">{content}</Text>
            )}
            {children}
        </View>
    );
}