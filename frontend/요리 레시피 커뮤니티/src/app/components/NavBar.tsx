import { Home, PlusCircle, User, Search, LogOut, Sparkles } from 'lucide-react';

interface NavBarProps {
  currentUser: { name: string; avatar: string } | null;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function NavBar({ currentUser, currentPage, onNavigate, onLogout }: NavBarProps) {
  if (!currentUser) return null;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍳</span>
            <span className="text-xl">맛있는 레시피</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onNavigate('feed')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                currentPage === 'feed'
                  ? 'bg-orange-100 text-orange-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home className="size-5" />
              <span className="hidden md:inline">홈</span>
            </button>

            <button
              onClick={() => onNavigate('ai')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                currentPage === 'ai'
                  ? 'bg-purple-100 text-purple-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Sparkles className="size-5" />
              <span className="hidden md:inline">AI 추천</span>
            </button>

            <button
              onClick={() => onNavigate('create')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                currentPage === 'create'
                  ? 'bg-orange-100 text-orange-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <PlusCircle className="size-5" />
              <span className="hidden md:inline">작성하기</span>
            </button>

            <button
              onClick={() => onNavigate('profile')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                currentPage === 'profile'
                  ? 'bg-orange-100 text-orange-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User className="size-5" />
              <span className="hidden md:inline">프로필</span>
            </button>

            <button
              onClick={onLogout}
              className="ml-2 px-4 py-2 rounded-lg flex items-center gap-2 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="size-5" />
              <span className="hidden md:inline">로그아웃</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}