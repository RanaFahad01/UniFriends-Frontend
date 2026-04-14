import { IconChevronDown } from '@tabler/icons-react';
import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';
import {
  Burger,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Group,
  Menu,
  ScrollArea,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuth } from '@/store/AuthContext';
import Logo from './logo/Logo';
import UserControls from './usercontrols/UserControls';
import classes from './Header.module.css';

const links = [
  {
    link: '#',
    label: 'Academics',
    links: [
      { link: '/academics/posts', label: 'Posts' },
      { link: '/academics/leagues', label: 'Leagues' },
    ],
  },
  {
    link: '#',
    label: 'Extracurriculars', // display label — routes use /activities internally
    links: [
      { link: '/activities/posts', label: 'Posts' },
      { link: '/activities/leagues', label: 'Leagues' },
    ],
  },
  // Leagues are currently only accessible via the Academics/Extracurriculars dropdowns and personal leagues are available thru the user profile, so we can remove this for now to declutter the header. We can always add it back later if we want to give leagues more prominence.
  //   {
  //     link: '#',
  //     label: 'Leagues',
  //     links: [
  //       { link: '/user/academicleague', label: 'My Academic League' },
  //       { link: '/user/activityleague', label: 'My Extracurriculars League' },
  //     ],
  //   },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { user, isLoading } = useAuth();
  const showUserControls = !!user && !user.isNewUser;
  const showLoginButton = !isLoading && !showUserControls;

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item
        key={item.link}
        component={NavLink}
        to={item.link}
        className={clsx(
          classes.subMenuItem,
          link.label === 'Academics' && classes.academics,
          link.label === 'Extracurriculars' && classes.extracurriculars,
          link.label === 'Leagues' && classes.leagues
        )}
      >
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          zIndex={50}
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center
                className={clsx(
                  link.label === 'Academics' && classes.academics,
                  link.label === 'Extracurriculars' && classes.extracurriculars,
                  link.label === 'Leagues' && classes.leagues
                )}
              >
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <NavLink
        key={link.label}
        to={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </NavLink>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Link to="/" style={{ display: 'contents' }}>
            <Logo />
          </Link>
          <Group gap={5} visibleFrom="sm" justify="space-between">
            {items}
            {showUserControls && <UserControls />}
            {showLoginButton && (
              <NavLink to="/login" className={classes.loginButton}>
                Log In / Sign Up
              </NavLink>
            )}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
            aria-label="Toggle navigation"
          />
        </div>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title={<Logo />}
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          {showUserControls && <UserControls withinPortal={false} menuPosition="bottom-start" />}
          {showLoginButton && (
            <NavLink to="/login" className={classes.loginButton} style={{ margin: '0.5rem 1rem' }}>
              Log In / Sign Up
            </NavLink>
          )}
          <Divider my="sm" />
          {links.map((link) => {
            if (link.links) {
              return <DrawerLinksGroup key={link.label} link={link} />;
            }

            return (
              <NavLink
                key={link.label}
                to={link.link}
                className={classes.link}
                style={{ display: 'contents' }}
                onClick={(event) => event.preventDefault()}
              >
                {link.label}
              </NavLink>
            );
          })}
        </ScrollArea>
      </Drawer>
    </header>
  );
}

function DrawerLinksGroup({
  link,
}: {
  link: { link: string; label: string; links?: { link: string; label: string }[] };
}) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <UnstyledButton className={classes.link} onClick={toggle}>
        <Center
          inline
          className={clsx(
            link.label === 'Academics' && classes.academics,
            link.label === 'Extracurriculars' && classes.extracurriculars,
            link.label === 'Leagues' && classes.leagues
          )}
        >
          <span className={classes.linkLabel}>{link.label}</span>
          <IconChevronDown size={14} stroke={1.5} />
        </Center>
      </UnstyledButton>
      <Collapse in={opened}>
        {link.links?.map((subLink) => {
          return (
            <NavLink
              key={subLink.link}
              to={subLink.link}
              className={clsx(
                classes.subLink,
                link.label === 'Academics' && classes.academics,
                link.label === 'Extracurriculars' && classes.extracurriculars,
                link.label === 'Leagues' && classes.leagues
              )}
            >
              {subLink.label}
            </NavLink>
          );
        })}
      </Collapse>
    </>
  );
}
