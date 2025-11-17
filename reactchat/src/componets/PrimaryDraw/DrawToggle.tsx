import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {Box} from "@mui/material";
import {IconButton} from "@mui/material";
import {useTheme} from "@mui/material/styles";

type Props = {
    open: boolean,
    onOpen: () => void,
    onClose: () => void
}


const DrawToggle: React.FC<Props> = ({open, onOpen, onClose}) => {
    const theme = useTheme()
    const isDarkMode=theme.palette.mode==="dark"
    return (
        <Box sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            borderRadius: "5px",
            backgroundColor: isDarkMode ? "#000" : "#fff",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}>
            <IconButton onClick={open ? onClose : onOpen}>
                {open ? <ChevronLeft/> : <ChevronRight/>}
            </IconButton>
        </Box>
    )
}

export default DrawToggle
