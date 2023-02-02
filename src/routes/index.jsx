import { Navigate, Route, Routes } from "react-router-dom"
import ProtectedRoutes from "../components/ProtectedRoutes"
import RegisterPage from "../pages/Cadastro"
import HomePage from "../pages/Home"
import LoginPage from "../pages/Login"

export const RouterMain = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<HomePage />}/>
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}