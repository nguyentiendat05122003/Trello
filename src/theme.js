
import { experimental_extendTheme as extendTheme } from '@mui/material'
import { pink } from '@mui/material/colors'

const theme = extendTheme({
  trello: {
    appBarHeight: '48px',
    boardBarHeight: '58px',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: pink[600]
        }
      }
    },
    dark: {
      palette: {
      }
    }
  }
})

export default theme