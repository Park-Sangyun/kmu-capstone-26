import { ArrowLeft, Heart, MessageCircle, Clock, ChefHat, Users, Sparkles, UtensilsCrossed } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Recipe } from './RecipeCard';
import { useState } from 'react';
import { AIChatAssistant } from './AIChatAssistant';

interface RecipeDetailProps {
  recipe: Recipe & {
    servings?: string;
    ingredients?: string[];
    instructions?: string[];
  };
  onBack: () => void;
  onLike: (id: string) => void;
  initialMode?: 'self' | 'ai' | 'shop';
}

export function RecipeDetail({ recipe, onBack, onLike, initialMode = 'none' }: RecipeDetailProps) {
  const [cookingMode, setCookingMode] = useState<'none' | 'self' | 'ai' | 'shop'>(initialMode);

  // Handle shop mode
  if (cookingMode === 'shop') {
    // Open shopping link in new tab
    const searchQuery = encodeURIComponent(recipe.title + ' 재료');
    window.open(`https://www.coupang.com/np/search?q=${searchQuery}`, '_blank');
    // Return to selection
    setCookingMode('none');
  }

  if (cookingMode === 'none') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-6 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="size-5" />
            <span>뒤로 가기</span>
          </button>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <ImageWithFallback
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-96 object-cover"
            />

            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl mb-2">{recipe.title}</h1>
                  <p className="text-gray-600">{recipe.description}</p>
                </div>
                <button
                  onClick={() => onLike(recipe.id)}
                  className={`p-3 rounded-full transition-colors ${
                    recipe.liked
                      ? 'bg-red-100 text-red-500'
                      : 'bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500'
                  }`}
                >
                  <Heart className={`size-6 ${recipe.liked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <ImageWithFallback
                  src={recipe.author.avatar}
                  alt={recipe.author.name}
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{recipe.author.name}</p>
                  <p className="text-sm text-gray-500">2024년 2월 5일</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-orange-500" />
                  <div>
                    <p className="text-xs text-gray-600">조리 시간</p>
                    <p className="font-medium">{recipe.cookTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="size-5 text-orange-500" />
                  <div>
                    <p className="text-xs text-gray-600">난이도</p>
                    <p className="font-medium">{recipe.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="size-5 text-orange-500" />
                  <div>
                    <p className="text-xs text-gray-600">인분</p>
                    <p className="font-medium">{recipe.servings || '2인분'}</p>
                  </div>
                </div>
              </div>

              {/* Cooking Mode Selection */}
              <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                <h3 className="text-xl mb-4 text-center">어떻게 요리하시겠어요?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setCookingMode('self')}
                    className="flex flex-col items-center gap-3 p-6 bg-white rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200 hover:border-orange-400"
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
                    onClick={() => setCookingMode('ai')}
                    className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-shadow"
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
                    onClick={() => setCookingMode('shop')}
                    className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <div className="p-4 bg-white bg-opacity-20 rounded-full">
                      <Sparkles className="size-8" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-lg mb-1">재료 사러 가기</p>
                      <p className="text-sm opacity-90">쿠팡에서 재료를 사러 가요</p>
                    </div>
                  </button>
                </div>
              </div>

              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl mb-4">재료</h2>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recipe.instructions && recipe.instructions.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl mb-4">조리 과정</h2>
                  <div className="space-y-6">
                    {recipe.instructions.map((instruction, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div className="flex-1 pt-2">
                          <p className="text-gray-700">{instruction}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-6 pt-6 border-t border-gray-200">
                <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                  <Heart className="size-5" />
                  <span>{recipe.likes}명이 좋아합니다</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                  <MessageCircle className="size-5" />
                  <span>댓글 {recipe.comments}개</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Self cooking mode
  if (cookingMode === 'self') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between px-4 py-6">
            <button
              onClick={() => setCookingMode('none')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="size-5" />
              <span>뒤로 가기</span>
            </button>
            <button
              onClick={() => setCookingMode('ai')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-shadow"
            >
              <Sparkles className="size-5" />
              <span>AI 도움받기</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <ImageWithFallback
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-8">
              <h1 className="text-3xl mb-4">{recipe.title}</h1>

              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-orange-500" />
                  <div>
                    <p className="text-xs text-gray-600">조리 시간</p>
                    <p className="font-medium">{recipe.cookTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="size-5 text-orange-500" />
                  <div>
                    <p className="text-xs text-gray-600">난이도</p>
                    <p className="font-medium">{recipe.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="size-5 text-orange-500" />
                  <div>
                    <p className="text-xs text-gray-600">인분</p>
                    <p className="font-medium">{recipe.servings || '2인분'}</p>
                  </div>
                </div>
              </div>

              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl mb-4">재료</h2>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <input type="checkbox" className="size-5 accent-orange-500" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recipe.instructions && recipe.instructions.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl mb-4">조리 과정</h2>
                  <div className="space-y-6">
                    {recipe.instructions.map((instruction, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 mb-2">{instruction}</p>
                          <label className="flex items-center gap-2 text-sm text-gray-500">
                            <input type="checkbox" className="size-4 accent-orange-500" />
                            <span>완료</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AI mode
  if (cookingMode === 'ai') {
    return (
      <>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setCookingMode('none')}
              className="flex items-center gap-2 px-4 py-6 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="size-5" />
              <span>뒤로 가기</span>
            </button>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 p-8">
              <div className="text-center py-12">
                <div className="inline-flex p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
                  <Sparkles className="size-12 text-purple-500" />
                </div>
                <h2 className="text-2xl mb-2">AI 요리 도우미 활성화</h2>
                <p className="text-gray-600 mb-6">
                  AI와 대화하며 {recipe.title}을(를) 만들어봐요!
                </p>
              </div>
            </div>
          </div>
        </div>
        <AIChatAssistant recipe={recipe} onClose={() => setCookingMode('self')} />
      </>
    );
  }

  return null;
}