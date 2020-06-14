import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TitleService } from './shared/title.service';
import { TitleConfig } from './shared/title.model';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  providers: [
    TitleService,
  ],
})
export class TitleModule {
  static forRoot(titleConfig: TitleConfig): ModuleWithProviders {
    return {
      ngModule: TitleModule,
      providers: [
        {
          provide: 'titleConfig',
          useValue: titleConfig,
        }
      ]
    };
  }

  constructor(public titleService: TitleService) {}
}
