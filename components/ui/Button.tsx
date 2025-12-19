import { Pressable, Text } from 'react-native';
import { useTheme } from '../../lib/theme';

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
    const { mode } = useTheme();

    const base = 'px-4 py-3 rounded-xl items-center justify-center';

    const variants: Record<ButtonVariant, string> = {
        primary: `bg-primary ${mode === 'dark' ? 'dark:bg-neutral-800' : ''}`,
        secondary: 'bg-secondary',
        outline: `border border-secondary ${mode === 'dark' ? 'dark:border-neutral-600' : ''}`,
    };

    const textVariants: Record<ButtonVariant, string> = {
        primary: 'text-tertiary',
        secondary: 'text-tertiary',
        outline: 'text-secondary',
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