import { MatrixBackground } from '@/components/MatrixBackground';
import { ChatInterface } from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative dark">
      <MatrixBackground />
      <div className="scan-line" />
      <ChatInterface />
    </div>
  );
};

export default Index;
