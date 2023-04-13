export interface AdjacencyProvider {

    getAllAdjacent(source: number): number[] | undefined;
}
