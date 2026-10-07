import { getDisplayVersion } from '@jellyfin/sdk/lib/utils/versioning';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

import ListItemLink from 'components/ListItemLink';
import { useSystemInfo } from 'hooks/useSystemInfo';

const DrawerHeaderLink = () => {
    const { data: systemInfo } = useSystemInfo();

    return (
        <ListItemLink to='/' sx={{ py: 2, px: 2.5 }}>
            <Box sx={{ minWidth: 0 }}>
                <Box
                    component='span'
                    sx={{
                        display: 'block',
                        color: 'primary.main',
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        letterSpacing: '-0.04em',
                        lineHeight: 1
                    }}
                >
                    Rayfield
                </Box>
                <ListItemText
                    primary={systemInfo?.ServerName || 'Media server'}
                    secondary={getDisplayVersion(systemInfo?.Version)}
                    slotProps={{
                        primary: { sx: { fontSize: '0.78rem', fontWeight: 600 } },
                        secondary: { sx: { fontSize: '0.68rem' } }
                    }}
                />
            </Box>
        </ListItemLink>);
};

export default DrawerHeaderLink;
