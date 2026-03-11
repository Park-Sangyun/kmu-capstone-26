import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { NavBar } from './components/NavBar';
import { RecipeFeed } from './components/RecipeFeed';
import { RecipeDetail } from './components/RecipeDetail';
import { RecipeForm } from './components/RecipeForm';
import { UserProfile } from './components/UserProfile';
import { AIRecommendation } from './components/AIRecommendation';
import { Recipe } from './components/RecipeCard';
// 회원가입 페이지 추가
import { SignupPage } from './components/SignupPage';

export default function App() {
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  // 로그인,회원가입 상태 추가
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  const [currentPage, setCurrentPage] = useState<string>('feed');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [selectedRecipeMode, setSelectedRecipeMode] = useState<'self' | 'ai' | 'shop' | undefined>(undefined);

  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: '1',
      title: '비빔밥',
      description: '신선한 채소와 고소한 참기름이 어우러진 건강한 한식 요리입니다.',
      image: 'https://images.unsplash.com/photo-1741295017668-c8132acd6fc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBiaWJpbWJhcCUyMGJvd2x8ZW58MXx8fHwxNzcwMjU2NjMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      author: { name: '김요리', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
      cookTime: '30분',
      difficulty: '쉬움',
      category: '한식',
      fromAI: true,
      likes: 124,
      comments: 18,
      servings: '2인분',
      ingredients: ['밥 2공기', '시금치 100g', '당근 1/2개', '애호박 1/2개', '고사리 50g', '소고기 100g', '계란 2개', '참기름 2큰술', '고추장 2큰술'],
      instructions: ['각 채소를 끓는 물에 데쳐서 물기를 제거합니다', '소고기는 양념하여 볶아줍니다', '계란은 지단을 만들어 채썰어줍니다', '그릇에 밥을 담고 준비한 재료들을 예쁘게 올립니다', '참기름과 고추장을 곁들여 내면 완성!']
    },
    {
      id: '2',
      title: '김치찌개',
      description: '얼큰하고 시원한 김치찌개, 집밥의 정석입니다.',
      image: 'https://images.unsplash.com/photo-1760228865341-675704c22a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraW1jaGklMjBzdGV3JTIwamppZ2FlfGVufDF8fHx8MTc3MDM0MzU5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      author: { name: '이주방', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
      cookTime: '40분',
      difficulty: '쉬움',
      category: '한식',
      likes: 89,
      comments: 12,
      servings: '3인분',
      ingredients: ['신김치 1/4포기', '돼지고기 300g', '두부 1모', '대파 1대', '양파 1/2개', '고춧가루 1큰술', '된장 1큰술', '다진 마늘 1큰술'],
      instructions: ['김치를 적당한 크기로 썰어줍니다', '냄비에 돼지고기를 볶다가 김치를 넣고 함께 볶습니다', '물을 붓고 된장, 고춧가루, 마늘을 넣습니다', '끓어오르면 두부와 양파, 대파를 넣습니다', '10분 정도 더 끓이면 완성!']
    },
    {
      id: '3',
      title: '까르보나라',
      description: '크리미한 소스가 일품인 이탈리아 파스타입니다.',
      image: 'https://images.unsplash.com/photo-1651949404339-9af9095d66dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYSUyMHBsYXRlfGVufDF8fHx8MTc3MDM0MzU5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      author: { name: '박셰프', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
      cookTime: '25분',
      difficulty: '보통',
      category: '양식',
      likes: 156,
      comments: 24,
      servings: '2인분',
      ingredients: ['스파게티 면 200g', '베이컨 100g', '달걀 노른자 3개', '파마산 치즈 50g', '후추', '소금', '마늘 2쪽'],
      instructions: ['파스타 면을 끓는 물에 삶아줍니다', '베이컨과 마늘을 팬에 볶습니다', '볼 달걀 노른자, 치즈, 후추를 섞어 소스를 만듭니다', '삶은 면을 베이컨 팬에 넣고 불을 끕니다', '소스를 부어 빠르게 섞으면 완성!']
    },
    {
      id: '4',
      title: '초콜릿 케이크',
      description: '진하고 촉촉한 초콜릿 케이크로 특별한 날을 더욱 달콤하게!',
      image: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3NzAzMzc0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      author: { name: '최디저트', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop' },
      cookTime: '60분',
      difficulty: '어려움',
      category: '디저트',
      fromAI: true,
      likes: 203,
      comments: 31,
      servings: '8인분',
      ingredients: ['박력분 200g', '코코아 파우더 50g', '설탕 180g', '달걀 3개', '버터 150g', '우유 100ml', '베이킹파우더 1작은술', '다크 초콜릿 100g'],
      instructions: ['버터와 초콜릿을 중탕으로 녹입니다', '달걀과 설탕을 휘핑합니다', '밀가루, 코코아 파우더, 베이킹파우��를 체에 내립니다', '모든 재료를 섞어 반죽을 만듭니다', '180도 오븐에서 40분간 구워니다']
    },
    {
      id: '5',
      title: '신선한 샐러드',
      description: '건강하고 상큼한 샐러드로 가볍게 한 끼!',
      image: 'https://images.unsplash.com/photo-1605034298551-baacf17591d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwYm93bCUyMGhlYWx0aHl8ZW58MXx8fHwxNzcwMjYxNjg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      author: { name: '정웰빙', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop' },
      cookTime: '15분',
      difficulty: '쉬움',
      category: '양식',
      likes: 67,
      comments: 9,
      servings: '1인분',
      ingredients: ['로메인 상추 100g', '토마토 1개', '오이 1/2개', '아보카도 1/2개', '올리브 오일 2큰술', '레몬즙 1큰술', '발사믹 식초 1큰술', '소금, 후추'],
      instructions: ['모든 채소를 깨끗이 씻어 물기를 제거합니다', '채소를 먹기 좋은 크기로 썰어줍니다', '볼에 채소를 담습니다', '올리브 오일, 레몬즙, 발사믹 식초를 섞어 드레싱을 만듭니다', '드레싱을 뿌리고 가볍게 섞으면 완성!']
    },
    {
      id: '6',
      title: '일식 스시',
      description: '신��한 회와 완벽한 샤리의 조화, 집에서 만드는 스시!',
      image: 'https://images.unsplash.com/photo-1700324822763-956100f79b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZHxlbnwxfHx8fDE3NzAyNjExMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      author: { name: '김요리', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
      cookTime: '45분',
      difficulty: '어려움',
      category: '일식',
      likes: 178,
      comments: 22,
      servings: '2인분',
      ingredients: ['초밥용 쌀 2컵', '광어 회 100g', '연어 회 100g', '김 10장', '와사비', '간장', '설탕 2큰술', '식초 3큰술', '소금 1작은술'],
      instructions: ['쌀을 씻어 30분간 불려 밥을 짓습니다', '식초, 설탕, 소금을 섞어 초밥 양념을 만듭니다', '뜨거운 밥에 양념을 넣고 섞습니다', '손에 물을 묻혀 샤리를 만들고 회를 올립니다', '와사비와 간장을 곁들여 내면 완성!']
    }
  ]);

  const handleLogin = (user: { id: string; name: string; email: string; avatar: string }) => {
    setCurrentUser(user);
    setCurrentPage('feed');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('feed');
    setSelectedRecipeId(null);
  };

  const handleLike = (id: string) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === id
          ? {
              ...recipe,
              likes: recipe.liked ? recipe.likes - 1 : recipe.likes + 1,
              liked: !recipe.liked
            }
          : recipe
      )
    );
  };

  const handleRecipeClick = (id: string, mode?: 'self' | 'ai' | 'shop') => {
    setSelectedRecipeId(id);
    setSelectedRecipeMode(mode);
  };

  const handleBackToFeed = () => {
    setSelectedRecipeId(null);
    setSelectedRecipeMode(undefined);
  };

  const handleCreateRecipe = (recipeData: any) => {
    const newRecipe: Recipe = {
      id: String(recipes.length + 1),
      title: recipeData.title,
      description: recipeData.description,
      image: recipeData.image || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=1080',
      author: {
        name: currentUser!.name,
        avatar: currentUser!.avatar
      },
      cookTime: recipeData.cookTime,
      difficulty: recipeData.difficulty,
      likes: 0,
      comments: 0,
      servings: recipeData.servings,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions
    };
    setRecipes([newRecipe, ...recipes]);
    setCurrentPage('feed');
  };

  if (!currentUser) {
    return (
        <>
          {authView === 'login' ? (
              <LoginPage
                  onLogin={(user) => { setCurrentUser(user); }}
                  onShowSignup={() => setAuthView('signup')}
              />
          ) : (
              <SignupPage
                  onCancel={() => setAuthView('login')}
                  onSignupSuccess={() => setAuthView('login')}
              />
          )}
        </>
    );
  }

  const selectedRecipe = selectedRecipeId
    ? recipes.find((r) => r.id === selectedRecipeId)
    : null;

  return (
    <div className="size-full bg-gray-50">
      <NavBar
        currentUser={currentUser}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />

      {selectedRecipe ? (
        <RecipeDetail
          recipe={selectedRecipe}
          onBack={handleBackToFeed}
          onLike={handleLike}
          initialMode={selectedRecipeMode}
        />
      ) : currentPage === 'feed' ? (
        <RecipeFeed
          recipes={recipes}
          onLike={handleLike}
          onRecipeClick={handleRecipeClick}
          onNavigateToAI={() => setCurrentPage('ai')}
        />
      ) : currentPage === 'ai' ? (
        <AIRecommendation
          onRecipeClick={handleRecipeClick}
          onLike={handleLike}
        />
      ) : currentPage === 'create' ? (
        <RecipeForm onSubmit={handleCreateRecipe} onCancel={() => setCurrentPage('feed')} />
      ) : currentPage === 'profile' ? (
        <UserProfile
          user={currentUser}
          recipes={recipes}
          onLike={handleLike}
          onRecipeClick={handleRecipeClick}
        />
      ) : null}
    </div>
  );
}