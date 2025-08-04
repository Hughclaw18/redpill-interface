import { useState } from 'react';
import { MatrixBackground } from '@/components/MatrixBackground';
import { ChatInterface } from '@/components/ChatInterface';
import { LoginPage } from '@/components/LoginPage';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background relative dark">
        <MatrixBackground />
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative dark">
      <MatrixBackground />
      
      <ChatInterface />
    </div>
  );
};

export default Index;
