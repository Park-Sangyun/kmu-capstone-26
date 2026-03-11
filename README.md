# 🍳 요리 레시피 커뮤니티

## 🛠 시작 가이드
### 1. DB 설정 (MySQL)
- `recipe_db`라는 이름의 데이터베이스를 생성(CREATE DATABASE recipe_db;).
- `backend/src/main/resources/application.yml.example`을 복사해 `application.yml`을 만들고 본인의 DB 계정 정보를 입력.

### 2. 백엔드 실행
- Java 17 필요
- `./gradlew bootRun` 
- 또는 `src/main/java/com.example.recipebackend/RecipeBackendApplication.java` Run

### 3. 프론트엔드 실행
- Node.js 필요
- `cd frontend` -> `npm install` -> `npm run dev`
