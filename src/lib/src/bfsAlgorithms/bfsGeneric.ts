import { AdjacencyProvider } from "../generic-models/adjacencyProvider";

/** Generic BFS graph visitor
 * Purely a breadth first search algorithm which is the base of many graph algorithms.
 * This contains only the strategy and relies on lambdas for injecting concrete use. 
*/
export const bfsGeneric = (
    adjacencyProvider: AdjacencyProvider,
    evalNeighbour: (next: number, current: number | null) => void,
    getNextUnvisitedNode: () => number | undefined,
    destination?: number) => {

    const endlessly = true;

    while (endlessly) {        

        const current = getNextUnvisitedNode();

        // When all are visited or destination is reached which is the exit condition.
        if (current == null || current === destination)
            break;

        // Now get all adjacent nodes
        const neighbours = adjacencyProvider.getAllAdjacent(current);

        // Start for each adjacent node the state updating algorithm
        // which is injected.
        neighbours?.forEach(neighbour => {
            evalNeighbour(neighbour, current);
        })
    }
}