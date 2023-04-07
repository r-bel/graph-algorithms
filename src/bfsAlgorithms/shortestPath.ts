import { Queue } from "../dataStructures/queue";
import { AdjacencyProvider } from "../generic-models/adjacencyProvider";
import { bfsGeneric } from "./bfsGeneric";

export const shortestPath = (originalGraph: AdjacencyProvider, start: number, destination?: number): Map<number, number | null> => {

    const cameFrom = new Map<number, number | null>();
    const frontier = new Queue<number>();

    cameFrom.set(start, null);
    frontier.enqueue(start);

    const evalNeighbor = (next: number, current: number | null) => {

        if (!cameFrom.has(next)) {
            frontier.enqueue(next);
            cameFrom.set(next, current);
        }
    };

    bfsGeneric(originalGraph,
        evalNeighbor,
        () => frontier.dequeue(),
        destination);

    return cameFrom;
}