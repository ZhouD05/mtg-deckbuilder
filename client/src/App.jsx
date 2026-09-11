import Main from "./main/Main";
import LogIn from "./authentication/LogIn";
import SignUp from "./authentication/SignUp";
import ProtectedRoute from "./authentication/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return  (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Main/>
            </ProtectedRoute>}
          />
          <Route path="/login" Component={LogIn}/>
          <Route path="/signup" Component={SignUp}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}