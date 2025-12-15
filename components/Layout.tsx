import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { ThemeProvider } from '../lib/theme';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ActionSheetProvider>
            <ThemeProvider>
                <SafeAreaView className="flex-1 bg-white dark:bg-neutral-950">
                    {children}
                    <StatusBar style="auto" />
                </SafeAreaView>
            </ThemeProvider>
        </ActionSheetProvider>
    );
};

export default Layout;