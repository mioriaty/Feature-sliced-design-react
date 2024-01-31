import { useSuspenseQuery } from '@tanstack/react-query';
import { IoCreateOutline, IoSettingsSharp } from 'react-icons/io5';
import { NavLink, Outlet } from 'react-router-dom';
import { sessionQueries } from '~entities/session';
import { pathKeys } from '~shared/lib/react-router';

export function GenericLayout() {
  const { data } = useSuspenseQuery(sessionQueries.userService.queryOptions());

  return (
    <>
      {data ? <UserNavigation /> : <GuestNavigation />}
      <Outlet />
      <Footer />
    </>
  );
}

export function GuestLayout() {
  return (
    <>
      <GuestNavigation />
      <Outlet />
      <Footer />
    </>
  );
}

export function NakedLayout() {
  return <Outlet />;
}

function UserNavigation() {
  const { data: user } = useSuspenseQuery(
    sessionQueries.userService.queryOptions(),
  );

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" to={pathKeys.home()}>
          conduit
        </NavLink>

        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to={pathKeys.home()}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={pathKeys.editor.root()}>
              <IoCreateOutline size={16} />
              &nbsp;New Article
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={pathKeys.settings()}>
              <IoSettingsSharp size={16} />
              &nbsp;Settings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to={pathKeys.profile.byUsername({ username: user!.username })}
            >
              <img
                className="user-pic"
                src={user!.image}
                alt={user!.username}
              />
              {user!.username}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function GuestNavigation() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" to={pathKeys.home()}>
          conduit
        </NavLink>

        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to={pathKeys.home()}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={pathKeys.login()}>
              Sign in
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={pathKeys.register()}>
              Sign up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <NavLink className="logo-font" to={pathKeys.home()}>
          conduit
        </NavLink>
        <span className="attribution">
          An interactive learning project from{' '}
          <a href="https://thinkster.io" target="_blank" rel="noreferrer">
            Thinkster
          </a>
          . Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  );
}
