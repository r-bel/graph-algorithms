import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

export interface GridCoordinate {
  x: number;
  y: number;
}

@Component({
  selector: 'app-svg-grid',
  templateUrl: './svg-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgGridComponent implements AfterViewInit {

  readonly defaultStyle = 'fill:antiquewhite;stroke-width:1;stroke:grey';

  readonly cellSize = 10;

  @Input()
  width = 0;

  @Input()
  height = 0;

  @Output()
  onMousedown = new EventEmitter<GridCoordinate>();

  @Output()
  onMouseup = new EventEmitter<GridCoordinate>();

  @Output()
  onMousemove = new EventEmitter<GridCoordinate>();

  @Output()
  onDblclick = new EventEmitter<GridCoordinate>();

  @Input()
  getStyle: (x: number, y: number) => string = () => this.defaultStyle;

  constructor(private ref: ChangeDetectorRef) {
    ref.detach();
  }

  * largeIterate(count: number) {
    for (let i = 0; i < count; i++) yield i;
  }

  redraw() {
    this.ref.detectChanges();
  }

  ngAfterViewInit(): void {

    this.ref.detectChanges();
  }
}
