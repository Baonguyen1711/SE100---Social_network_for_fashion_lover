// 

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage'
import MessagePage from './pages/message/MessagePage';
import theme from './themes/theme';
import { ThemeProvider } from '@mui/material';
import { SocketProvider } from "./components/message/SocketContext";
import { BackgroundProvider } from './components/message/BackgroundContext';
import ExplorePage from './pages/explore/ExplorePage';
import ProfilePage from './pages/profile/ProfilePage';
import HomePage from './pages/home/HomePage';
import FavouritePage from "./pages/favourite/favourite/FavouritePage";
import FavouritePostsDisplay from "./pages/favourite/favourite/FavouritePostsDisplay";
import FavouriteGeneral from "./pages/favourite/favourite/FavouriteGeneralDisplay";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SocketProvider>
        <BackgroundProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/message/:userEmail?" element={<MessagePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/favourite" element={<ProtectedRoutes element={<FavouritePage />} />}>
              <Route index element={<ProtectedRoutes element={<FavouriteGeneral />} />} />
              <Route path="posts" element={<ProtectedRoutes element={<FavouritePostsDisplay />} />} />
            </Route>
          </Routes>
        </BackgroundProvider>
      </SocketProvider>
    </ThemeProvider>

  );
};

export default App;
