import { IconButton } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { themeModes } from '..//configs/theme.configs';

const SwitchMode = () => {
  const { mode, setMode } = useColorScheme();
  const onSwithTheme = () => {
    setMode(mode === themeModes.dark ? themeModes.light : themeModes.dark);
  };
  return (
    <>
      <IconButton sx={{ color: 'inherit' }} onClick={onSwithTheme}>
        {mode === themeModes.dark && <DarkModeOutlinedIcon />}
        {mode === themeModes.light && <WbSunnyOutlinedIcon />}
      </IconButton>
    </>
  );
};

export default SwitchMode;