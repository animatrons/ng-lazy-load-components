import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy-component',
  template: '<div>this is the {{title}} custom compponent</div>',
  styles: [`
    div {
      color: cyan;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyComponentComponent implements OnInit, OnDestroy {
  @Input() public title = '';
  
  ngOnInit(): void {
    console.log('Hi i loadned', this.title);
  }
  ngOnDestroy(): void {
    console.log('I gone', this.title);
  }

}
