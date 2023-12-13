import { Box, FormControl, InputLabel, MenuItem, Select, useColorScheme } from '@mui/material';
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
export default function ModeSelect() {
    const { mode, setMode } = useColorScheme();
    const handleChange = (e) => {
      const mode = e.target.value;
      setMode(mode);
    };
    return (
      <Box>
        <FormControl sx={{ minWidth: 120, m :1}} size="small">
          <InputLabel  id="demo-simple-select-label">Mode</InputLabel>
          <Select
            label="Mode"
            value={mode}
            onChange={handleChange}
          >
            <MenuItem value="light">
              <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                <LightModeIcon fontSize="small" />
                Light
              </Box>
            </MenuItem>
            <MenuItem value="dark">
              <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                <DarkModeOutlinedIcon  fontSize="small"/>
                Dark
              </Box>
            </MenuItem>
            <MenuItem value="system">
              <Box sx={{display:'flex',alignItems:'center',gap:1}}>
                <SettingsBrightnessIcon fontSize="small" />
                System
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
}
