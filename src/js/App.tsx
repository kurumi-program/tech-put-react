import * as React from "react";
import { Login } from "./pages/auth/Login";
import { Post } from "./pages/post/Post";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/auth/Signup";
import { HeaderLayout } from "./components/layout/HeaderLayout";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword";
import { AuthProvider } from "./contexts/AuthContext";
import { PostDetail } from "./pages/post/PostDetail";
import { PublicRoute } from "./components/root/PublicRoute";
import { PrivateRoute } from "./components/root/PrivateRoute";
import { Profile } from "./pages/post/Profile";
import { Notice } from "./pages/post/Notice";
import { PostProvider } from "./contexts/PostContext";
import { NoticeProvider } from "./contexts/NoticeContext";
import { PostStock } from "./pages/post/PostStock";
import { ProfileProvider } from "./contexts/ProfileContext";
import { UserProfileRote } from "./components/root/UserProfileRoute";
import { RelationshipProvider } from "./contexts/RelationshipContext";
import { FollowList } from "./pages/post/FollowList";
import { FollowerList } from "./pages/post/FollowerList";
import { ProfileFollowList } from "./pages/post/ProfileFollowList";
import { ProfileFollowerList } from "./pages/post/ProfileFollowerList";
import { Search } from "./pages/post/Search";
import { NotFound } from "./pages/post/NotFound";
import { Terms } from "./pages/legal/Terms";
import { Privacy } from "./pages/legal/Privacy";
import { Help } from "./pages/legal/Help";
import { GuestLogin } from "./pages/auth/GuestLogin";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <PostProvider>
            <NoticeProvider>
              <RelationshipProvider>
                <HeaderLayout />
                <Routes>
                  <Route path="/" element={<Post />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/help" element={<Help />} />

                  {/* ログインしている場合 */}
                  <Route element={<PrivateRoute />}>
                    <Route path="/post-detail/:id" element={<PostDetail />} />
                    <Route path="/my-page" element={<Profile />} />
                    <Route path="/users/:id" element={<UserProfileRote />} />
                    <Route path="/users/:id/following" element={<FollowList />} />
                    <Route path="/users/:id/followers" element={<FollowerList />} />
                    <Route path="/my-page/following" element={<ProfileFollowList />} />
                    <Route path="/my-page/followers" element={<ProfileFollowerList />} />
                    <Route path="/notification" element={<Notice />} />
                    <Route path="/stocks" element={<PostStock />} />
                    <Route path="/search" element={<Search />} />
                  </Route>

                  {/* ログインしていない場合 */}
                  <Route element={<PublicRoute />}>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/guest-login" element={<GuestLogin />} />
                  </Route>
                </Routes>
              </RelationshipProvider>
            </NoticeProvider>
          </PostProvider>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
