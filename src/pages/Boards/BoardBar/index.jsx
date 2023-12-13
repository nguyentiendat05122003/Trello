import { Box } from "@mui/material";

export default function BoardBar() {
  return (
    <Box sx={{backgroundColor:'black',width:'100%',height:(theme)=>theme.trello.boardBarHeight,display:"flex",alignItems:'center'}}>Board</Box>
  )
}
