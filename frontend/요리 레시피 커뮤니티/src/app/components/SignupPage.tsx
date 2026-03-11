import React, { useState } from 'react'; // 임포트는 무조건 맨 위!
import axios from 'axios';

interface SignupPageProps {
    onCancel: () => void;
    onSignupSuccess: () => void;
}

export function SignupPage({ onCancel, onSignupSuccess }: SignupPageProps) {
    // [1] 입력 데이터를 관리할 상태(State)
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    // [2] 가입 버튼 클릭 시 실행될 로직
    const handleSignup = async () => {
        // 빈 칸 검사 (간단한 유효성 체크)
        if (!email || !nickname || !password) {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        try {
            // 우리가 만든 스프링 부트 백엔드로 데이터 전송!
            const response = await axios.post('http://localhost:8080/api/signup', {
                email: email,
                password: password,
                nickname: nickname
            });

            alert(response.data); // "회원가입이 완료되었습니다!"
            onSignupSuccess();    // 성공 시 로그인 화면으로 전환
        } catch (error: any) {
            console.error("가입 에러:", error);
            alert("가입 실패: " + (error.response?.data || "서버 연결을 확인하세요."));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
            <div className="max-w-md w-full mx-4">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="text-5xl mb-4">✍️</div>
                        <h1 className="text-3xl mb-2">회원가입</h1>
                        <p className="text-gray-600">요리 커뮤니티에 합류하세요!</p>
                    </div>

                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="이메일 주소"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // 입력값 실시간 저장
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <input
                            type="text"
                            placeholder="닉네임"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button
                            onClick={handleSignup}
                            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            가입하기
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        이미 계정이 있으신가요?{' '}
                        <button onClick={onCancel} className="text-orange-500 hover:text-orange-600 font-medium">
                            로그인으로 돌아가기
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}