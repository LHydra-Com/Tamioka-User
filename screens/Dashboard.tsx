import React, { useMemo, useState } from 'react';
import { ScrollView, TextInput, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Avatar from '../components/ui/Avatar';
import Text from '../components/ui/Text';
import { Toggle } from '../components/ui/Toggle';
import { useTheme } from '../lib/theme';
import { Bell, MapPin, Mic, Search, SlidersHorizontal, Star } from 'lucide-react-native';

type SegmentKey = 'best' | 'recent' | 'favorites';

const MUTED = '#A1A1AA'; // zinc-400
const SURFACE = '#27272A'; // zinc-800

type JobCard = {
    id: string;
    title: string;
    name: string;
    location: string;
    price: string;
    description: string;
    rating: number;
    reviews: number;
    timeAgo: string;
    bids: number;
};

export default function Dashboard() {
    const [segment, setSegment] = useState<SegmentKey>('recent');
    const { mode, toggleMode } = useTheme();

    const items = useMemo<JobCard[]>(
        () => [
            {
                id: '1',
                title: 'Cleaner',
                name: 'Jhon Doe',
                location: 'Dhaka',
                price: '$150',
                description: 'I am seeking a skilled and experienced Kitchen Plumbing Service Technician.',
                rating: 4.8,
                reviews: 43,
                timeAgo: '1 hour ago',
                bids: 5,
            },
            {
                id: '2',
                title: 'Care giver',
                name: 'Jane Doe',
                location: 'Dhaka',
                price: '$300',
                description: "I need a good person for household works, woman's between 25–35.",
                rating: 4.7,
                reviews: 43,
                timeAgo: '2 hour ago',
                bids: 2,
            },
        ],
        [],
    );

    return (
        <SafeAreaView edges={['top']} className={`flex-1 ${mode === 'dark' ? 'bg-neutral-950' : 'bg-tertiary'}`}>
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 16 }}>
                {/* Header */}
                <View className="px-6 pt-4">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <Avatar size={44} initials="Taimako" borderColor="border-transparent" borderWidth={0} />
                            <View className="ml-3">
                                <Text weight="medium" className="text-tertiary">
                                    Taimako
                                </Text>
                                <View className="mt-1 flex-row items-center">
                                    <MapPin size={14} />
                                    <Text size="sm" className="ml-1 text-zinc-400">
                                        Ghana
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="flex-row items-center">
                            <Toggle value={mode === 'dark'} onValueChange={() => toggleMode()} className="mr-3" />

                            <Pressable
                                accessibilityRole="button"
                                accessibilityLabel="Notifications"
                                className="h-11 w-11 items-center justify-center rounded-xl border border-zinc-800"
                            >
                                <Bell size={18} />
                            </Pressable>
                        </View>
                    </View>

                    {/* Search */}
                    <View className="mt-5 flex-row items-center">
                        <View className="flex-1 flex-row items-center rounded-xl px-4 border " >
                            <Search size={18} />
                            <TextInput
                                placeholder="Search"
                                className="ml-3 flex-1 py-4 text-base text-tertiary"
                            />
                            {/* <Mic size={18} color={MUTED} /> */}
                        </View>

                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Filters"
                            className="ml-4 h-14 w-14 items-center justify-center rounded-2xl border border-zinc-700"
                        >
                            <SlidersHorizontal size={18} />
                        </Pressable>
                    </View>

                    {/* Segmented */}
                    <View className="mt-6">
                        <View className="flex-row items-end justify-between">
                            <Pressable onPress={() => setSegment('best')} className="py-2">
                                <Text size="sm" className={segment === 'best' ? 'text-tertiary' : 'text-zinc-400'}>
                                    Best matches
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => setSegment('recent')} className="py-2">
                                <Text size="sm" className={segment === 'recent' ? 'text-secondary' : 'text-zinc-400'}>
                                    Most recent
                                </Text>
                            </Pressable>
                            <Pressable onPress={() => setSegment('favorites')} className="py-2">
                                <Text size="sm" className={segment === 'favorites' ? 'text-tertiary' : 'text-zinc-400'}>
                                    My favorites
                                </Text>
                            </Pressable>
                        </View>

                        <View className="mt-3 h-[1px] bg-zinc-700" />
                        <View className="mt-[-1px] h-[2px]" style={{ backgroundColor: 'transparent' }}>
                            <View
                                className="h-[2px] bg-secondary"
                                style={{
                                    width: '33.3333%',
                                    marginLeft: segment === 'best' ? '0%' : segment === 'recent' ? '33.3333%' : '66.6666%',
                                }}
                            />
                        </View>
                    </View>
                </View>

                {/* Cards */}
                <View className="mt-6 px-6">
                    {items.map((item) => (
                        <View key={item.id} className="mb-5 rounded-xl p-4 border " >
                            <View className="flex-row items-start justify-between">
                                <View className="flex-row items-center">
                                    <Avatar size={44} initials={item.title.slice(0, 1)} borderColor="border-transparent" borderWidth={0} />
                                    <View className="ml-3">
                                        <Text weight="medium" className="text-tertiary">
                                            {item.title}
                                        </Text>
                                        <View className="mt-1 flex-row items-center">
                                            <MapPin size={14} />
                                            <Text size="sm" className="ml-1 text-zinc-400">
                                                {item.location}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <Text weight="bold" className="text-tertiary">
                                    {item.price}
                                </Text>
                            </View>

                            <Text size="sm" className="mt-3 text-zinc-300">
                                {item.description}
                            </Text>

                            <View className="mt-3 flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            color={i < Math.round(item.rating) ? '#F59E0B' : '#52525B'}
                                            fill={i < Math.round(item.rating) ? '#F59E0B' : 'transparent'}
                                        />
                                    ))}
                                    <Text size="sm" className="ml-2 text-zinc-400">
                                        ({item.reviews})
                                    </Text>
                                </View>

                                <Pressable accessibilityRole="button" accessibilityLabel="Favorite">
                                    <Text className="text-zinc-400">♡</Text>
                                </Pressable>
                            </View>

                            <View className="mt-3 flex-row items-center justify-between">
                                <Text size="sm" className="text-zinc-400">
                                    {item.timeAgo}
                                </Text>
                                <Text size="sm" className="text-zinc-400">
                                    {item.bids} Bids
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
