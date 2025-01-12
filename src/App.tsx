import { BrowserRouter, Route, Routes } from "react-router";
import "./styles/reset.css";
import ArticlesMainPage from "./routes/articles/ArticlesMainPage";
import ArticlesDetailPage from "./routes/articles/ArticlesDetailPage";
import ArticlesAddPage from "./routes/articles/ArticlesAddPage";
import ArticlesEditPage from "./routes/articles/ArticlesEditPage";
import UserLoginPage from "./routes/auth/UserLoginPage";
import UserProfilePage from "./routes/auth/UserProfilePage";
import UserSignupPage from "./routes/auth/UserSignupPage";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>안녕하세요</div>} />
          <Route path="/articles" element={<ArticlesMainPage />} />
          <Route path="/articles/add" element={<ArticlesAddPage />} />
          <Route path="/articles/:createdAt" element={<ArticlesDetailPage />} />
          <Route
            path="/articles/:createdAt/edit"
            element={<ArticlesEditPage />}
          />
          <Route path="/auth/login" element={<UserLoginPage />} />
          <Route path="/auth/signup" element={<UserSignupPage />} />
          <Route path="/auth/:userId/profile" element={<UserProfilePage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
