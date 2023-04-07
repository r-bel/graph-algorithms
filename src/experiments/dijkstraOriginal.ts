import { AdjacencyProvider } from "../generic-models/adjacencyProvider";
import { ProvidesEdgeAttribute } from "../generic-models/providesEdgeAttribute";
import { CountNodes, WeightedEdge } from "./models";

export const findCheapestNode = (graph: AdjacencyProvider, visitedNodes: Set<number>, getWeight: (source: number, destination: number) => number): WeightedEdge | null => {

    let edgeWithMinimalWeight: WeightedEdge | null = null;

    for (const sr of visitedNodes) {

        // Consider all neighbours of the particular node except the ones already in the mst.
        const adjacentNodes = graph.getAllAdjacent(sr)?.filter(n => !visitedNodes.has(n));

        adjacentNodes?.forEach(destination => {
            const weight = getWeight(sr, destination)
            if (edgeWithMinimalWeight === null || weight < edgeWithMinimalWeight.weight) {
                edgeWithMinimalWeight = { source: sr, destination, weight }
            }
        });
    }

    return edgeWithMinimalWeight;
}

export const dijkstra = (originalGraph: CountNodes & AdjacencyProvider & ProvidesEdgeAttribute, start: number): Map<number, number> => {

    const totalNodeCount = originalGraph.nodeCount();

    // Also at the same time, we keep track of the already added nodes.
    const visitedNodes = new Set<number>();

    const nodeDistance = new Map<number, number>();

    nodeDistance.set(start, 0);
    let sourceNode = start;

    // Dijkstra builds a spanning tree until all nodes are covered.
    while (visitedNodes.size < totalNodeCount) {

        visitedNodes.add(sourceNode);

        const adjacentNodes = originalGraph.getAllAdjacent(sourceNode)?.filter(n => !visitedNodes.has(n));

        // update weights of all adjacent nodes
        adjacentNodes?.forEach(destination => {

            const edgeWeight = originalGraph.getEdge(sourceNode, destination) ?? 0;

            const oldNodeWeight = nodeDistance.get(destination);

            const newNodeWeight = edgeWeight + (nodeDistance.get(sourceNode) ?? 0);

            if (oldNodeWeight == null || newNodeWeight < oldNodeWeight) {

                nodeDistance.set(destination, newNodeWeight);
            }
        });

        const edgeWithMinimalWeight = findCheapestNode(originalGraph, visitedNodes, (s, d) => nodeDistance.get(d) ?? 0);

        if (edgeWithMinimalWeight != null)
            sourceNode = edgeWithMinimalWeight.destination;
    }

    return nodeDistance;
}