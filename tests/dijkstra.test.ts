import { dijkstraBfs } from "../src/bfsAlgorithms/dijkstraBfs";
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

const expectedNodeWeights = [[0, 0], [1, 4], [2, 12], [3, 19], [4, 21], [5, 11], [6, 9], [7, 8], [8, 14]];

test('test dijkstra', () => {

    const graph = GraphFactory.createAdjacencyList(weightedEdges);

    const getEdge = (source: number, destination: number) => weightedEdges.find(e => e[0] === source && e[1] === destination || e[0] === destination && e[1] === source)?.[2];

    const nodeWeights = dijkstraBfs(graph, { getEdge }, 0);

    const nodeWeightsArray = [...nodeWeights].sort((a, b) => b[0] - a[0]);

    expect(nodeWeightsArray.length).toBe(9);

    expect(nodeWeightsArray).toEqual(expectedNodeWeights.sort((a, b) => b[0] - a[0]));
});
