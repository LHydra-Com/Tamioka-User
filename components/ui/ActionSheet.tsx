import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    Pressable,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';

interface ActionSheetProps {
    visible: boolean;
    onClose: () => void;
    options: { label: string; onPress?: () => void; destructive?: boolean }[];
    cancelText?: string;
}

export default function ActionSheet({
    visible,
    onClose,
    options,
    cancelText = 'Cancel',
}: ActionSheetProps) {
    const screenHeight = Dimensions.get('window').height;
    const translateY = useRef(new Animated.Value(screenHeight)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: screenHeight,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, screenHeight, translateY]);

    if (!visible) return null;

    return (
        <View className="absolute inset-0 z-50">
            {/* Background overlay */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View className="absolute inset-0 bg-black/50" />
            </TouchableWithoutFeedback>

            {/* Action Sheet container */}
            <Animated.View
                style={{ transform: [{ translateY }] }}
                className="absolute bottom-0 left-0 right-0 rounded-t-xl bg-white p-4 dark:bg-neutral-900">
                {options.map((opt, idx) => (
                    <Pressable
                        key={idx}
                        onPress={() => {
                            opt.onPress?.();
                            onClose();
                        }}
                        className={`mb-2 rounded-lg p-4 ${opt.destructive ? 'bg-red-100 dark:bg-red-900/40' : 'bg-gray-100 dark:bg-neutral-800'
                            }`}>
                        <Text
                            className={`text-center text-base ${opt.destructive ? 'text-red-700 dark:text-red-200' : 'text-black dark:text-white'
                                }`}>
                            {opt.label}
                        </Text>
                    </Pressable>
                ))}

                {/* Cancel button */}
                <Pressable
                    onPress={onClose}
                    className="mt-2 rounded-lg bg-gray-200 p-4 dark:bg-neutral-800">
                    <Text className="text-center font-bold text-black dark:text-white">{cancelText}</Text>
                </Pressable>
            </Animated.View>
        </View>
    );
}