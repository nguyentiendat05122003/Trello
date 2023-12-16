import { useSortable } from '@dnd-kit/sortable';
import AttachmentIcon from '@mui/icons-material/Attachment';
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import { Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CSS} from '@dnd-kit/utilities'
export default function CardItem({card}) {
  const hasCardActive = (card)=>{
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  const {attributes,listeners,setNodeRef,transform,transition,isDragging} = useSortable(
    {id: card._id ,data: {...card}}
  );

  const dndKitCardStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity:isDragging ? 0.5 : undefined
  };
  return (
    <Card 
        ref={setNodeRef}
        style={dndKitCardStyle}
        {...attributes}
        {...listeners}
        sx=
        {{
          cursor:'pointer',
          boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
          overflow: card.FE_PlaceholderCard ? 'hidden' :'unset',
          height : card.FE_PlaceholderCard ? '0px' : 'unset'
        }} >
        {card?.cover && 
        <CardMedia
          sx={{ height: 140 }}
          image={card.cover}
        />    
        }
        <CardContent sx={{p:1.5 ,'&:last-child':{p:1.5}}}>
          <Typography>{card.title}</Typography>                
        </CardContent>
        {hasCardActive(card) &&      
          <CardActions sx={{p:'0 4px 8px 4px'}}>
          {!!card?.memberIds?.length && <Button startIcon={<GroupIcon/>} size="small">{card?.memberIds?.length}</Button>}
          {!!card?.comments?.length && <Button startIcon={<MessageIcon/>} size="small">{card?.comments?.length}</Button>}
          {!!card?.attachments?.length && <Button startIcon={<AttachmentIcon/>} size="small">{card?.attachments?.length}</Button>}               
          </CardActions> 
        }
        
    </Card>
  )
}
