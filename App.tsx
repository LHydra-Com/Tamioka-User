// App.tsx
import React, { useState } from 'react';
import Onboarding from './screens/Onboarding';
import AuthFlow from './screens/AuthFlow';
import { Layout } from './components/Layout';
import DashboardTabs from './components/DashboardTabs';
import { NavigationContainer } from '@react-navigation/native';
import './global.css';

export default function App() {
  const [stage, setStage] = useState<'onboarding' | 'auth' | 'home'>('onboarding');

  return (
    <Layout>
      {stage === 'onboarding' && <Onboarding onFinish={() => setStage('auth')} />}
      {stage === 'auth' && <AuthFlow onComplete={() => setStage('home')} />}
      {stage === 'home' && (
        <NavigationContainer>
          <DashboardTabs />
        </NavigationContainer>
      )}
    </Layout>
  );
}