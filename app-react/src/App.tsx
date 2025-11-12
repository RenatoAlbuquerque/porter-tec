import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LocaleLayout from "./pages/LocaleLayout";
import HomeRedirect from "./pages/HomeRedirect";
import ConstructionPage from "./pages/construction/Page";
import FavoritesPage from "./pages/favorites/Page";
import UserPage from "./pages/user/[id]/Page";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense >
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path=":locale" element={<LocaleLayout />}>
            <Route index element={<Navigate to="construction" replace />} />
            <Route path="construction" element={<ConstructionPage />} />
            <Route path="users" element={<HomeRedirect />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="user">
              <Route path=":id" element={<UserPage />} />
            </Route>
            <Route path="*" element={<div>Not found</div>} />
          </Route>
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
