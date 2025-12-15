import { Text, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface AlertProps {
    message: string | ReactNode;
    type?: 'success' | 'error' | 'info';
    className?: string;
    onClose?: () => void;
    index?: number;
}

export default function Alert({
    message,
    type = 'info',
    className = '',
    onClose,
    index = 0,
}: AlertProps) {
    const translateY = useRef(new Animated.Value(-100)).current;
    const [visible, setVisible] = useState(true);

    const backgroundColors: Record<string, string> = {
        success: 'bg-green-100 dark:bg-green-900/40',
        error: 'bg-red-100 dark:bg-red-900/40',
        info: 'bg-blue-100 dark:bg-blue-900/40',
    };

    const textColors: Record<string, string> = {
        success: 'text-green-800 dark:text-green-200',
        error: 'text-red-800 dark:text-red-200',
        info: 'text-blue-800 dark:text-blue-200',
    };

    useEffect(() => {
        // Slide in from top with offset based on index
        Animated.timing(translateY, {
            toValue: index * 70 + 10, // stack with 70px spacing
            duration: 300,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            Animated.timing(translateY, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setVisible(false);
                onClose?.();
            });
        }, 3000);

        return () => clearTimeout(timer);
    }, [translateY, index, onClose]);

    if (!visible) return null;

    return (
        <SafeAreaView className="pointer-events-none absolute left-0 right-0 top-0 items-center">
            <Animated.View
                style={{ transform: [{ translateY }] }}
                className={`pointer-events-auto mt-4 w-4/5 flex-row items-center justify-between rounded-xl p-4 ${backgroundColors[type]} ${className}`}>
                <Text className={`flex-1 text-base ${textColors[type]}`}>{message}</Text>
                <Pressable
                    onPress={() => {
                        setVisible(false);
                        onClose?.();
                    }}
                    className="ml-4 rounded bg-gray-300 px-2 py-1 dark:bg-neutral-700">
                    <Text className="text-gray-700 dark:text-tertiary">×</Text>
                </Pressable>
            </Animated.View>
        </SafeAreaView>
    );
}