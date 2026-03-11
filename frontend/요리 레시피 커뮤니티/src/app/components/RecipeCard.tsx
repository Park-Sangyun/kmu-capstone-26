import { Heart, MessageCircle, BookmarkPlus, Clock, ChefHat, Sparkles, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { RecipeActionModal } from './RecipeActionModal';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  cookTime: string;
  difficulty: string;
  category?: string;
  fromAI?: boolean;
  likes: number;
  comments: number;
  liked?: boolean;
  servings?: string;
  ingredients?: string[];
  instructions?: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  onLike: (id: string) => void;
  onClick: (id: string, mode?: 'self' | 'ai' | 'shop') => void;
}

export function RecipeCard({ recipe, onLike, onClick }: RecipeCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleViewRecipe = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleSelectMode = (mode: 'self' | 'ai' | 'shop') => {
    setShowModal(false);
    onClick(recipe.id, mode);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative cursor-pointer" onClick={() => onClick(recipe.id)}>
          <ImageWithFallback
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover"
          />
          {recipe.category && (
            <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {recipe.category}
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <Clock className="size-4" />
            {recipe.cookTime}
          </div>
          {recipe.fromAI && (
            <div className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg">
              <Sparkles className="size-4" />
              AI 추천 레시피
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <ImageWithFallback
              src={recipe.author.avatar}
              alt={recipe.author.name}
              className="size-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm">{recipe.author.name}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <ChefHat className="size-3" />
                {recipe.difficulty}
              </p>
            </div>
          </div>

          <h3
            className="text-xl mb-2 cursor-pointer hover:text-orange-600 transition-colors"
            onClick={() => onClick(recipe.id)}
          >
            {recipe.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>

          <div className="flex items-center justify-end pt-4 border-t border-gray-100">
            <button
              onClick={handleViewRecipe}
              className="flex items-center gap-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
            >
              <span>레시피 보기</span>
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <RecipeActionModal
          recipeName={recipe.title}
          onClose={() => setShowModal(false)}
          onSelectMode={handleSelectMode}
        />
      )}
    </>
  );
}