// App.tsx
import React from 'react';
import { ScreenContent } from './components/ScreenContent';
import { Layout } from './components/Layout';
import './global.css'
export default function App() {
  return (
    <Layout>
      <ScreenContent title="Home" path="App.tsx" />
    </Layout>
  );
}