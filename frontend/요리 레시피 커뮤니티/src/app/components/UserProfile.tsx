import { ImageWithFallback } from './figma/ImageWithFallback';
import { Recipe } from './RecipeCard';
import { RecipeCard } from './RecipeCard';

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  recipes: Recipe[];
  onLike: (id: string) => void;
  onRecipeClick: (id: string, mode?: 'self' | 'ai' | 'shop') => void;
}

export function UserProfile({ user, recipes, onLike, onRecipeClick }: UserProfileProps) {
  const userRecipes = recipes.filter((recipe) => recipe.author.name === user.name);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex items-center gap-6 mb-6">
          <ImageWithFallback
            src={user.avatar}
            alt={user.name}
            className="size-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl mb-1">{user.name}</h1>
            <p className="text-gray-600 mb-3">{user.email}</p>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="font-semibold">{userRecipes.length}</span>
                <span className="text-gray-600 ml-1">레시피</span>
              </div>
              <div>
                <span className="font-semibold">
                  {userRecipes.reduce((sum, recipe) => sum + recipe.likes, 0)}
                </span>
                <span className="text-gray-600 ml-1">좋아요</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <p className="text-gray-700">
            요리를 사랑하는 사람입니다. 맛있는 레시피를 공유하며 함께 성장하고 있어요! 🍳✨
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl mb-4">내가 작성한 레시피</h2>
      </div>

      {userRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onLike={onLike}
              onClick={onRecipeClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-500 mb-4">아직 작성한 레시피가 없습니다</p>
          <p className="text-sm text-gray-400">첫 레시피를 작성해보세요!</p>
        </div>
      )}
    </div>
  );
}