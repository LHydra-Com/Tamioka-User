import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/ui/Text';
import { useTheme } from '../lib/theme';
import { ArrowLeft, MessageSquare, FileText, BellRing } from 'lucide-react-native';

type NotificationItem = {
    id: string;
    title: string;
    body: string;
    icon: 'invite' | 'updates' | 'message' | 'job';
};

const SAMPLE: NotificationItem[] = [
    {
        id: '1',
        title: 'New Job Invitation: Plumbing Service',
        body: "You've been invited to submit a proposal for a Plumbing Service job. Click here to review the job details and submit your proposal.",
        icon: 'invite',
    },
    {
        id: '2',
        title: 'Proposal Updates',
        body: "Great news! A client has viewed your proposal for the 'Plumbing Service' job. Keep an eye on your messages for further updates.",
        icon: 'updates',
    },
    {
        id: '3',
        title: 'Messages and Feedback',
        body: "You have a new message from John Doe regarding the 'House Cleaning' project. Click here to read and respond.",
        icon: 'message',
    },
    {
        id: '4',
        title: 'Job Updates',
        body: "A new job matching your skills has been posted: 'Electrical Service'. Review the job details and consider applying.",
        icon: 'job',
    },
];

function IconFor({ type, color }: { type: NotificationItem['icon']; color: string }) {
    const size = 18;
    if (type === 'invite') return <BellRing size={size} color={color} />;
    if (type === 'updates') return <FileText size={size} color={color} />;
    return <MessageSquare size={size} color={color} />;
}

export default function Notifications() {
    const { mode } = useTheme();

    const bg = mode === 'dark' ? 'bg-neutral-950' : 'bg-tertiary';
    const surface = mode === 'dark' ? 'bg-neutral-900' : 'bg-tertiary';
    const cardBg = mode === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100';
    const textMutedColor = mode === 'dark' ? '#94A3B8' : '#6B7280'; // Renamed for clarity

    return (
        // <SafeAreaView edges={["top"]} style={{ flex: 1 }} className={bg}>
        //     <View className={`px-4 pt-4 flex-1 ${surface}`}>
        //         <View className="flex-row items-center">
        //             <Pressable className="rounded-lg p-2 mr-3 bg-neutral-200 dark:bg-neutral-800">
        //                 <ArrowLeft size={18} color={mode === 'dark' ? '#fff' : '#000'} />
        //             </Pressable>

        //             <Text weight="medium" size="md">
        //                 Notification
        //             </Text>
        //         </View>

        //         <ScrollView
        //             className="mt-4"
        //             contentContainerStyle={{ paddingBottom: 32 }}
        //             showsVerticalScrollIndicator={false}
        //         >
        //             {SAMPLE.map((n) => (
        //                 <View key={n.id} className="mb-4 px-3">
        //                     <View className={`rounded-xl p-4 ${cardBg}`}>
        //                         <View className="flex-row">
        //                             <View className="mr-3">
        //                                 <View className="h-10 w-10 rounded-full items-center justify-center bg-blue-600">
        //                                     <IconFor type={n.icon as any} color="#FFFFFF" />
        //                                 </View>
        //                             </View>

        //                             <View className="flex-1">
        //                                 <Text weight="medium" style={{ marginBottom: 8 }}>
        //                                     {n.title}
        //                                 </Text>
        //                                 {/* Pass the color to your custom prop, 
        //                                     but ensure Text.tsx destructures it! */}
        //                                 <Text size="sm" color={textMutedColor}>
        //                                     {n.body}
        //                                 </Text>
        //                             </View>
        //                         </View>
        //                     </View>
        //                 </View>
        //             ))}
        //         </ScrollView>
        //     </View>
        // </SafeAreaView>
        <View>
            <Text>Notifications Screen</Text>
        </View>
    );
}