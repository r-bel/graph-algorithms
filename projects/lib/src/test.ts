import { dijkstraBfs } from "./bfsAlgorithms/dijkstraBfs";
import { shortestPath } from "./bfsAlgorithms/shortestPath";
import { GraphFactory } from "./dataStructures/graphFactory";

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
const cameFrom = shortestPath(graph, source, destination);

const getEdge = (source: number, destination: number) => weightedEdges.find(e => e[0] === source && e[1] === destination || e[0] === destination && e[1] === source)?.[2];

const nodeWeights = dijkstraBfs(graph, { getEdge }, source, destination);

console.log([...cameFrom]);

const traject: number[] = [destination];

while (destination !== 0) {

    const adj = graph.getAllAdjacent(destination);

    destination = adj?.sort((a, b) => ((nodeWeights.get(a) ?? 0) + (getEdge(destination, a) ?? 0)) - (nodeWeights.get(b)! + getEdge(destination, b)!))[0] ?? 0;

    traject.push(destination);
}

console.warn(traject);