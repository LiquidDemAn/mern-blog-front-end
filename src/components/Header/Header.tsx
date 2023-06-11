import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { PathsEnum } from 'typedef';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import { useSelf } from 'hooks/useSelf';
import { getMenuItems } from './utils';

const Header = () => {
  const { self, isAuth, logout, isLoading } = useSelf();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const items = getMenuItems({ isAuth, self });
  const avatarUrl = `${process.env.REACT_APP_API_URL || PathsEnum.Server}${
    self?.avatarUrl
  }`;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar color="transparent" position="static" className="py-2 mb-4">
      <Container maxWidth="lg">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            component={Link}
            variant="h6"
            to={PathsEnum.Home}
            className="px-2 font-bold bg-black text-white uppercase no-underline rounded hover:bg-[#4361ee]"
          >
            MERN BLOG
          </Typography>

          {!isLoading && (
            <Button onClick={handleClick}>
              {isAuth ? (
                <Avatar alt={self?.fullName} src={avatarUrl} />
              ) : (
                <MenuIcon color="action" fontSize="large" />
              )}
            </Button>
          )}

          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
            {items.map(({ to, label }) => (
              <MenuItem onClick={handleClose}>
                <Link className="text-black no-underline" to={to}>
                  {label}
                </Link>
              </MenuItem>
            ))}
            {isAuth && <MenuItem onClick={logout}>Log out</MenuItem>}
          </Menu>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
