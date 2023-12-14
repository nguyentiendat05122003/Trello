import { Badge, Box, Button, SvgIcon, TextField, Tooltip, Typography } from "@mui/material";
import ModeSelect from "../../components/ModeSelect"
import AppsIcon from '@mui/icons-material/Apps';
import   TrelloIcon from '~/assets/trello.svg?react'; 
import WorkSpace from "./Menu/WorkSpace";
import Recent from "./Menu/Recent";
import Starred from "./Menu/Starred";
import Templates from "./Menu/Templates";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Profile from "./Menu/Profile";
export default function AppBar() {
  return (
    <Box
    px={2} 
    sx=
    {{
      width:'100%',
      height:(theme)=>theme.trello.appBarHeight,
      display:"flex",alignItems:'center',
      justifyContent:'space-between',
      gap:2,
      overflowX:'scroll'
      }}
      >
        <Box sx={{display:'flex',alignItems:'center', gap:2}}>
          <AppsIcon sx={{color:'primary.main'}}/>
          <Box sx={{display:'flex',alignItems:'center',gap:0.5}}>
            <SvgIcon component={TrelloIcon} inheritViewBox fontSize="small"  sx={{color:'primary.main'}}/>
            <Typography 
            sx={{
              fontSize:'1.2rem',
              fontWeight:'bold', 
              color:'primary.main'
              }} 
              variant="span">Trello</Typography>
          </Box>
        <Box sx={{display:{xs:'none',md:'flex'},gap:1}}>
            <WorkSpace/>
            <Recent/>
            <Starred/>
            <Templates/>
            <Button variant="outlined">Create</Button>
        </Box>
        </Box>
              
        <Box sx={{display:'flex',alignItems:'center', gap:2}}>
          <TextField id="outline-search" sx={{minWidth:'120px'}} label="Search..." type="search" size="small"/>
          <ModeSelect />
          <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{cursor:'pointer',color:'primary.main'}}>
            <NotificationsNoneIcon />
          </Badge>
          </Tooltip>
          <Tooltip title="Help">
            <HelpOutlineIcon  sx={{cursor:'pointer',color:'primary.main'}}/>
          </Tooltip>
          <Profile/>
        </Box>
       
    </Box>
  )
}
