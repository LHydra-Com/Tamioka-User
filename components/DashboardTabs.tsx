import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import Text from './ui/Text';
import Dashboard from '../screens/Dashboard';
import { ClipboardList, Home, User } from 'lucide-react-native';
import { useTheme } from '../lib/theme';

type TabKey = 'home' | 'jobs' | 'profile';

const SECONDARY = '#1D4ED8'; // tailwindcss blue-700 (matches tailwind secondary)

function Placeholder({ title }: { title: string }) {
    return (
        <View className="flex-1 items-center justify-center ">
            <Text weight="medium" className="text-tertiary">
                {title}
            </Text>
        </View>
    );
}

import BottomTabs from './BottomTabs';

export default function DashboardTabs() {
    return <BottomTabs />;
}
