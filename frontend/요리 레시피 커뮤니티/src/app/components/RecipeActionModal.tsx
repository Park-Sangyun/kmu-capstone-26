import { UtensilsCrossed, Sparkles, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { AIChatModal } from './AIChatModal';

interface RecipeActionModalProps {
  recipeName: string;
  onClose: () => void;
  onSelectMode: (mode: 'self' | 'ai' | 'shop') => void;
}

export function RecipeActionModal({ recipeName, onClose, onSelectMode }: RecipeActionModalProps) {
  const [showAIChat, setShowAIChat] = useState(false);

  if (showAIChat) {
    return <AIChatModal recipeName={recipeName} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl">어떻게 요리하시겠어요?</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="size-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-6 text-center">
            <span className="font-medium text-orange-600">{recipeName}</span>을(를) 만들 방법을 선택해주세요
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => onSelectMode('self')}
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-orange-200 hover:border-orange-400 hover:scale-105"
            >
              <div className="p-4 bg-orange-100 rounded-full">
                <UtensilsCrossed className="size-8 text-orange-500" />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg mb-1">스스로 요리하기</p>
                <p className="text-sm text-gray-600">레시피를 보고 직접 만들어봐요</p>
              </div>
            </button>

            <button
              onClick={() => setShowAIChat(true)}
              className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="p-4 bg-white bg-opacity-20 rounded-full">
                <Sparkles className="size-8" />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg mb-1">AI가 도와주기</p>
                <p className="text-sm opacity-90">AI와 대화하며 단계별로 만들어봐요</p>
              </div>
            </button>

            <button
              onClick={() => {
                const searchQuery = encodeURIComponent(recipeName + ' 재료');
                window.open(`https://www.coupang.com/np/search?q=${searchQuery}`, '_blank');
                onClose();
              }}
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-green-200 hover:border-green-400 hover:scale-105"
            >
              <div className="p-4 bg-green-100 rounded-full">
                <ShoppingCart className="size-8 text-green-500" />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg mb-1">재료구매하러가기</p>
                <p className="text-sm text-gray-600">필요한 재료를 바로 주문해요</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}