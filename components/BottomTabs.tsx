import React from 'react';
import { View, Animated } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Text from './ui/Text';
import { Home, ClipboardList, User } from 'lucide-react-native';
import { useTheme } from '../lib/theme';

const Tab = createBottomTabNavigator();

function JobsScreen() {
    return (
        <View className="flex-1 items-center justify-center">
            <Text weight="medium">Jobs</Text>
        </View>
    );
}

function ProfileScreen() {
    return (
        <View className="flex-1 items-center justify-center">
            <Text weight="medium">Profile</Text>
        </View>
    );
}

function withAnimatedScreen<P>(Wrapped: React.ComponentType<P>) {
    return (props: P) => {
        const focused = useIsFocused();
        const anim = React.useRef(new Animated.Value(focused ? 1 : 0)).current;

        React.useEffect(() => {
            Animated.timing(anim, {
                toValue: focused ? 1 : 0,
                duration: 260,
                useNativeDriver: true,
            }).start();
        }, [focused, anim]);

        const translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] });
        const opacity = anim;

        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX }], opacity }}>
                <Wrapped {...(props as P)} />
            </Animated.View>
        );
    };
}

export default function BottomTabs() {
    const { mode } = useTheme();

    const barBackground = mode === 'dark' ? '#0f172a' : '#FFFFFF';
    const inactiveColor = mode === 'dark' ? '#94a3b8' : '#1f2937';

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    left: 24,
                    right: 24,
                    bottom: 20,
                    height: 42,
                    borderRadius: 999,
                    marginHorizontal: 18,
                    backgroundColor: barBackground,
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOpacity: 0.12,
                    shadowOffset: { width: 0, height: 8 },
                    shadowRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={withAnimatedScreen(Dashboard)}
                options={{
                    tabBarIcon: ({ focused }) => <AnimatedTabIcon Icon={Home} focused={focused} inactiveColor={inactiveColor} />,
                }}
            />

            <Tab.Screen
                name="Jobs"
                component={withAnimatedScreen(JobsScreen)}
                options={{
                    tabBarIcon: ({ focused }) => <AnimatedTabIcon Icon={ClipboardList} focused={focused} inactiveColor={inactiveColor} />,
                }}
            />

            <Tab.Screen
                name="Profile"
                component={withAnimatedScreen(ProfileScreen)}
                options={{
                    tabBarIcon: ({ focused }) => <AnimatedTabIcon Icon={User} focused={focused} inactiveColor={inactiveColor} />,
                }}
            />
        </Tab.Navigator>
    );
}

type IconProps = {
    Icon: React.ComponentType<{ size?: number; color?: string }>;
    focused: boolean;
    inactiveColor: string;
};

function AnimatedTabIcon({ Icon, focused, inactiveColor }: IconProps) {
    const anim = React.useRef(new Animated.Value(focused ? 1 : 0)).current;

    React.useEffect(() => {
        Animated.timing(anim, {
            toValue: focused ? 1 : 0,
            duration: 240,
            useNativeDriver: true,
        }).start();
    }, [focused, anim]);

    const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });
    const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] });
    const bubbleScale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] });

    return (
        <Animated.View style={{ width: 56, height: 56, alignItems: 'center', justifyContent: 'center', transform: [{ translateY }, { scale }] }}>
            <Animated.View style={{ transform: [{ scale: bubbleScale }] }}>
                {focused ? (
                    <View className="h-12 w-12 items-center justify-center rounded-full bg-secondary">
                        <Icon size={20} color="#FFFFFF" />
                    </View>
                ) : (
                    <Icon size={22} color={inactiveColor} />
                )}
            </Animated.View>
        </Animated.View>
    );
}
