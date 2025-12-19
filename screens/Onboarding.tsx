import React, { useRef, useState } from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    NativeScrollEvent,
    NativeSyntheticEvent,
    KeyboardAvoidingView,
    Platform,
    useWindowDimensions,
} from 'react-native';
import Text from '../components/ui/Text';
import Button from '../components/ui/Button';
import SlideIndicator from 'components/SlideIndicator';
import { SafeAreaView } from 'react-native-safe-area-context';
const slides = [
    {
        key: 'welcome',
        title: 'Best Helping Hands for you',
        subtitle: 'With our on-demand services app, we give better services to you.',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60',
        cta: 'Get Started',
    },
    {
        key: '01',
        title: 'Choose a service',
        subtitle: 'Find the right service for your needs easily.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=60',
        cta: 'Next',
    },
    {
        key: '02',
        title: 'Get a quote',
        subtitle: 'Request price estimates from professionals.',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=60',
        cta: 'Next',
    },
    {
        key: '03',
        title: 'Work done',
        subtitle: 'Sit back while experts handle the work.',
        image: 'https://images.unsplash.com/photo-1529676468690-3a5a23f6a2c6?auto=format&fit=crop&w=800&q=60',
        cta: 'Finish',
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
        scrollRef.current?.scrollTo({
            x: (slides.length - 1) * width,
            animated: true,
        });
        setIndex(slides.length - 1);
    };

    return (
        <SafeAreaView className="flex-1 ">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={onScrollEnd}
                    className="flex-1"
                    contentContainerStyle={{ alignItems: 'center' }}
                >
                    {slides.map((s) => (
                        <View key={s.key} style={{ width }} className="px-6">
                            <View className="flex-1 items-center justify-center">
                                <View
                                    style={Platform.select({
                                        ios: {
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 8 },
                                            shadowOpacity: 0.12,
                                            shadowRadius: 16,
                                        },
                                        android: { elevation: 6 },
                                    })}
                                >
                                    <Image
                                        source={{ uri: s.image }}
                                        style={{
                                            width: width * 0.72,
                                            height: width * 0.72,
                                            borderRadius: 18,
                                        }}
                                    />
                                </View>
                            </View>

                            <View className="mb-8 items-center">
                                <Text variant="title" weight="bold" className="text-center">
                                    {s.title}
                                </Text>
                                <Text className="mt-3 text-center">{s.subtitle}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <View className="">
                    <View className="flex-row items-center justify-between px-4 pt-4">
                        <TouchableOpacity onPress={onSkip}>
                            <Text className="text-sm">Skip</Text>
                        </TouchableOpacity>

                        <SlideIndicator index={index} total={slides.length} />


                        <Button
                            title={index === slides.length - 1 ? 'Finish' : 'Next'}
                            onPress={index === slides.length - 1 ? (onFinish ?? (() => {})) : goNext}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
