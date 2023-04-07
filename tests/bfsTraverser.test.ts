import { GraphFactory } from "../src/dataStructures/graphFactory";
import { bfsTraverser } from "../src/bfsAlgorithms/bfsTraverser";

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

test('test bfs traverser', () => {

    const graph = GraphFactory.createAdjacencyList(weightedEdges);

    let reachedNodes = bfsTraverser(graph, 0);
    expect([...reachedNodes].sort()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);

    reachedNodes = bfsTraverser(graph, 2);

    expect([...reachedNodes].sort()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
});
