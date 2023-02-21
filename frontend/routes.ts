import { Flow } from '@vaadin/flow-frontend';
import type { Route } from '@vaadin/router';
import Role from './generated/biz/asplund/app/data/Role';
import { appStore } from './stores/app-store';
import './views/home/home-view';
import './views/main-layout';

const { serverSideRoutes } = new Flow({
  imports: () => import('../target/frontend/generated-flow-imports'),
});

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  requiresLogin?: boolean;
  rolesAllowed?: Role[];
  children?: ViewRoute[];
};

export const hasAccess = (route: Route) => {
  const viewRoute = route as ViewRoute;
  if (viewRoute.requiresLogin && !appStore.loggedIn) {
    return false;
  }

  if (viewRoute.rolesAllowed) {
    return viewRoute.rolesAllowed.some((role) => appStore.isUserInRole(role));
  }
  return true;
};

export const views: ViewRoute[] = [
  // place routes below (more info https://hilla.dev/docs/routing)
  {
    path: '',
    component: 'home-view',
    requiresLogin: true,
    icon: '',
    title: '',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      return;
    },
  },
  {
    path: 'home',
    component: 'home-view',
    requiresLogin: true,
    icon: 'la la-home',
    title: 'Home',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      return;
    },
  },
  {
    path: 'profile',
    component: 'profile-view',
    rolesAllowed: [Role.USER],
    icon: 'la la-user-edit',
    title: 'Profile',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/profile/profile-view');
      return;
    },
  },
  {
    path: 'admin',
    component: 'admin-view',
    rolesAllowed: [Role.ADMIN],
    icon: 'la la-cogs',
    title: 'Admin',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/admin/admin-view');
      return;
    },
  },
  {
    path: 'passwordreset',
    component: 'password-reset-view',
    icon: 'la la-key',
    title: 'Password Reset',
    action: async (_context, _command) => {
      await import('./views/passwordreset/password-reset-view');
      return;
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: 'login',
    component: 'login-view',
    requiresLogin: true,
    icon: '',
    title: 'Login',
    action: async (_context, _command) => {
      await import('./views/login/login-view');
      return;
    },
  },

  {
    path: '',
    component: 'main-layout',
    children: [
      ...views,
      // for server-side, the next magic line sends all unmatched routes:
      ...serverSideRoutes, // IMPORTANT: this must be the last entry in the array
    ],
  },
];
