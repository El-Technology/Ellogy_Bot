import { Box } from "@mui/material";
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';

export const Header = () => {
  return (
    <Box
        sx={{
            maxHeight: '71px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#000000',
            padding: '10px 82px 10px 91px',
            boxSizing: 'content-box',
            borderBottom: '6px solid #C4C4C4 80%'
        }}
    >
        <Logo />
        <img style={{ cursor: 'pointer' }} src={require('../../assets/icons/user.png')} alt="Not found" />
    </Box>
  )
}
