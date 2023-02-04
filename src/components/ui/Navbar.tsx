import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from 'react';
import { UIContext } from "@/context/ui";
import NextLink from "next/link";

export const Navbar = () => {

    const { openSideMenu } = useContext(UIContext)

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton size="large" edge="start" onClick={openSideMenu}>
                    <MenuOutlinedIcon />
                </IconButton>
                <NextLink style={{ textDecoration: "none", color: "snow" }} href="/" passHref>
                    {/* <Link underline="none" color="snow"> */}
                    <Typography variant="h6">
                        My Tasks
                    </Typography>
                    {/* </Link> */}
                </NextLink>
            </Toolbar>
        </AppBar>
    )
}
