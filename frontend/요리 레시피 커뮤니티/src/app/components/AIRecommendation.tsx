import { useState } from 'react';
import { Upload, Camera, Sparkles, X, Filter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RecipeCard, Recipe } from './RecipeCard';

interface AIRecommendationProps {
  onRecipeClick: (id: string, mode?: 'self' | 'ai' | 'shop') => void;
  onLike: (id: string) => void;
}

export function AIRecommendation({ onRecipeClick, onLike }: AIRecommendationProps) {
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [filterType, setFilterType] = useState<'category' | 'cookTime' | 'difficulty'>('category');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedCookTime, setSelectedCookTime] = useState<string>('전체');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('전체');

  const categories = ['전체', '한식', '일식', '중식', '양식', '디저트'];
  const cookTimes = ['전체', '30분 이하', '30-60분', '60분 이상'];
  const difficulties = ['전체', '쉬움', '보통', '어려움'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedImage(result);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Mock AI analysis
    setTimeout(() => {
      // Mock detected ingredients
      const mockIngredients = [
        '양파',
        '당근',
        '감자',
        '돼지고기',
        '김치',
        '두부',
        '계란',
        '대파'
      ];
      setDetectedIngredients(mockIngredients);

      // Mock recommended recipes based on ingredients
      const mockRecommendations: Recipe[] = [
        {
          id: 'ai-1',
          title: '김치찌개',
          description: '냉장고에 있는 김치, 돼지고기, 두부로 만드는 따뜻한 김치찌개',
          image: 'https://images.unsplash.com/photo-1760228865341-675704c22a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraW1jaGklMjBzdGV3JTIwamppZ2FlfGVufDF8fHx8MTc3MDM0MzU5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
          author: { name: 'AI 셰프', avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&h=150&fit=crop' },
          cookTime: '30분',
          difficulty: '쉬움',
          likes: 245,
          comments: 32,
          servings: '3인분',
          ingredients: ['김치 1/4포기', '돼지고기 300g', '두부 1모', '대파 1대', '양파 1/2개'],
          instructions: [
            '김치를 먹기 좋은 크기로 썰어주세요',
            '돼지고기와 김치를 볶아주세요',
            '물을 붓고 끓여주세요',
            '두부와 양파, 대파를 넣어주세요',
            '10분간 더 끓이면 완성!'
          ],
          category: '한식'
        },
        {
          id: 'ai-2',
          title: '카레라이스',
          description: '감자, 당근, 양파로 만드는 고소한 카레',
          image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1080',
          author: { name: 'AI 셰프', avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&h=150&fit=crop' },
          cookTime: '40분',
          difficulty: '쉬움',
          likes: 189,
          comments: 24,
          servings: '4인분',
          ingredients: ['감자 2개', '당근 1개', '양파 1개', '돼지고기 200g', '카레 루 1박스'],
          instructions: [
            '채소를 깍둑썰기 해주세요',
            '고기와 채소를 볶아주세요',
            '물을 붓고 끓여주세요',
            '카레 루를 넣고 저어주세요',
            '10분간 끓이면 완성!'
          ],
          category: '양식'
        },
        {
          id: 'ai-3',
          title: '계란말이',
          description: '간단하게 계란으로 만드는 영양 간식',
          image: 'https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9?w=1080',
          author: { name: 'AI 셰프', avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&h=150&fit=crop' },
          cookTime: '15분',
          difficulty: '쉬움',
          likes: 156,
          comments: 18,
          servings: '2인분',
          ingredients: ['계란 4개', '대파 1/2대', '소금', '식용유'],
          instructions: [
            '계란을 풀고 대파를 다져 넣어주세요',
            '소금으로 간을 해주세요',
            '팬에 기름을 두르고 계란물을 부어주세요',
            '말아가며 익혀주세요',
            '먹기 좋은 크기로 자르면 완성!'
          ],
          category: '한식'
        }
      ];

      setRecommendedRecipes(mockRecommendations);
      setIsAnalyzing(false);
    }, 2000);
  };

  const removeImage = () => {
    setUploadedImage('');
    setDetectedIngredients([]);
    setRecommendedRecipes([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="size-8 text-purple-500" />
          <h1 className="text-3xl">AI 레시피 추천</h1>
        </div>
        <p className="text-gray-600">
          냉장고 사진을 올려주세요. AI가 재료를 인식하고 맞춤 레시피를 추천해드립니다!
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        {!uploadedImage ? (
          <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors bg-gray-50 hover:bg-purple-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Camera className="size-16 text-gray-400 mb-4" />
              <p className="mb-2 text-xl text-gray-700">
                냉장고 사진을 업로드하세요
              </p>
              <p className="text-sm text-gray-500">PNG, JPG (최대 10MB)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        ) : (
          <div>
            <div className="relative mb-6">
              <img
                src={uploadedImage}
                alt="Uploaded refrigerator"
                className="w-full h-80 object-cover rounded-lg"
              />
              <button
                onClick={removeImage}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <X className="size-5 text-gray-700" />
              </button>
            </div>

            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-600">AI가 냉장고 재료를 분석하고 있습니다...</p>
              </div>
            ) : detectedIngredients.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl mb-4 flex items-center gap-2">
                  <Sparkles className="size-5 text-purple-500" />
                  인식된 재료
                </h3>
                <div className="flex flex-wrap gap-2">
                  {detectedIngredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {recommendedRecipes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl flex items-center gap-2">
              <Sparkles className="size-6 text-purple-500" />
              추천 레시피
            </h2>
            <div className="flex items-center gap-2">
              <Filter className="size-5 text-gray-500" />
              
              {/* Filter Type Tabs */}
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mr-2">
                <button
                  onClick={() => setFilterType('category')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    filterType === 'category'
                      ? 'bg-white shadow-sm font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  카테고리
                </button>
                <button
                  onClick={() => setFilterType('cookTime')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    filterType === 'cookTime'
                      ? 'bg-white shadow-sm font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  조리시간
                </button>
                <button
                  onClick={() => setFilterType('difficulty')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    filterType === 'difficulty'
                      ? 'bg-white shadow-sm font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  난이도
                </button>
              </div>

              {/* Filter Options */}
              <div className="flex gap-2">
                {filterType === 'category' && categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
                {filterType === 'cookTime' && cookTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedCookTime(time)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedCookTime === time
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
                {filterType === 'difficulty' && difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedDifficulty === diff
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedRecipes
              .filter((recipe) => {
                // Category filter
                if (selectedCategory !== '전체' && recipe.category !== selectedCategory) {
                  return false;
                }
                
                // Cook time filter
                if (selectedCookTime !== '전체') {
                  const timeInMinutes = parseInt(recipe.cookTime);
                  if (selectedCookTime === '30분 이하' && timeInMinutes > 30) return false;
                  if (selectedCookTime === '30-60분' && (timeInMinutes <= 30 || timeInMinutes > 60)) return false;
                  if (selectedCookTime === '60분 이상' && timeInMinutes <= 60) return false;
                }
                
                // Difficulty filter
                if (selectedDifficulty !== '전체' && recipe.difficulty !== selectedDifficulty) {
                  return false;
                }
                
                return true;
              })
              .map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onLike={onLike}
                  onClick={onRecipeClick}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}