import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';


const Footer = () => {
  return (
    <Container maxWidth='xl' sx={{ marginTop: '4rem', marginBottom: '1rem' }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          color: (theme) => theme.palette.primary.contrastText
        }}>
          <Typography >
        &copy; 2023 DiiKhanh. All rights reserved.
          </Typography>
          <a href='https://github.com/DiiKhanh/mern-comics-app' target='_blank' rel='noreferrer' style={{ color: 'inherit' }}><GitHubIcon/></a>
        </Box>
        <Typography variant='body1' sx={{
          color: (theme) => theme.palette.primary.main
        }}>
        Built with React & Express.js, Material UI, Redux Toolkit, Vercel hosting.
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;