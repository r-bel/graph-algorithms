import { Edge } from "../generic-models/edge";
import { UndirectedGraph } from "./undirectedGraph";
import { findCheapestNode } from "./dijkstraOriginal";
import { AdjacencyProvider } from "../generic-models/adjacencyProvider";
import { ProvidesEdgeAttribute } from "../generic-models/providesEdgeAttribute";

export const prim = (graph: AdjacencyProvider, costProvider: ProvidesEdgeAttribute<number, number>, totalNodeCount: number, from: number): Iterable<Edge> => {

    // Construct the graph to build the minimal spanning tree.
    const mst = new UndirectedGraph();
    // Also at the same time, we keep track of the already added nodes.
    const visitedNodes = new Set<number>();

    // Store a random node as a starting node to continue on.
    visitedNodes.add(from);

    // As long as all nodes are not covered yet
    while (visitedNodes.size < totalNodeCount) {

        const edgeWithMinimalWeight = findCheapestNode(graph, visitedNodes, (s, d) => costProvider.getEdge(s, d) ?? 0);

        if (edgeWithMinimalWeight != null) {
            // Add the new edge with the minimal weight strongly assuming there is one.
            mst.setEdge(edgeWithMinimalWeight);
            visitedNodes.add(edgeWithMinimalWeight.source);
            visitedNodes.add(edgeWithMinimalWeight.destination);
        } else {
            break;
        }
    }

    return mst.getEdges();
}