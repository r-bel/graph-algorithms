import { bfsGeneric } from "./bfsGeneric";
import { HeapBasedPriorityQueue } from "../dataStructures/heapBasedPriorityQueue";
import { AdjacencyProvider } from "../generic-models/adjacencyProvider";

/**
 * Uniform Cost Search algorithm aka Dijkstra's algorithm
 */
export const greedyBfs = (graph: AdjacencyProvider, heuristic: (x: number, y: number) => number, start: number, destination?: number): void => {

    const cameFrom = new Set<number>();
    const frontier = new HeapBasedPriorityQueue<number>();

    cameFrom.add(start);
    frontier.enqueue(start, 0);

    const evalNeighbor = (next: number, current: number | null) => {

        const hasReached = cameFrom.has(next);

        if (!(hasReached)) {
            const priority = heuristic(destination!, next);
            frontier.enqueue(next, priority);
            cameFrom.add(next);
        }
    };

    bfsGeneric(graph,
        evalNeighbor,
        () => frontier.dequeue()?.[0],
        destination);

}