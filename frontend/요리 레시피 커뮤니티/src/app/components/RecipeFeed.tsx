import { RecipeCard, Recipe } from './RecipeCard';
import { Sparkles } from 'lucide-react';

interface RecipeFeedProps {
  recipes: Recipe[];
  onLike: (id: string) => void;
  onRecipeClick: (id: string, mode?: 'self' | 'ai' | 'shop') => void;
  onNavigateToAI?: () => void;
}

export function RecipeFeed({ recipes, onLike, onRecipeClick, onNavigateToAI }: RecipeFeedProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">최신 레시피</h2>
          <p className="text-gray-600">맛있는 요리를 함께 공유해요 ✨</p>
        </div>
        <button
          onClick={onNavigateToAI}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
        >
          <Sparkles className="size-5" />
          <span>AI 레시피 추천</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onLike={onLike}
            onClick={onRecipeClick}
          />
        ))}
      </div>
    </div>
  );
}