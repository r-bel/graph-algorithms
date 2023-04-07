import { bfsGeneric } from "./bfsGeneric";
import { HeapBasedPriorityQueue } from "../dataStructures/heapBasedPriorityQueue";
import { ProvidesEdgeAttribute } from "../generic-models/providesEdgeAttribute";
import { AdjacencyProvider } from "../generic-models/adjacencyProvider";

/**
 * Uniform Cost Search algorithm aka Dijkstra's algorithm based on generic bfs traversing.
 */
export const dijkstra = (graph: AdjacencyProvider, costProvider: ProvidesEdgeAttribute<number, number>, start: number, destination?: number): Map<number, number | null> => {

    const cameFrom = new Map<number, number | null>();
    const frontier = new HeapBasedPriorityQueue<number>(false);
    const costSoFar = new Map<number, number | null>();

    cameFrom.set(start, null);
    frontier.enqueue(start, 0);
    costSoFar.set(start, 0);

    const evalNeighbor = (next: number, current: number | null) => {

        const hasReached = cameFrom.has(next);

        const oldCost = costSoFar.get(next) ?? 0;

        const newCost = costSoFar.get(current!)! + costProvider.getEdge(current!, next)!;

        if (!(hasReached && newCost >= oldCost)) {
            costSoFar.set(next, newCost);
            frontier.enqueue(next, newCost);
            cameFrom.set(next, current);
        }
    };

    bfsGeneric(graph,
        evalNeighbor,
        // In this version we optimize the next neighbour choice based on minimum cost priority.
        () => frontier.dequeue()?.[0],
        destination);

    return costSoFar;
}
