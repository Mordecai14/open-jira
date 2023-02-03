import { FC, PropsWithChildren } from "react"
import Head from "next/head"

import { Box, Paper } from "@mui/material"
import { Navbar, Sidebar } from "../ui"
import { height } from "@mui/system"

interface Props {
    title?: string
}

export const Layout: FC<PropsWithChildren<Props>> = ({ title = "OpenJira", children }) => {
    return (
        <Box sx={{ flexFlow: 1 }}>
            <Head>
                <title>{title}</title>
            </Head>

            <Navbar />
            <Sidebar />

            <Box sx={{ padding: "10px 20px", }}>
                {children}
            </Box>

            <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50px" }}>
                Footer
            </Paper>
        </Box>
    )
}
