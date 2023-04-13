import { AdjacencyProvider } from "../generic-models/adjacencyProvider";
import { SimpleUndirectedGraph } from "./simpleUndirectedGraph";

export class GraphFactory {

    static createAdjacencyList(edges: Iterable<number[]>): AdjacencyProvider {

        const adjacencyProvider = new SimpleUndirectedGraph();

        for (const edge of edges) {
            adjacencyProvider.setEdge({ source: edge[0], destination: edge[1] });
        }

        return adjacencyProvider;
    }
}