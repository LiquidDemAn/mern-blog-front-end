import styles from './profile.module.scss';
import { Grid, Tab, Tabs } from '@mui/material';
import { TabPanel } from 'components/common/tab-panel';
import { Posts } from 'components/posts/posts-wrapper';
import { Followers } from 'components/user/followers';
import { ProfileCard } from 'components/user/profile-card';
import { UsersSearch } from 'components/user/users-search';
import { ErrorType, TabsEnum } from 'typedef';
import { SyntheticEvent, useState } from 'react';
import { PostType } from 'redux/services/posts/typedef';
import { SearchingUsersRequest, UserType } from 'api/models/UserType';
import { defaultValues } from 'components/user/users-search/utils';
import { useSearchUsersForm } from 'components/user/users-search/useSearchUsersForm';
import { useApi } from 'components/user/users-search/useApi';
import { useWatch } from 'react-hook-form';

type Props = {
  user: UserType | null;
  posts: PostType[];
  tabValue: TabsEnum;
  postsError: ErrorType | null;
  isLogedUser: boolean;
  postsLoading: boolean;
  handleChange: (event: SyntheticEvent, newValue: TabsEnum) => void;
};

export const ProfileView = ({
  isLogedUser,
  user,
  posts,
  tabValue,
  handleChange,
  postsError,
  postsLoading
}: Props) => {
  const [filters, setFilters] = useState<SearchingUsersRequest>(defaultValues);
  const { form, onSubmit } = useSearchUsersForm(setFilters);
  const { searchUsersQuery } = useApi(filters);
  const searchType = useWatch({ control: form.control, name: 'searchType' });
  const foundUsers = searchUsersQuery.data;

  return (
    <div className={styles.profile}>
      {user && (
        <>
          <ProfileCard user={user} isLogedUser={isLogedUser} />

          <main className={styles.main}>
            <Tabs
              className={styles.tabs}
              value={tabValue || TabsEnum.Posts}
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
                    searchType={searchType}
                    onSubmit={onSubmit}
                    form={form}
                  />
                  <Followers followers={searchUsersQuery.data} />
                </TabPanel>
              )}
            </Grid>
          </main>
        </>
      )}
    </div>
  );
};
