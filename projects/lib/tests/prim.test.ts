import { isCyclic } from "../src/experiments/isCyclic";
import { prim } from "../src/experiments/prim";
import { UndirectedGraph } from "../src/experiments/undirectedGraph";
import { GraphFactory } from "../src/dataStructures/graphFactory";

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

const edges =
    weightedEdges.map(arr => ({
        source: arr[0],
        destination: arr[1],
        weight: arr[2],
    }));

test('test prim', () => {

    const originalGraph = GraphFactory.createAdjacencyList(weightedEdges);

    const getEdge = (source: number, destination: number) => weightedEdges.find(e => e[0] === source && e[1] === destination || e[0] === destination && e[1] === source)?.[2];

    const mst = prim(originalGraph, { getEdge }, 9, 0);

    const mstArray = [...mst];

    expect(mstArray.length).toBe(8);

    const graph = new UndirectedGraph();
    mstArray.forEach(edge => graph.setEdge(edge));
    expect(isCyclic(graph)).toBe(false);

    let totalWeight = 0;

    mstArray.forEach(edge => {

        totalWeight += edges.find(e => e.source === edge.source && e.destination === edge.destination || e.source === edge.destination && e.destination === edge.source)?.weight ?? 0;
    });

    expect(totalWeight).toBe(37);
});
