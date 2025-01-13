import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./styles/reset.css";
import ArticlesMainPage from "./routes/articles/ArticlesMainPage";
import ArticlesDetailPage from "./routes/articles/ArticlesDetailPage";
import ArticlesAddPage from "./routes/articles/ArticlesAddPage";
import ArticlesEditPage from "./routes/articles/ArticlesEditPage";
import UserLoginPage from "./routes/auth/UserLoginPage";
import UserProfilePage from "./routes/auth/UserProfilePage";
import UserSignupPage from "./routes/auth/UserSignupPage";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Navigate to="/articles" replace />} />
            <Route path="/articles" element={<ArticlesMainPage />} />
            <Route path="/articles/add" element={<ArticlesAddPage />} />
            <Route path="/articles/:id" element={<ArticlesDetailPage />} />
            <Route path="/articles/:id/edit" element={<ArticlesEditPage />} />
            <Route path="/auth/login" element={<UserLoginPage />} />
            <Route path="/auth/signup" element={<UserSignupPage />} />
            <Route path="/auth/:userId/profile" element={<UserProfilePage />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
