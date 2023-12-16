import { Box, Button } from '@mui/material'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
export default function ListColumns({columns}) {
  const newItems = columns.map((item)=>item._id)
  return (
    <SortableContext items={newItems} strategy={horizontalListSortingStrategy}>
      <>
          {columns.map((column,idx)=>{
            return <Column column={column} key={idx}/> 
          })}
          <Box sx={{minWidth:'200px',maxWidth:'200px', mx:2, borderRadius:'6px',height:'fit-content',backgroundColor:'rgba(255, 255, 255, 0.16)'}}>
            <Button sx={{width:'100%',pl:2.5,py:1}} startIcon={<NoteAddIcon/>}>
              Add new column
            </Button>
          </Box>
      </>
    </SortableContext>
  )
}
