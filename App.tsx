// App.tsx
import React from 'react';
import { ScreenContent } from './components/ScreenContent';
import { Layout } from './components/Layout';
import './global.css';
import { useTheme, ThemeProvider } from './lib/theme';

function AppContent() {
  const { mode } = useTheme();
  return (
    <div className={mode === 'dark' ? 'dark' : ''} style={{ minHeight: '100vh' }}>
      <Layout>
        <ScreenContent title="Home" path="App.tsx" />
      </Layout>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}