import { Navigate, Outlet, useLocation } from 'react-router-dom'
import LayoutDesktop from './layouts/LayoutDesktop';
import NotFound404 from '../pages/NotFound404';
import useMobile from '../hooks/useMobile';
import LayoutMobile from './layouts/LayoutMobile';
import { useAuthContext } from '../contexts/auth/AuthContext';

const AuthWrapper = (props: any ) => {
    const location = useLocation()
    const { user, isLoggedIn } = useAuthContext()
    const { isMobile } = useMobile()

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />
    }

    const urlCurrent = location.pathname

    const resourceAuthorized = user?.resourceAllow?.includes(urlCurrent)
    const accessGranted = user.superAdmin == 1 || resourceAuthorized
    if (isMobile) {
        return <LayoutMobile>
            {
                accessGranted
                    ? (props.children ?? <Outlet />)
                    : <NotFound404 />
            }
        </LayoutMobile>
    }

    return <LayoutDesktop>
        {
            accessGranted
                ? (props.children ?? <Outlet />)
                : <NotFound404 />
        }
    </LayoutDesktop>
}

export default AuthWrapper
