import { Pressable, Text } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    disabled?: boolean;
    className?: string;
}

export default function Button({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    className = '',
}: ButtonProps) {
    const base = 'px-4 py-3 rounded-xl items-center justify-center';

    const variants: Record<ButtonVariant, string> = {
        primary: 'bg-blue-600',
        secondary: 'bg-gray-700 dark:bg-neutral-700',
        outline: 'border border-gray-400 dark:border-neutral-600',
    };

    const textVariants: Record<ButtonVariant, string> = {
        primary: 'text-white',
        secondary: 'text-white',
        outline: 'text-gray-800 dark:text-gray-100',
    };

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}>
            <Text className={`text-base font-medium ${textVariants[variant]}`}>{title}</Text>
        </Pressable>
    );
}