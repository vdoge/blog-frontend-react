import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../shared/components/AuthContext";
import MenuIcon from '@mui/icons-material/Menu';


const pages = [
    {name: "Home", url: "/"},
    {name: "About", url: "/about"},
    {name: "Blog", url: "/blog"}
]


function Title() {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLoginClick = () => {
        // encode current path in query string
        handleCloseUserMenu()
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
    };

    const handleLogoutClick = () => {
        logout();
        navigate("/")
    };

    // Settings for User menu
    const settings = [
        {name: "Profile", url: "/profile"},
        {name: "Account", url: "/account"},
        {name: "Dashboard", url: "/dashboard"},
        {name: "Logout", func: handleLogoutClick}
    ]

    /**
     *  Maps menu item to either a url path of function.
     * 
     * @param {string} name - label of the menu item 
     */
    const handleMenuFunc = (name: string) => {
        settings.map((setting) => {
            if (setting.name == name) {
                if ("func" in setting) {
                    setting.func?.()
                } else if ("url" in setting) {
                    handleCloseUserMenu()
                    navigate(setting.url) 
                }
            }
        })
    }

    // rendered when not logged in
    const noUser = () => {
        return (
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="login">
                    <IconButton onClick={ handleLoginClick } sx={{ p: 0 }}>
                        <Avatar alt="" src="/static/images/avatar/1.jpg" />
                    </IconButton>
                </Tooltip>
            </Box>
        );
    }

    // rendered when logged in
    const userExists = () => {
        return (
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="caption">open settings</Typography>
                            <Box>{user?.email}</Box>
                        </Box>
                    }>
                    <IconButton onClick={ handleOpenUserMenu } sx={{ p: 0 }}>
                        <Avatar alt={user?.name} src="/static/images/avatar/1.jpg" />
                    </IconButton>
                </Tooltip>

                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={ anchorElUser }
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={ Boolean(anchorElUser) }
                    onClose={ handleCloseUserMenu }
                >

                { settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={ () => { handleMenuFunc(setting.name) }}>
                        <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                    </MenuItem>
                )) }

                </Menu>
            </Box>
        );
    }

    const menu = () => {
        return (
            <React.Fragment>
                {/* Collapsed hamburger version for responsive and mobile screens */}
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={ handleOpenNavMenu }
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        id="menu-appbar"
                        anchorEl={ anchorElNav }
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={ Boolean(anchorElNav) }
                        onClose={ handleCloseNavMenu }
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >

                    { pages.map((page) => (
                        <MenuItem key={page.name} onClick={ () => { handleCloseNavMenu(); navigate(page.url) } }>
                            <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                        </MenuItem>
                    )) }

                    </Menu>
                </Box>

                {/* For large screens */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    { pages.map((page) => (
                        <Button
                            key={ page.name }
                            onClick={() => { navigate(page.url) }}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            { page.name }
                        </Button>
                    )) }
                </Box>
            </React.Fragment>
        )

    }
    
    const title = () => {
        return (
            <React.Fragment>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Typography align="center" variant="h3">Vdoge's Blog</Typography>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <Typography align="center" variant="h4">Vdoge's Blog</Typography>
                </Box>
            </React.Fragment>
        );
    }


    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    { menu() }

                    { title() }

                    { user ? userExists() : noUser() }

                </Toolbar>
            </Container>
        </AppBar>
    )

}


export default Title;