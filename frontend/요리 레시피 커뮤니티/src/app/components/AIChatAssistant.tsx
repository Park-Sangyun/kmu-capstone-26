import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Sparkles } from 'lucide-react';
import { Recipe } from './RecipeCard';

interface AIChatAssistantProps {
  recipe: Recipe;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export function AIChatAssistant({ recipe, onClose }: AIChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `안녕하세요! ${recipe.title} 레시피를 함께 만들어보겠습니다. 재료 준비부터 조리 과정까지 궁금한 점이 있으면 언제든 물어보세요. 😊`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Mock AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, recipe);
      const aiMessage: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const generateAIResponse = (question: string, recipe: Recipe): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('재료') || lowerQuestion.includes('준비')) {
      return `${recipe.title}에 필요한 재료는 다음과 같습니다:\n${recipe.ingredients?.map((ing, i) => `${i + 1}. ${ing}`).join('\n') || '재료 정보가 없습니다.'}\n\n특정 재료가 없으시면 대체 가능한 재료를 추천해드릴 수 있어요!`;
    }
    
    if (lowerQuestion.includes('시간') || lowerQuestion.includes('얼마나')) {
      return `${recipe.title}의 조리 시간은 약 ${recipe.cookTime}이 소요됩니다. 준비 과정을 효율적으로 하면 시간을 줄일 수 있어요. 어떤 부분이 궁금하신가요?`;
    }
    
    if (lowerQuestion.includes('난이도') || lowerQuestion.includes('어려')) {
      return `이 레시피의 난이도는 "${recipe.difficulty}"입니다. 처음 만드시는 거라면 천천히 단계별로 따라오시면 됩니다. 어느 부분이 어려우실 것 같으신가요?`;
    }
    
    if (lowerQuestion.includes('대체') || lowerQuestion.includes('없으면')) {
      return '특정 재료가 없으시군요! 어떤 재료가 없으신지 말씀해주시면 대체 가능한 재료를 추천해드릴게요. 예를 들어 "양파 대신 뭘 쓸 수 있나요?" 처럼 물어봐주세요.';
    }
    
    if (lowerQuestion.includes('보관') || lowerQuestion.includes('저장')) {
      return '완성된 요리는 냉장 보관 시 2-3일 정도 보관 가능합니다. 밀폐 용기에 담아 보관하시고, 드실 때 전자레인지나 팬에 데워드시면 됩니다.';
    }
    
    if (lowerQuestion.includes('팁') || lowerQuestion.includes('비법')) {
      return `${recipe.title}을 더 맛있게 만드는 팁:\n- 재료는 신선한 것을 사용하세요\n- 양념은 조금씩 넣으면서 맛을 조절하세요\n- 불 조절이 중요해요. 너무 센 불은 타기 쉽습니다\n- 조리 중간중간 맛을 보면서 조절하세요`;
    }
    
    if (lowerQuestion.includes('단계') || lowerQuestion.includes('순서') || lowerQuestion.includes('방법')) {
      return `${recipe.title} 만드는 방법:\n${recipe.instructions?.map((step, i) => `${i + 1}. ${step}`).join('\n') || '조리 방법 정보가 없습니다.'}\n\n특정 단계가 어려우시면 자세히 설명해드릴게요!`;
    }
    
    return '좋은 질문이에요! 재료 대체, 조리 시간, 난이도, 조리 방법 등 레시피와 관련된 모든 것을 물어보세요. 최대한 자세히 도와드리겠습니다! 😊';
  };

  const quickQuestions = [
    '재료가 뭐가 필요한가요?',
    '조리 시간은 얼마나 걸리나요?',
    '조리 방법을 알려주세요',
    '꿀팁이 있나요?'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-full">
              <Sparkles className="size-6 text-purple-500" />
            </div>
            <div>
              <h2 className="font-bold text-lg">AI 요리 도우미</h2>
              <p className="text-sm opacity-90">{recipe.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex-shrink-0 size-10 rounded-full flex items-center justify-center ${
                  message.sender === 'ai'
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                    : 'bg-orange-500'
                }`}
              >
                {message.sender === 'ai' ? (
                  <Bot className="size-5 text-white" />
                ) : (
                  <User className="size-5 text-white" />
                )}
              </div>
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  message.sender === 'ai'
                    ? 'bg-white shadow-md'
                    : 'bg-orange-500 text-white'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.sender === 'ai' ? 'text-gray-400' : 'text-orange-100'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="p-4 border-t bg-white">
            <p className="text-sm text-gray-600 mb-2">자주 묻는 질문:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInputValue(q)}
                  className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t bg-white rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="레시피에 대해 궁금한 점을 물어보세요..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
