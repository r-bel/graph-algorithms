import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { dijkstraBfs } from '@graph-algorithms/lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {

  readonly width = 200;
  readonly height = 200;
  readonly traject: number[] = [];
  readonly frontier = new Set<number>();
  readonly blockedNodes = new Set<number>();

  source = 0;
  destination = 0;

  constructor(private ref: ChangeDetectorRef) {
    ref.detach();
  }

  * columns() {
    for (let i = 0; i < this.width; i++) yield i;
  }

  * rows() {
    for (let i = 0; i < this.height; i++) yield i;
  }

  onMousedown(x: number, y: number) {
    this.source = y * this.width + x;

    this.dragging = true;
  }

  dragging = false;

  onMousemove(x: number, y: number) {
    if (this.dragging) {
      this.destination = y * this.width + x;

      this.recalc();
    }
  }

  ondblclick(x: number, y: number) {
    this.blockedNodes.add(y * this.width + x);
    this.ref.detectChanges();

  }

  onMouseup(x: number, y: number) {

    this.dragging = false;
  }

  gridAdjacencyProvider = {

    getAllAdjacent: (node: number) => {

      const coord = [node % this.width, Math.floor(node / this.width)];

      const neighbours = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [1, 1], [-1, 1]]
        .map(tuple => [coord[0] + tuple[0], coord[1] + tuple[1]])
        .filter(([x, y]) => x >= 0 && y >= 0 && x < this.width && y < this.height)
        .map(([x, y]) => x + y * this.width)
        .filter(n => !this.blockedNodes.has(n));

      return neighbours;
    }
  }

  getEdge = (source: number, destination: number) => {
    return 1;
  }

  recalc() {

    this.frontier.clear();

    const nodeWeights = dijkstraBfs(this.gridAdjacencyProvider, { getEdge: this.getEdge }, this.source, this.destination,
      (n) => {
        this.frontier.add(n);
      });

    let destination = this.destination;

    this.traject.length = 0;

    this.traject.push(destination);

    while (destination !== this.source) {

      const adj = this.gridAdjacencyProvider.getAllAdjacent(destination);

      const w = adj.map((node): [number, number | null | undefined] => ([node, nodeWeights.get(node)])).filter(t => t[1] !== undefined);
      w.forEach(t => t[1]! += this.getEdge(destination, t[0]));

      const p = w?.sort((a, b) => a[1]! - b[1]!);

      destination = p[0][0];

      this.traject.push(destination);
    }

    this.ref.detectChanges();
  }

  ngAfterViewInit(): void {

    this.ref.detectChanges();
  }
}
