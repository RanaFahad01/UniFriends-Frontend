import { Outlet } from 'react-router-dom';
import { NavigationProgress } from '@/components/navigationprogress/NavigationProgress';

export function RootLayout() {
    return (
        <>
            <NavigationProgress />
            <Outlet />
        </>
    );
}
