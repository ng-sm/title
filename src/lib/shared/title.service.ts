import { filter, map, mergeMap } from 'rxjs/operators';

import { Injectable, Inject, Optional } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { getLastActivatedRoute, getTitleKey, isPrimary, getTitleSuffix } from './title.factory';
import { TitleConfig } from './title.model';

@Injectable()
export class TitleService {
  config: TitleConfig;

  constructor(
    @Optional() @Inject('titleConfig') private titleConfig: TitleConfig,
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
  ) {
    this.setConfigInitialValue();
    this.init();
  }

  setConfigInitialValue(): void {
    this.config = this.titleConfig || {
      suffix: '',
    }
  }

  init(): void  {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => getLastActivatedRoute(this.activatedRoute)),
        filter(isPrimary),
        mergeMap(({ data }) => data),
      )
      .subscribe(data => this.setTitle(data));
  }

  setTitle(data: Data): void {
    const { suffix } = this.config;
    const titleKey = getTitleKey(data);

    this.translateService
      .get([
        titleKey,
        ...(!!suffix ? [suffix] : []),
      ])
      .subscribe((data) => {
        this.title.setTitle(`${data[titleKey]} ${getTitleSuffix(data[suffix])}`);
      });
  }
}
