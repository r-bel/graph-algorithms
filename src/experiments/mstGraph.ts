import { Edge } from "../generic-models/edge";
import { ReadNodes, DistinctRoutesAdjacencyProvider } from "./models";

export class MstGraph<TEdge = number> implements DistinctRoutesAdjacencyProvider<number>, ReadNodes {

    private readonly edges = new Map<number, Map<number, TEdge | null>>();

    constructor(public readonly undirected: boolean = false) { }

    getNodes(): Iterable<number> {

        return this.edges.keys();
    }

    * getEdges() {

        for (const edge of this.edges.entries()) {
            for (const v of edge[1].keys()) {
                yield {
                    source: edge[0],
                    destination: v
                };
            }
        }
    }

    setEdge(edge: Edge, edgeAttribute: TEdge | null = null): void {

        let adjacentDestinations = this.edges.get(edge.source);

        if (adjacentDestinations == null) {

            adjacentDestinations = new Map<number, TEdge>;

            this.edges.set(edge.source, adjacentDestinations);
        }

        adjacentDestinations.set(edge.destination, edgeAttribute);

        adjacentDestinations = this.edges.get(edge.destination);

        if (adjacentDestinations == null) {

            adjacentDestinations = new Map<number, TEdge>;

            this.edges.set(edge.destination, adjacentDestinations);
        }

        if (this.undirected) {
            adjacentDestinations.set(edge.source, edgeAttribute);
        }
    }

    removeEdge(edge: Edge): void {

        const adjacentDestinations = this.edges.get(edge.source);

        adjacentDestinations?.delete(edge.destination);

        if (this.undirected) {

            const adjacentDestinations = this.edges.get(edge.destination);

            adjacentDestinations?.delete(edge.source);
        }
    }

    edgeCount = () => [...this.edges.values()].reduce((sum, current) => sum + current.size, 0);

    getAdjacentFromSource(source: number): number[] | undefined {

        if (!this.edges.has(source)) {

            return undefined;
        }

        const destinations = this.edges.get(source);

        return destinations == null ? [] : Array.from(destinations.keys());
    }
}
