import { 
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewContainerRef, 
  ViewChildren,
  QueryList,
  Input} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>See console to See viewContainer</h1>
    <ul>
      <li *ngFor="let i of [].constructor(20); index as idx" >
        <button [ngClass]="{'hide': hideLine === idx}" (click)="loadComponent(idx)" > load </button>
        <span [ngClass]="{'hide': hideLine === idx}" #span> {{idx}}  custum element shall be loaded here inshaallah</span>
      </li>
     <!-- <li><custom-comp #custom></custom-comp></li> -->
     <!-- <li><ng-template #template [ngIf]="true">this is template</ng-template></li> -->
    </ul>
  `,
  styles: [`
    .hide {
      display: none;
    }
  `]
})
export class AppComponent implements AfterViewInit {
  hideLine: number = -1;
  previousIndex: number = -1;

  @ViewChildren('span', { read: ViewContainerRef }) spans!: QueryList<ViewContainerRef>;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngAfterViewInit(): void {
    console.log('ViewContainerRef Elements');
    this.spans.toArray().forEach((spn, i) => {
      console.log('' + i, spn);
    })
  }

  async loadComponent(index: number) {
    this.hideLine = index;
    // this.spans.toArray().forEach(vcr => vcr.clear());
    this.spans.toArray()[this.previousIndex]?.clear();
    const { LazyComponentComponent } = await import('./lazy-component.component');
    const componentRef = this.spans.toArray()[index]?.createComponent(LazyComponentComponent);
    componentRef.instance.title = `${index}`;
    this.previousIndex = index;
  }

}
