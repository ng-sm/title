import { Data, ActivatedRoute } from '@angular/router';

import { DEFAULT_TITLE, getTitleKey, isPrimary, getLastActivatedRoute, getTitleSuffix } from './title.factory';

describe('Factory: title', () => {
  const routeValid: Data = { title: 'test', outlet: 'primary' };
  const routeInvalid: Data = {};

  it('getTitleKey should give default title when title not exist', () => {
    const title = getTitleKey(routeInvalid);
    expect(title).toEqual(DEFAULT_TITLE);
  });

  it('getTitleKey should give title when title exist', () => {
    const title = getTitleKey(routeValid);
    expect(title).toEqual(routeValid.title);
  });

  it('isPrimary should give status about primary key', () => {
    const validStatus = isPrimary(routeValid);
    expect(validStatus).toEqual(true);

    const invalidStatus = isPrimary(routeInvalid);
    expect(invalidStatus).toEqual(false);
  });

  it('getLastActivatedRoute should return last activated route', () => {
    const route = {
      firstChild: {
        firstChild: {
          firstChild: 'test' as unknown as ActivatedRoute
        },
      }
    } as ActivatedRoute;

    const lastActivatedRoute = getLastActivatedRoute(route);
    expect(lastActivatedRoute).toEqual('test');
  });

  it('getTitleSuffix should give title suffix when suffix exist', () => {
    const suffix = 'my suffix';
    expect(` | ${suffix}`).toEqual(getTitleSuffix(suffix));
    expect('').toEqual(getTitleSuffix(''));
  });
});
