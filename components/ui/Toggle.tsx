import React from 'react';
import { Pressable, Animated } from 'react-native';

interface ToggleProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    className?: string;
}

export function Toggle({ value, onValueChange, className = '' }: ToggleProps) {
    const translateX = React.useRef(new Animated.Value(value ? 20 : 0)).current;

    React.useEffect(() => {
        Animated.timing(translateX, {
            toValue: value ? 20 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [value, translateX]);

    return (
        <Pressable
            onPress={() => onValueChange(!value)}
            className={`h-6 w-12 rounded-full p-1 ${value ? 'bg-secondary' : 'bg-gray-300 dark:bg-neutral-700'
                } ${className}`}>
            <Animated.View
                style={{
                    transform: [{ translateX }],
                }}
                className="h-4 w-4 rounded-full bg-tertiary"
            />
        </Pressable>
    );
}