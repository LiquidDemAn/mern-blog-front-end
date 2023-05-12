import styles from './profile.module.scss';
import { Grid, Tab, Tabs } from '@mui/material';
import { TabPanel } from 'components/common/tab-panel';
import { Posts } from 'components/posts/posts-wrapper';
import { Followers } from 'components/user/followers';
import { ProfileCard } from 'components/user/profile-card';
import { UsersSearch } from 'components/user/users-search';
import { ErrorType, TabsEnum } from 'typedef';
import { FoundUserType } from 'redux/services/user/typedef';
import { SyntheticEvent } from 'react';
import { PostType } from 'redux/services/posts/typedef';
import { AxiosError } from 'axios';
import { UserType } from 'api/models/UserType';

type Props = {
  user: UserType | null;
  posts: PostType[];
  foundUsers: FoundUserType[] | null;
  tabValue: TabsEnum;
  postsError: ErrorType | null;
  isLogedUser: boolean;
  postsLoading: boolean;
  handleChange: (event: SyntheticEvent, newValue: TabsEnum) => void;
  setSearchData: (data: FoundUserType[] | null) => void;
  setProfileError: (error: AxiosError | null) => void;
  setFoundUsersLoading: (value: boolean) => void;
};

export const ProfileView = ({
  isLogedUser,
  user,
  posts,
  foundUsers,
  tabValue,
  handleChange,
  postsError,
  postsLoading,
  setSearchData,
  setProfileError,
  setFoundUsersLoading
}: Props) => {
  return (
    <div className={styles.profile}>
      {user && (
        <>
          <ProfileCard user={user} isLogedUser={isLogedUser} />

          <main className={styles.main}>
            <Tabs
              className={styles.tabs}
              value={tabValue}
              onChange={handleChange}
              variant="scrollable"
              visibleScrollbar
            >
              <Tab
                aria-controls={`tabpanel-${TabsEnum.Posts}`}
                label={TabsEnum.Posts}
                value={TabsEnum.Posts}
              />
              <Tab
                aria-controls={`tabpanel-${TabsEnum.Followers}`}
                label={`${TabsEnum.Followers} (${user?.followers.length})`}
                value={TabsEnum.Followers}
              />
              <Tab
                aria-controls={`tabpanel-${TabsEnum.Following}`}
                label={`${TabsEnum.Following} (${user?.following.length})`}
                value={TabsEnum.Following}
              />

              {isLogedUser && (
                <Tab
                  aria-controls={`tabpanel-${TabsEnum.FindPerson}`}
                  label={`${TabsEnum.FindPerson} ${
                    foundUsers ? `(${foundUsers.length})` : ''
                  } `}
                  value={TabsEnum.FindPerson}
                />
              )}
            </Tabs>

            <Grid>
              {/* Posts */}
              <TabPanel value={tabValue} index={TabsEnum.Posts}>
                <Posts
                  error={postsError}
                  isLoading={postsLoading}
                  posts={posts}
                />
              </TabPanel>

              {/* Followers */}
              <TabPanel value={tabValue} index={TabsEnum.Followers}>
                <Followers followers={user?.followers} />
              </TabPanel>

              {/* Following */}
              <TabPanel value={tabValue} index={TabsEnum.Following}>
                <Followers followers={user?.following} />
              </TabPanel>

              {/* Find Person */}
              {isLogedUser && (
                <TabPanel value={tabValue} index={TabsEnum.FindPerson}>
                  <UsersSearch
                    setData={setSearchData}
                    setError={setProfileError}
                    setLoading={setFoundUsersLoading}
                  />

                  <Followers followers={foundUsers} />
                </TabPanel>
              )}
            </Grid>
          </main>
        </>
      )}
    </div>
  );
};
