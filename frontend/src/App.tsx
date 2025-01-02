//


import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import MessagePage from "./pages/message/MessagePage";
import theme from "./themes/theme";
import { ThemeProvider } from "@mui/material";
import { SocketProvider } from "./components/message/SocketContext";
import { BackgroundProvider } from "./components/message/BackgroundContext";
import { SnackbarProvider } from "./components/shared/SnackBarProvider";
import ExplorePage from "./pages/explore/ExplorePage";
import ProfilePage from "./pages/profile/ProfilePage";
import HomePage from "./pages/home/HomePage";
import FavouritePage from "./pages/favourite/favourite/FavouritePage";
import FavouritePostsDisplay from "./pages/favourite/favourite/FavouritePostsDisplay";
import FavouriteGeneral from "./pages/favourite/favourite/FavouriteGeneralDisplay";
import PostsDisplay from "./components/profile/Post/PostsDisplay";
import FollowingDisplay from "./components/profile/Following/FollowingDisplay";
import FollowerDisplay from "./components/profile/Following/FollowerDisplay";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SocketProvider>
        <BackgroundProvider>
          <SnackbarProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/forgot-password" element={<ForgetPasswordPage />} />
            <Route path="/explore" element={<ProtectedRoutes element={<ExplorePage />} />} />
            <Route path="/message/:userEmail?" element={<ProtectedRoutes element={<MessagePage />} />}/>
            <Route path="/profile/:userId" element={<ProfilePage />}>
              <Route
                index
                element={<ProtectedRoutes element={<PostsDisplay />} />}
              />
              <Route
                path="posts"
                element={<ProtectedRoutes element={<PostsDisplay />} />}
              />
              <Route
                path="following"
                element={<ProtectedRoutes element={<FollowingDisplay />} />}
              />
              <Route
                path="follower"
                element={<ProtectedRoutes element={<FollowerDisplay />} />}
              />
            </Route>
            <Route path="/home" element={<ProtectedRoutes element={<HomePage />} />}/>
            <Route path="/favourite" element={<ProtectedRoutes element={<FavouritePage />} />}>
              <Route index element={<ProtectedRoutes element={<FavouriteGeneral />} />} />
              <Route path="posts" element={<ProtectedRoutes element={<FavouritePostsDisplay />} />}/>
            </Route>
          </Routes>
          </SnackbarProvider>          
        </BackgroundProvider>
      </SocketProvider>
    </ThemeProvider>
  );
  
};

export default App;
