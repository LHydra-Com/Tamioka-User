import { View, Animated, useWindowDimensions } from 'react-native';
import { useRef, useEffect } from 'react';

interface Props {
    index: number;
    total: number;
}

export default function SlideIndicator({ index, total }: Props) {
    const { width } = useWindowDimensions();
    const anim = useRef(new Animated.Value(index)).current;

    useEffect(() => {
        Animated.spring(anim, {
            toValue: index,
            useNativeDriver: false,
        }).start();
    }, [index]);

    return (
        <View className="flex-row items-center">
            {Array.from({ length: total }).map((_, i) => {
                const w = anim.interpolate({
                    inputRange: [i - 1, i, i + 1],
                    outputRange: [8, 28, 8],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={i}
                        style={{ width: w }}
                        className="mx-1 h-2 rounded-full bg-secondary"
                    />
                );
            })}
        </View>
    );
}
