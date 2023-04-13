import { SimpleUndirectedGraph } from "../src/dataStructures/simpleUndirectedGraph";

describe('adjacency list undirected', () => {

    let graph: SimpleUndirectedGraph;

    beforeEach(() => graph = new SimpleUndirectedGraph());

    test('Empty', () => {

        // expect([...graph.getNodes()].length).toBe(0)
        // expect(graph.edgeCount()).toBe(0);
        // expect(graph.nodeCount()).toBe(0);
        expect(graph.getAllAdjacent(0)).toBeUndefined();
        // expect(graph.getEdge(0, 1)).toBeUndefined();
    });

    test('one edge', () => {

        graph.setEdge({ source: 0, destination: 1 });

        // const nodes = [...graph.getNodes()];

        // expect(nodes).toEqual([0, 1])
        // expect(graph.edgeCount()).toBe(1);
        // expect(graph.nodeCount()).toBe(2);
        expect(graph.getAllAdjacent(0)).toEqual([1]);
        expect(graph.getAllAdjacent(1)).toEqual([0]);
        expect(graph.getAllAdjacent(2)).toBeUndefined();
        // expect(graph.getEdge(0, 1)).toBe(8);
        // expect(graph.getEdge(1, 0)).toBe(8);
        // expect(graph.getEdge(0, 0)).toBeUndefined();
    });

    test('multiple edges', () => {

        graph.setEdge({ source: 0, destination: 1 });
        graph.setEdge({ source: 0, destination: 1 });
        graph.setEdge({ source: 0, destination: 2 });
        graph.setEdge({ source: 0, destination: 2 });
        graph.setEdge({ source: 4, destination: 6 });

        // const nodes = [...graph.getNodes()];

        // expect(nodes).toEqual([0, 1, 2, 4, 6])
        // expect(graph.edgeCount()).toBe(3);
        // expect(graph.nodeCount()).toBe(5);
        expect(graph.getAllAdjacent(0)).toEqual([1, 2]);
        expect(graph.getAllAdjacent(1)).toEqual([0]);
        expect(graph.getAllAdjacent(2)).toEqual([0]);
        expect(graph.getAllAdjacent(3)).toBeUndefined();
        expect(graph.getAllAdjacent(4)).toEqual([6]);
        expect(graph.getAllAdjacent(5)).toBeUndefined();
        expect(graph.getAllAdjacent(6)).toEqual([4]);
        // expect(graph.getEdge(0, 1)).toBe(null);
        // expect(graph.getEdge(0, 2)).toBe(5);
        // expect(graph.getEdge(4, 6)).toBe(null);
        // expect(graph.getEdge(6, 4)).toBe(null);
    });

    test('set same edges', () => {

        graph.setEdge({ source: 0, destination: 1 });
        graph.setEdge({ source: 0, destination: 1 });
        graph.setEdge({ source: 1, destination: 0 });

        // const nodes = [...graph.getNodes()];

        // expect(nodes).toEqual([0, 1])
        // expect(graph.edgeCount()).toBe(1);
        // expect(graph.nodeCount()).toBe(2);
        expect(graph.getAllAdjacent(0)).toEqual([1]);
        expect(graph.getAllAdjacent(1)).toEqual([0]);
        expect(graph.getAllAdjacent(2)).toBeUndefined();
        // expect(graph.getEdge(0, 1)).toBe(3);
    });

    test('set reflexive edges', () => {

        graph.setEdge({ source: 0, destination: 1 });
        graph.setEdge({ source: 0, destination: 0 });
        graph.setEdge({ source: 5, destination: 5 });

        // const nodes = [...graph.getNodes()];

        // expect(nodes).toEqual([0, 1, 5])
        // expect(graph.edgeCount()).toBe(1);
        // expect(graph.nodeCount()).toBe(3);
        expect(graph.getAllAdjacent(0)).toEqual([1]);
        expect(graph.getAllAdjacent(1)).toEqual([0]);
        expect(graph.getAllAdjacent(5)).toEqual([]);
        expect(graph.getAllAdjacent(2)).toBeUndefined();
        // expect(graph.getEdge(0, 1)).toBe(2);
    });
});