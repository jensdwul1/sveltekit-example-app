/**
 * The settings for the navigation sidebar of the application
 *
 * You can change the text below the icon with label,
 * the icon by changing the path under icon property and whether the link is active or not with disabled
 */
interface NavigationItem {
  icon: string;
  path: string;
  label: string;
  nudged?: boolean;
  disabled: boolean;
}

export const Navigation: NavigationItem[] = [
  {
    icon: '#dashboard',
    path: '/',
    label: 'Dashboard',
    disabled: false
  },
  {
    icon: '#ap',
    path: '/ap',
    label: 'Account<br>Phases',
    disabled: false
  },
  {
    icon: '#mapping',
    path: '/mapping',
    label: 'Mapping',
    nudged: true,
    disabled: false
  },
  {
    icon: '#stakeholders',
    path: '/stakeholders',
    label: 'Stakeholder<br>Overview',
    disabled: false
  },
  {
    icon: '#nub',
    path: '/nub',
    label: 'NUB',
    disabled: false
  },
  {
    icon: '#rmp',
    path: '/rmp',
    label: 'RMP',
    disabled: false
  }
];
