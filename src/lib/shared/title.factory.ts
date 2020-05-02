import { ActivatedRoute, Data } from '@angular/router';

export const DEFAULT_TITLE = 'title.default';

export function getLastActivatedRoute(route: ActivatedRoute): ActivatedRoute {
  while (route.firstChild) {
    route = route.firstChild;
  }

  return route;
}

export function getTitleKey(routeData: Data): string {
  return routeData.title
    ? routeData.title
    : DEFAULT_TITLE;
}

export function isPrimary(routeData: Data): boolean {
  const { outlet } = routeData;
  return outlet === 'primary';
}

export function getTitleSuffix(suffix: string): string {
  return suffix
    ? ` | ${suffix}`
    : '';
}
