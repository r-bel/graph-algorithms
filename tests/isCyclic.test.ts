import { isCyclic } from "../src/experiments/isCyclic";
import { UndirectedGraph } from "../src/experiments/undirectedGraph";

describe('adjacency list undirected', () => {

    let graph: UndirectedGraph;

    beforeEach(() => graph = new UndirectedGraph())

    test('cyclic case 1', () => {

        graph.setEdge({ source: 6, destination: 7 });
        graph.setEdge({ source: 7, destination: 6 });
        expect(isCyclic(graph)).toBeFalsy();

        graph.setEdge({ source: 7, destination: 0 });
        expect(isCyclic(graph)).toBeFalsy();

        graph.setEdge({ source: 0, destination: 1 });
        expect(isCyclic(graph)).toBeFalsy();

        graph.setEdge({ source: 1, destination: 2 });
        expect(isCyclic(graph)).toBeFalsy();

        graph.setEdge({ source: 2, destination: 8 });
        expect(isCyclic(graph)).toBeFalsy();

        graph.setEdge({ source: 8, destination: 6 });
        expect(isCyclic(graph)).toBeTruthy();
    });
    
    test('cyclic case 2', () => {

        graph.setEdge({ source: 7, destination: 6 });
        expect(isCyclic(graph)).toBeFalsy();

        graph.setEdge({ source: 7, destination: 0 });
        expect(isCyclic(graph)).toBeFalsy();

        graph.setEdge({ source: 0, destination: 1 });
        expect(isCyclic(graph)).toBeFalsy();

        graph.setEdge({ source: 2, destination: 8 });
        expect(isCyclic(graph)).toBeFalsy();

        graph.setEdge({ source: 2, destination: 3 });
        expect(isCyclic(graph)).toBeFalsy();

        graph.setEdge({ source: 2, destination: 5 });
        expect(isCyclic(graph)).toBeFalsy();

        graph.setEdge({ source: 3, destination: 4 });
        expect(isCyclic(graph)).toBeFalsy();

        graph.setEdge({ source: 5, destination: 6 });
        expect(isCyclic(graph)).toBeFalsy();

        graph.setEdge({ source: 5, destination: 4 });
        expect(isCyclic(graph)).toBeTruthy();
    });
});
