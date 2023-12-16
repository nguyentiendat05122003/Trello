import { Box } from '@mui/material';
import CardItem from './Card/Card';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
export default function ListCards({cards}) {
  const newCardItem =  cards.map((card)=> card._id)
  return (
    <SortableContext items={newCardItem} strategy={verticalListSortingStrategy}>
      <Box sx={{
        display:'flex',
        flexDirection:'column',
        p:'0 5px',
        m :'0 5px',
        gap:1,
        overflowX:'hidden',
        overflowY:'scroll',
        maxHeight:(theme)=> `calc(${theme.trello.boardContentHeight} - ${theme.trello.columnHeaderHeight} - ${theme.trello.columnFooterHeight} - ${theme.spacing(5)})`
      }}>
        {cards.map((card,index)=>{
         return <CardItem card={card} key={index}/>       
        })}
      </Box>
    </SortableContext>
  )
}
