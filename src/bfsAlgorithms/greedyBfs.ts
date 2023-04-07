import { bfsGeneric } from "./bfsGeneric";
import { HeapBasedPriorityQueue } from "../dataStructures/heapBasedPriorityQueue";
import { AdjacencyProvider } from "../generic-models/adjacencyProvider";

/**
 * Uniform Cost Search algorithm aka Dijkstra's algorithm
 */
export const greedyBfs = (graph: AdjacencyProvider, heuristic: (x: number, y: number) => number, start: number, destination?: number): Map<number, number | null> => {

    const cameFrom = new Map<number, number | null>();
    const frontier = new HeapBasedPriorityQueue<number>();
    const costSoFar = new Map<number, number | null>();

    cameFrom.set(start, null);
    frontier.enqueue(start, 0);
    costSoFar.set(start, 0);

    const evalNeighbor = (next: number, current: number | null) => {

        const hasReached = cameFrom.has(next);

        if (!(hasReached)) {
            const priority = heuristic(destination!, next);
            frontier.enqueue(next, priority);
            cameFrom.set(next, current);
        }
    };

    bfsGeneric(graph,
        evalNeighbor,
        () => frontier.dequeue()?.[0],
        destination);

    return costSoFar;
}