import { Navigate, Outlet, useLocation } from 'react-router-dom'
import NotFound404 from '../pages/NotFound404';
import { useAuthContext } from '@contexts/auth/AuthContext';

const AuthMasterWrapper = ({ children }) => {
    const { isLoggedIn, user, company } = useAuthContext()

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />
    }

    const accessGranted = user.superAdmin == 1 && company.motherCompany == 1

    return <>
        {
            accessGranted
                ? (children ?? <Outlet />)
                : <NotFound404 />
        }
    </>
}

export default AuthMasterWrapper
