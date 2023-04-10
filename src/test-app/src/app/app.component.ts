import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GraphFactory, dijkstraBfs } from '@graph-algorithms/lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('canvas', { static: true })
  public canvasRef: ElementRef<HTMLCanvasElement> | null = null;

  // private ctx: CanvasRenderingContext2D;

  ngAfterViewInit(): void {



    const weightedEdges = [
      [0, 1, 4],
      [0, 7, 8],
      [1, 7, 11],
      [1, 2, 8],
      [8, 2, 2],
      [8, 7, 7],
      [6, 7, 1],
      [6, 8, 6],
      [2, 3, 7],
      [5, 3, 14],
      [5, 6, 2],
      [3, 4, 9],
      [5, 4, 10],
      [5, 2, 4],
    ];

    const source = 0;

    // Construct a graph from the original edges being passed.
    const graph = GraphFactory.createAdjacencyList(weightedEdges);

    let destination = 4;

    // bfs(originalGraph, source, destination);
    const getEdge = (source: number, destination: number) => weightedEdges.find(e => e[0] === source && e[1] === destination || e[0] === destination && e[1] === source)?.[2];

    const nodeWeights = dijkstraBfs(graph, { getEdge }, source, destination);




    const ctx = this.canvasRef!.nativeElement.getContext('2d')!;

    const w: number = 800;
    const h: number = 400;
    const s: number = 40;

    const cw = Math.fround(w + 1);
    const ch = Math.fround(h + 1);

    this.canvasRef!.nativeElement.width = cw;
    this.canvasRef!.nativeElement.height = ch;


    // Square Size
    const squareSize = Math.fround(s);

    ctx.clearRect(0, 0, cw, ch);
    // Set line color
    ctx.strokeStyle = '#333';
    // Set font size and color
    ctx.font = 'normal ' + Math.fround(squareSize / 3) + 'px arial';
    ctx.fillStyle = 'orange';

    ctx.beginPath();
    // Vertical Lines and label
    for (let x = Math.fround(0.5); x < cw; x += squareSize) {
      // Lines
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ch);
      // Label
      // const colLabel = this.colName((colCounter += 1));
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      // ctx.fillText(colLabel, Math.fround(x + squareSize / 2), 0);
    }
    // Horizontal Lines and label
    for (let y = Math.fround(0.5); y < ch; y += squareSize) {
      // Lines
      ctx.moveTo(0, y);
      ctx.lineTo(cw, y);
      // Label
      // const rowLabel = (rowCounter += 1);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      // ctx.fillText(rowLabel.toString(), 0, Math.fround(y + squareSize / 2));
    }
    // Drawing
    ctx.stroke();
  }



}
