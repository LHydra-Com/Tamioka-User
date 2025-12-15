import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

interface AvatarProps {
    size?: number;
    imageUri?: string;
    initials?: string;
    borderColor?: string;
    borderWidth?: number;
    className?: string;
    onPress?: () => void;
}

const Avatar = ({
    size = 50,
    imageUri,
    initials = '',
    borderColor = 'border-gray-300 dark:border-gray-700',
    borderWidth = 2,
    className = '',
    onPress,
}: AvatarProps) => {
    const wrapperClass = `rounded-full overflow-hidden ${borderColor} ${className}`;
    const wrapperStyle = { width: size, height: size, borderWidth };

    const content = imageUri ? (
        <Image
            source={{ uri: imageUri }}
            style={{ width: size, height: size }}
            className="rounded-full"
        />
    ) : (
        <View
            style={{ width: size, height: size }}
            className="items-center justify-center rounded-full bg-gray-500">
            <Text style={{ fontSize: size / 2 }} className="font-bold text-tertiary">
                {initials}
            </Text>
        </View>
    );

    return onPress ? (
        <Pressable style={wrapperStyle} className={wrapperClass} onPress={onPress}>
            {content}
        </Pressable>
    ) : (
        <View style={wrapperStyle} className={wrapperClass}>
            {content}
        </View>
    );
};

export default Avatar;