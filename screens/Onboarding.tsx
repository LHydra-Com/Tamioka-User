import React, { useRef, useState } from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    NativeScrollEvent,
    NativeSyntheticEvent,
    useWindowDimensions,
} from 'react-native';
import Text from '../components/ui/Text';
import Button from '../components/ui/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
const slides = [
    {
        key: '01',
        title: 'Find Trusted Experts',
        subtitle: 'Finding the Most Experienced and\nTrusted People to Help You',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=60',
        cta: 'Next',
    },
    {
        key: '02',
        title: 'Schedule Your Way',
        subtitle: 'Schedule your service at\nyour perfect time',
        image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=900&q=60',
        cta: 'Next',
    },
    {
        key: '03',
        title: 'Stay Connected',
        subtitle: 'Chat or call your tasker to\nfine-tune every detail',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=60',
        cta: 'Get Started',
    },
];

export default function Onboarding({ onFinish }: { onFinish?: () => void }) {
    const scrollRef = useRef<ScrollView>(null);
    const [index, setIndex] = useState(0);
    const { width } = useWindowDimensions();

    const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const i = Math.round(e.nativeEvent.contentOffset.x / width);
        setIndex(i);
    };

    const goNext = () => {
        const next = Math.min(index + 1, slides.length - 1);
        scrollRef.current?.scrollTo({ x: next * width, animated: true });
        setIndex(next);
    };

    const onSkip = () => {
        onFinish?.();
    };

    return (
        <SafeAreaView className="flex-1 ">
            {/* Top bar */}
            <View className="px-6 pt-2">
                <View className="h-10 flex-row items-center justify-end">
                    <TouchableOpacity onPress={onSkip} accessibilityRole="button" accessibilityLabel="Skip onboarding">
                        <View className="flex-row items-center">
                            <Text size="sm" className="text-neutral-700">
                                Skip
                            </Text>
                            <Text size="sm" className="ml-1 text-neutral-700">
                                ›
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={onScrollEnd}
                className="flex-1"
            >
                {slides.map((s) => (
                    <View key={s.key} style={{ width }} className="px-6">
                        <View className="flex-1 items-center justify-center">
                            <Image
                                source={{ uri: s.image }}
                                style={{
                                    width: width * 0.78,
                                    height: width * 0.78,
                                    borderRadius: 18,
                                }}
                                resizeMode="cover"
                            />
                        </View>

                        {/* Slim progress */}
                        <View className="items-center">
                            <View className="mt-2 h-1 w-24 overflow-hidden rounded-full bg-neutral-200">
                                <View
                                    className="h-1 rounded-full bg-secondary"
                                    style={{ width: `${((index + 1) / slides.length) * 100}%` }}
                                />
                            </View>
                        </View>

                        {/* Copy */}
                        <View className="mt-6 items-center">
                            <Text variant="title" weight="bold" className="text-center text-neutral-900">
                                {s.title}
                            </Text>
                            <Text size="sm" className="mt-3 text-center text-neutral-600">
                                {s.subtitle}
                            </Text>
                        </View>

                        <View className="h-10" />
                    </View>
                ))}
            </ScrollView>

            <View className="px-6 pb-6">
                <Button
                    title={index === slides.length - 1 ? 'Get Started' : 'Next'}
                    onPress={index === slides.length - 1 ? (onFinish ?? (() => { })) : goNext}
                    variant="secondary"
                    className="rounded-2xl"
                />
            </View>
        </SafeAreaView>
    );
}
