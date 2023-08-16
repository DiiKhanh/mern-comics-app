import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

const Logo = () => {
  const theme = useTheme();
  return (
    <Typography fontWeight='700' fontSize='1.75rem'>
      K<span style={{ color: theme.palette.primary.main }}>Comics</span>
    </Typography>
  );
};

export default Logo;