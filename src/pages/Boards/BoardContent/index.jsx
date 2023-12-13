import { Box } from '@mui/material'

export default function BoardContent() {
  return (
      <Box sx={{width:'100%',height:(theme)=>`calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,display:"flex",alignItems:'center'}}>Board Content</Box>
  )
}
