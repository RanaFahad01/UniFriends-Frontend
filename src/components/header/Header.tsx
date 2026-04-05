import { IconChevronDown } from '@tabler/icons-react';
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
import clsx from 'clsx';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import Logo from './logo/Logo';
import { Link, NavLink } from 'react-router-dom';

const links = [
    {
        link: '#',
        label: 'Academics',
        links: [
            { link: '/academic/posts', label: 'Posts' },
            { link: '/academic/leagues', label: 'Leagues' },
        ],
    },
    {
        link: '#',
        label: 'Extracurriculars',
        links: [
            { link: '/activities/posts', label: 'Posts' },
            { link: '/activities/leagues', label: 'Leagues' },
        ],
    },
    {
        link: '#',
        label: 'Leagues',
        links: [
            { link: '/user/academicleague', label: 'My Academic League' },
            { link: '/user/activityleague', label: 'My Activities League' },
        ],
    },
];

export function Header() {
    const [opened, { toggle, close }] = useDisclosure(false);

    const items = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item key={item.link}
                component={NavLink}
                to={item.link}
                className={clsx(
                    classes.subMenuItem,
                    link.label === 'Academics' && classes.academics,
                    link.label === 'Extracurriculars' && classes.extracurriculars,
                    link.label === 'Leagues' && classes.leagues
                )}>
                {item.label}
            </Menu.Item>
        ));

        if (menuItems) {
            return (
                <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                    <Menu.Target>
                        <a
                            href={link.link}
                            className={
                                classes.link
                            }
                            onClick={(event) => event.preventDefault()}
                        >
                            <Center className={clsx(
                                link.label === 'Academics' && classes.academics,
                                link.label === 'Extracurriculars' && classes.extracurriculars,
                                link.label === 'Leagues' && classes.leagues)}>

                                <span className={
                                    classes.linkLabel
                                }>
                                    {link.label}
                                </span>
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
                className={
                    classes.link
                }
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
                    <Group gap={5} visibleFrom="sm">
                        {items}
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
                    {links.map((link) => {
                        if (link.links) {
                            return <DrawerLinksGroup key={link.label} link={link} />;
                        }

                        return (
                            <a
                                key={link.label}
                                href={link.link}
                                className={classes.link}
                                onClick={(event) => event.preventDefault()}
                            >
                                {link.label}
                            </a>
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
                <Center inline className={clsx(
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
                    console.log(link.label, subLink.label)
                    return <NavLink
                        key={subLink.link}
                        to={subLink.link}
                        className={clsx(
                            classes.subLink,
                            link.label === 'Academics' && classes.academics,
                            link.label === 'Extracurriculars' && classes.extracurriculars,
                            link.label === 'Leagues' && classes.leagues
                        )}
                        onClick={(event) => event.preventDefault()}
                    >
                        {subLink.label}
                    </NavLink>
                })}
            </Collapse>
        </>
    );
}