import React, { createContext, useContext, useEffect, ReactNode, useState } from 'react';
import { Appearance } from 'react-native';

export type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
    mode: 'dark',
    setMode: () => { },
    toggleMode: () => { },
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setModeState] = useState<ThemeMode>(Appearance.getColorScheme() as ThemeMode || 'dark');

    useEffect(() => {
        // Default to dark
        Appearance.setColorScheme('dark');
        setModeState('dark');
    }, []);

    const setMode = (newMode: ThemeMode) => {
        setModeState(newMode);
        Appearance.setColorScheme(newMode);
    };

    const toggleMode = () => {
        const newMode = mode === 'dark' ? 'light' : 'dark';
        setMode(newMode);
    };

    return (
        <ThemeContext.Provider
            value={{
                mode,
                setMode,
                toggleMode,
            }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;