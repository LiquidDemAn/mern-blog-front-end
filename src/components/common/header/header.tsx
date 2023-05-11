import styles from './header.module.scss';
import { MouseEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispach } from 'redux/store/hooks';
import { logOut } from 'redux/services/user/user.slice';
import { PathsEnum } from 'typedef';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';

import {
  Avatar,
  Button,
  Container,
  Menu,
  MenuItem,
  SvgIcon
} from '@mui/material';
import { useSelf } from 'hooks/useSelf';

export const Header = () => {
  const dispatch = useAppDispach();
  const navigate = useNavigate();

  const { self, isAuth } = useSelf();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onProfile = () => {
    if (self) {
      navigate(self.nickName);
      handleClose();
    }
  };

  const onLogin = () => {
    navigate(PathsEnum.Login);
    handleClose();
  };

  const onRegister = () => {
    navigate(PathsEnum.Register);
    handleClose();
  };

  const onLogOut = () => {
    dispatch(logOut());
  };

  const onCreatePost = () => {
    navigate(PathsEnum.CreatePost);
    handleClose();
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
            aria-controls={open ? 'menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {isAuth ? (
              <>
                <Avatar
                  alt={self?.fullName}
                  src={`${process.env.REACT_APP_API_URL || PathsEnum.Server}${
                    self?.avatarUrl
                  }`}
                />
                <SvgIcon htmlColor="black" fontSize="medium">
                  <ArrowDropDownIcon />
                </SvgIcon>
              </>
            ) : (
              <MenuIcon color="action" fontSize="large" />
            )}
          </Button>

          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'menu-button'
            }}
          >
            {isAuth ? (
              <ul>
                <MenuItem onClick={onProfile}>Profile</MenuItem>
                <MenuItem onClick={onCreatePost}>Write a post</MenuItem>
                <MenuItem onClick={onLogOut}>Log out</MenuItem>
              </ul>
            ) : (
              <ul>
                <MenuItem onClick={onLogin}>Log in</MenuItem>
                <MenuItem onClick={onRegister}>Create account</MenuItem>
              </ul>
            )}
          </Menu>
        </div>
      </Container>
    </header>
  );
};
