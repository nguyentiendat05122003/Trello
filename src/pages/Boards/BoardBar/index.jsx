import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CapitalizeFirstLetter from "~/utils/capitalize-first-letter";
const MENU_STYLE = {
  color:'primary.main',
  border:'none',
  paddingX:'5px',
  borderRadius:'4px',
  '& .MuiSvgIcon-root':{
    color:'primary.main'
  },
  '&:hover':{
    bgcolor:'rgb(25,118,212,.2)'
  }
}
export default function BoardBar({board}) {
  return (
    <Box sx=
    {{
      width:'100%',
      height:(theme)=>theme.trello.boardBarHeight,display:"flex",
      alignItems:'center',
      justifyContent:'space-between',
      gap:2,
      px:2,
      overflowX:'auto',
    }}
      >
        <Box sx={{display:'flex',alignItems:'center', gap:2}}>
        <Chip 
         icon={<DashboardIcon />} 
         label="Nguyễn Tiến Đạt" 
         clickable 
         sx=
         {MENU_STYLE}
        />
        <Chip 
         icon={<VpnLockIcon />} 
         label={CapitalizeFirstLetter(board.type)}
         clickable 
         sx=
         {MENU_STYLE}
        />
        <Chip 
         icon={<AddToDriveIcon />} 
         label="Add To Google Driver" 
         clickable 
         sx=
         {MENU_STYLE}
        />
        <Chip 
         icon={<BoltIcon />} 
         label="Automation" 
         clickable 
         sx=
         {MENU_STYLE}
        />
        <Chip 
         icon={<FilterAltIcon />} 
         label="Filters" 
         clickable 
         sx=
         {MENU_STYLE}
        />
        </Box>
        <Box sx={{display:'flex',alignItems:'center', gap:2}}>
        <Button startIcon={<PersonAddIcon/>} variant="outlined">Create</Button>

        <AvatarGroup  max={4} 
        sx={{
          '& .MuiAvatar-root':{
            width:32,
            height:32,
            fontSize:16
          }
        }}>
            <Tooltip title="Remy Sharp"><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></Tooltip>
            <Tooltip title="Remy Sharp"><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></Tooltip>
            <Tooltip title="Remy Sharp"><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></Tooltip>
            <Tooltip title="Remy Sharp"><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></Tooltip>
            <Tooltip title="Remy Sharp"><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></Tooltip>
        </AvatarGroup>
        </Box>
      </Box>
  )
}
