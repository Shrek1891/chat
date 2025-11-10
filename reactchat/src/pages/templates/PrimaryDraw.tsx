import {Box, styled} from "@mui/material";
import {type ReactNode, useEffect, useState} from "react";
import {useTheme, useMediaQuery} from "@mui/material";
import DrawToggle from "../../componets/PrimaryDraw/DrawToggle.tsx";
import MuiDrawer from "@mui/material/Drawer";
import * as React from "react";

type Props = {
    children: ReactNode
}

type ChildProps = {
    open: Boolean
}

type ChildElement = React.ReactElement<ChildProps>

const PrimaryDraw: React.FC<Props> = ({children}) => {
    const theme = useTheme()
    const belowSm = useMediaQuery(("(max-width: 600px)"));
    const [open, setOpen] = useState(!belowSm)
    const openMixin = () => ({
        transition: theme.transitions.create("width", {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.sharp,
        }),
        overflowX: "hidden",
    })
    const closeMixin = () => ({
        transition: theme.transitions.create("width", {
            duration: theme.transitions.duration.leavingScreen,
            easing: theme.transitions.easing.sharp,
        }),
        overflowX: "hidden",
        width: theme.primaryDraw.closed,
    })

    const Drawer = styled(
        MuiDrawer,
        {}
    )
    (({theme, open}) => ({
        width: theme.primaryDraw.width,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
            ...openMixin(),
            "& .MuiDrawer-paper": openMixin(),
        }),
        ...(!open && {
            ...closeMixin(),
            "& .MuiDrawer-paper": closeMixin(),
        }),

    }))

    useEffect(() => {
        setOpen(!belowSm)
    }, [belowSm])
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }
    return (
        <Drawer
            open={open}
            variant={belowSm ? "temporary" : "permanent"}
            slotProps={{
                paper: {
                    sx: {
                        mt: `${theme.primaryAppBar.height}px`,
                        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
                        width: `${theme.primaryDraw.width}px`,
                        overflow: "auto",
                    }
                }
            }}
        >
            <Box>
                <Box sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    p: 0,
                    width: open ? "auto" : "100%",
                }}>
                    <DrawToggle
                        open={open}
                        onOpen={handleDrawerOpen}
                        onClose={handleDrawerClose}
                    />

                </Box>
                {
                    React.Children.map(children, (child) => {
                        return React.isValidElement(child) ? React.cloneElement(child as ChildElement, {open}) : child
                    })
                }
            </Box>
        </Drawer>
    )
}

export default PrimaryDraw
