import styles from './header.module.scss';
import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { PathsEnum } from 'typedef';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button, Container, Menu, MenuItem } from '@mui/material';
import { useSelf } from 'hooks/useSelf';
import { getMenuItems } from './utils';

const Header = () => {
  const { self, isAuth, logout } = useSelf();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const items = getMenuItems({ isAuth, self });

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={styles.header}>
      <Container maxWidth="lg">
        <div className={styles.content}>
          <Link to={PathsEnum.Home} className={styles.logo}>
            MERN BLOG
          </Link>

          <Button
            id="menu-button"
            className={styles.avatar}
            onClick={handleClick}
          >
            {isAuth ? (
              <>
                <Avatar
                  alt={self?.fullName}
                  src={`${process.env.REACT_APP_API_URL || PathsEnum.Server}${
                    self?.avatarUrl
                  }`}
                />
              </>
            ) : (
              <MenuIcon color="action" fontSize="large" />
            )}
          </Button>

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
        </div>
      </Container>
    </header>
  );
};

export default Header;
