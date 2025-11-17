import * as React from "react";
import {useTheme} from "@mui/material/styles";

interface ColorModeContextType {
    toggleColorMode: () => void
}

const ColorModeContext = React.createContext<ColorModeContextType | null>({
    toggleColorMode: () => {
        const theme = useTheme();
        return (
            <>
            </>
        )

    }
})

export default ColorModeContext
