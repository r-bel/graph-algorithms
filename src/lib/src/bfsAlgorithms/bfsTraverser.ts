import { Queue } from "../dataStructures/queue";
import { AdjacencyProvider } from "../generic-models/adjacencyProvider";
import { bfsGeneric } from "./bfsGeneric";

/** Based on a BFS algorithm a graph will be traversed */
export const bfsTraverser = (originalGraph: AdjacencyProvider, start: number, destination?: number): IterableIterator<number> => {

    const reached = new Set<number>();
    const frontier = new Queue<number>();

    reached.add(start);
    frontier.enqueue(start);

    const evalNeighbor = (next: number) => {

        if (!reached.has(next)) {
            frontier.enqueue(next);
            reached.add(next);
        }
    };

    bfsGeneric(originalGraph, evalNeighbor,
        () => frontier.dequeue(),
        destination);

    return reached.values();
}
