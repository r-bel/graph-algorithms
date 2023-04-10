import { bfsGeneric } from "./bfsGeneric";
import { HeapBasedPriorityQueue } from "../dataStructures/heapBasedPriorityQueue";
import { AdjacencyProvider } from "../generic-models/adjacencyProvider";
import { ProvidesEdgeAttribute } from "../generic-models/providesEdgeAttribute";

/**
 * Uniform Cost Search algorithm aka Dijkstra's algorithm
 */
export const aStar = (graph: AdjacencyProvider, 
    edgeCostProvider: ProvidesEdgeAttribute<number, number>, 
    heuristic: (x: number, y: number) => number, start: number, destination?: number): Map<number, number | null>  => {

    const cameFrom = new Set<number>();
    const frontier = new HeapBasedPriorityQueue<number>();
    const costSoFar = new Map<number, number | null>();

    cameFrom.add(start);
    frontier.enqueue(start, 0);
    costSoFar.set(start, 0);

    const evalNeighbor = (next: number, current: number | null) => {

        const hasReached = cameFrom.has(next);

        const oldCost = costSoFar.get(next) ?? 0;

        const newCost = costSoFar.get(current!)! + edgeCostProvider.getEdge(current!, next)!;

        if (!(hasReached)) {
            const priority = heuristic(destination!, next);
            costSoFar.set(next, newCost + priority);
            frontier.enqueue(next, priority);
            cameFrom.add(next);
        }
    };

    bfsGeneric(graph,
        evalNeighbor,
        () => frontier.dequeue()?.[0],
        destination);

        return costSoFar;
}