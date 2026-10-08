import ArrowBack from '@mui/icons-material/ArrowBack';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Home from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import Search from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import React, { type FC, type PropsWithChildren, ReactNode } from 'react';

import { appRouter } from 'components/router/appRouter';
import { useUserViews } from 'hooks/api/useUserViews';
import { useApi } from 'hooks/useApi';
import globalize from 'lib/globalize';

import LibraryIcon from '../../apps/modern/components/LibraryIcon';

import UserMenuButton from './UserMenuButton';

interface AppToolbarProps {
    buttons?: ReactNode
    isDrawerAvailable: boolean
    isDrawerOpen: boolean
    onDrawerButtonClick?: (event: React.MouseEvent<HTMLElement>) => void
    isBackButtonAvailable?: boolean
    isUserMenuAvailable?: boolean
    className?: string
}

const onBackButtonClick = () => {
    appRouter.back()
        .catch(err => {
            console.error('[AppToolbar] error calling appRouter.back', err);
        });
};

const AppToolbar: FC<PropsWithChildren<AppToolbarProps>> = ({
    buttons,
    children,
    isDrawerAvailable,
    isDrawerOpen,
    onDrawerButtonClick = () => { /* no-op */ },
    isBackButtonAvailable = false,
    isUserMenuAvailable = true,
    className
}) => {
    const { user } = useApi();
    const { data: userViewsData } = useUserViews({ userId: user?.Id });
    const userViews = userViewsData?.Items || [];
    const isUserLoggedIn = Boolean(user);

    return (
        <Toolbar
            variant='dense'
            className={className}
            sx={{
                flexWrap: {
                    xs: 'wrap',
                    lg: 'nowrap'
                }
            }}
        >
            {isUserLoggedIn && isDrawerAvailable && (
                <Tooltip title={globalize.translate(isDrawerOpen ? 'MenuClose' : 'MenuOpen')}>
                    <IconButton
                        size='large'
                        color='inherit'
                        aria-label={globalize.translate(isDrawerOpen ? 'MenuClose' : 'MenuOpen')}
                        onClick={onDrawerButtonClick}
                    >
                        <MenuIcon />
                    </IconButton>
                </Tooltip>
            )}

            {isBackButtonAvailable && (
                <Tooltip title={globalize.translate('ButtonBack')}>
                    <IconButton
                        size='large'
                        color='inherit'
                        aria-label={globalize.translate('ButtonBack')}
                        onClick={onBackButtonClick}
                    >
                        <ArrowBack />
                    </IconButton>
                </Tooltip>
            )}

            {isUserLoggedIn && (
                <Box className='rayfieldTopNav' component='nav' aria-label='Primary navigation'>
                    <Button className='rayfieldBrand' component='a' href='#/home' startIcon={<span className='rayfieldBrandMark' aria-hidden='true'>R</span>}>
                        Rayfield
                    </Button>
                    <Button component='a' href='#/home' startIcon={<Home />}>
                        {globalize.translate('Home')}
                    </Button>
                    <Button component='a' href='#/home?tab=1' startIcon={<FavoriteBorder />}>
                        {globalize.translate('Favorites')}
                    </Button>
                    {userViews.slice(0, 4).map(view => (
                        <Button
                            key={view.Id}
                            component='a'
                            href={`#${appRouter.getRouteUrl(view, { context: view.CollectionType }).replace(/^\//, '')}`}
                            startIcon={<LibraryIcon item={view} />}
                        >
                            {view.Name}
                        </Button>
                    ))}
                    <Button component='a' href='#/search' startIcon={<Search />}>
                        {globalize.translate('Search')}
                    </Button>
                </Box>
            )}

            {children}

            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                {buttons}
            </Box>

            {isUserLoggedIn && isUserMenuAvailable && (
                <Box sx={{ flexGrow: 0 }}>
                    <UserMenuButton />
                </Box>
            )}
        </Toolbar>
    );
};

export default AppToolbar;
