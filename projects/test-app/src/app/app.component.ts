import { Component, ViewChild } from '@angular/core';
import { dijkstraBfs } from '@graph-algorithms/lib';
import { GridCoordinate, SvgGridComponent } from '../components/svg-grid/svg-grid.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  @ViewChild(SvgGridComponent) 
  child!: SvgGridComponent;

  readonly width = 200;
  readonly height = 100;
  readonly traject: number[] = [];
  readonly frontier = new Set<number>();
  readonly blockedNodes = new Set<number>();

  source = 0;
  destination = 0;
  dragging = false;

  getStyle = (x: number, y: number) => {

    const node = y * this.width + x;

    if (this.traject.includes(node)) {
      return 'fill:red;stroke-width:1;stroke:grey';
    } else if (this.frontier.has(node)) {
      return 'fill:black;stroke-width:1;stroke:grey';
    } else if (this.blockedNodes.has(node)) {
      return 'fill:brown;stroke-width:1;stroke:grey';
    } else {
      return 'fill:antiquewhite;stroke-width:1;stroke:grey';
    }
  }

  onMousedown(coordinate: GridCoordinate) {

    this.source = coordinate.y * this.width + coordinate.x;

    this.dragging = true;
  }

  onMousemove(coordinate: GridCoordinate) {

    const node = coordinate.y * this.width + coordinate.x;

    if (this.dragging && !this.blockedNodes.has(node)) {

      this.destination = node;

      this.recalc();

      this.child.redraw();
    }
  }

  ondblclick(coordinate: GridCoordinate) {

    this.blockedNodes.add(coordinate.y * this.width + coordinate.x);

    this.child.redraw();
  }

  onMouseup() {

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
  }
}
