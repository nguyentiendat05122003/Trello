import { Box } from "@mui/material";
import ModeSelect from "../../components/ModeSelect"
export default function AppBar() {
  return (
    <Box sx={{backgroundColor:'yellow',width:'100%',height:(theme)=>theme.trello.appBarHeight,display:"flex",alignItems:'center'}}>
        <ModeSelect />
      </Box>
  )
}
