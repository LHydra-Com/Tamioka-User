import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { ThemeProvider } from '../lib/theme';

const ThemedRoot = ({ children }: { children: React.ReactNode }) => {
    // const { mode } = useTheme();
    // const themeClass = mode === 'dark' ? 'dark' : '';

    return (
        <SafeAreaView className={` flex-1 `}>
            {children}
            {/* <StatusBar style={mode === 'dark' ? 'light' : 'dark'} /> */}
            <StatusBar style="auto" />
        </SafeAreaView>
    );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ActionSheetProvider>
            <ThemeProvider>
                <ThemedRoot>{children}</ThemedRoot>
            </ThemeProvider>
        </ActionSheetProvider>
    );
};

export default Layout;