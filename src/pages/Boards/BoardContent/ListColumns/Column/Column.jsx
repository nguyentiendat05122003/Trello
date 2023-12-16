import AddCardIcon from '@mui/icons-material/AddCard';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import ListCards from './ListCards/ListCards';
import mapOrder from '~/utils/sort';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export default function Column({column}) {

  const orderCards = mapOrder(column.cards,column.cardOrderIds,"_id")

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {attributes,listeners,setNodeRef,transform,transition , isDragging} = useSortable(
    {id: column._id ,data: {...column}}
  );

  const dndKitColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    height:'100%',
    opacity:isDragging ? 0.7 : undefined
  };

  return (
    <div 
      ref={setNodeRef}
      style={dndKitColumnStyle}
      {...attributes}   
    >
      <Box
          {...listeners}   
           sx=
            {{
              minWidth:'300px',
              maxWidth:'300px',
              bgcolor:(theme)=>(theme.palette.mode ==='dark' ? '#333643': '#ebecf0'),
              ml:2,
              borderRadius:'6px',
              height:'fit-content',
              maxHeight : (theme)=> `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
            }}>
              {/* Header */}
              <Box sx={{
                height:(theme)=>theme.trello.columnHeaderHeight,
                p:2,
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between'
              }}>
                <Typography variant='h7' sx={{fontWeight:'bold', cursor:'pointer'}}>Column title</Typography>
                <Box>
        <ExpandMoreIcon 
          id="basic-button-dorpDown-header"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          sx={{cursor:'pointer'}}
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}/>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button-dorpDown-header',
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <AddCardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add new card</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Remove this column</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <AddToPhotosIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add this column</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
              </Box>
              {/* Content */}
              <ListCards cards={orderCards} />
              {/* Footer */}
              <Box sx={{
                height:(theme)=>theme.trello.columnFooterHeight,
                p:2,
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between'         
              }}>
                <Button startIcon={<AddCardIcon/>}>
                  Add new card
                </Button>
                <Tooltip title="Darg to move">
                  <DragHandleIcon/>
                </Tooltip>
              </Box>
      </Box>
    </div>
  )
}
