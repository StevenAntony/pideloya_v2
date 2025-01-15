import { AppBar, IconButton, Toolbar, Menu, MenuItem, Box } from '@mui/material'
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material'
import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'

export default function LayoutMobile({
    children
}) {
    const { logout } = useAuthContext()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
      }

    return (
        <div className='h-screen'>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" className='!bg-[--color-app]'>
                    <Toolbar className='justify-between'>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Mi cuenta</MenuItem>
                                <MenuItem onClick={() => {
                                    logout()
                                }}>Cerrar Sesión</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className='pt-14'>
                {children}
            </div>
        </div>
    )
}
