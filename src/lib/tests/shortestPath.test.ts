import { shortestPath } from "../src/bfsAlgorithms/shortestPath";
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

test('test shortest path', () => {

    const graph = GraphFactory.createAdjacencyList(weightedEdges);

    const cameFrom = shortestPath(graph, 0, 4);

    const paths = [...cameFrom.entries()];

    const expected: [number, number | null][] = [
        [0, null], [1, 0],
        [7, 0], [2, 1],
        [8, 7], [6, 7],
        [3, 2], [5, 2],
        [4, 3]
    ];

    expect(paths).toEqual(expected);
});
