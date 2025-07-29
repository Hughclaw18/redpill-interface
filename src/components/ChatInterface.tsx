import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Send, Paperclip, Settings, Maximize2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { FileUpload } from './FileUpload';
import { SpeechToText } from './SpeechToText';
import { TextEditor } from './TextEditor';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  files?: File[];
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to the Matrix Virtual Assistant. I am here to help you navigate the digital realm. How may I assist you today?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() && selectedFiles.length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
      files: selectedFiles.length > 0 ? [...selectedFiles] : undefined,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setSelectedFiles([]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I've processed your request. The data flows through the Matrix reveal interesting patterns...",
        "Analyzing your query through the neural pathways of the system. Stand by for results...",
        "The Matrix has provided the following insight based on your input...",
        "Your request has been processed through the digital realm. Here's what I found...",
        "The code streams show the following response to your query..."
      ];
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSpeechTranscript = (transcript: string) => {
    setInputText(prev => prev + ' ' + transcript);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col h-screen max-h-screen matrix-terminal">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border matrix-border">
        <div>
          <h1 className="text-xl font-bold font-mono matrix-glow text-primary">
            MATRIX VIRTUAL ASSISTANT
          </h1>
          <p className="text-xs text-muted-foreground font-mono">
            Neural Interface v2.0 - Status: ONLINE
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="matrix-border">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="matrix-border">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 gap-4 p-4 overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <ScrollArea 
            ref={scrollAreaRef}
            className="flex-1 p-4 matrix-terminal"
          >
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
                files={message.files}
              />
            ))}
            
            {isLoading && (
              <div className="flex justify-start mb-4">
                <Card className="p-3 matrix-terminal bg-card">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce matrix-glow"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce matrix-glow" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce matrix-glow" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </Card>
              </div>
            )}
          </ScrollArea>

          {/* File Upload Area */}
          {showFileUpload && (
            <div className="p-4 border-t border-border">
              <FileUpload
                onFilesSelect={setSelectedFiles}
                selectedFiles={selectedFiles}
                onRemoveFile={handleRemoveFile}
              />
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your query to the Matrix..."
                  className="font-mono matrix-border bg-input"
                  disabled={isLoading}
                />
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFileUpload(!showFileUpload)}
                  className="matrix-border"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <SpeechToText
                  onTranscript={handleSpeechTranscript}
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || (!inputText.trim() && selectedFiles.length === 0)}
                  className="matrix-border bg-primary hover:bg-primary/80"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Text Editor Panel */}
        <div className="w-1/3 flex flex-col">
          <Tabs defaultValue="editor" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2 matrix-border">
              <TabsTrigger value="editor" className="font-mono">Editor</TabsTrigger>
              <TabsTrigger value="output" className="font-mono">Output</TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="flex-1">
              <TextEditor
                content={editorContent}
                onChange={setEditorContent}
              />
            </TabsContent>
            
            <TabsContent value="output" className="flex-1">
              <TextEditor
                content={messages.filter(m => !m.isUser).slice(-1)[0]?.text || 'No AI response yet...'}
                readOnly={true}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};