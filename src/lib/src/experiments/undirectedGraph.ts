import { Edge } from "../generic-models/edge";
import { ReadNodes, DistinctRoutesAdjacencyProvider } from "./models";

export class UndirectedGraph<TEdge = number> implements ReadNodes, DistinctRoutesAdjacencyProvider<number> {

    private readonly edges = new Map<number, Map<number, TEdge | null>>();
    private readonly nodes = new Set<number>();

    getAdjacentFromSource(source: number): number[] | undefined {

        if (!this.nodes.has(source)) {

            return undefined;
        }

        if (this.edges.has(source)) {

            const destinations = this.edges.get(source);

            return destinations == null ? [] : Array.from(destinations.keys());
        } else {

            return [];
        }
    }

    getNodes(): Iterable<number> {

        return this.nodes;
    }

    getEdge(source: number, destination: number): TEdge | null | undefined {

        const destinations = this.edges.get(source);

        return destinations?.get(destination);
    }

    setEdge(edge: Edge, edgeAttribute: TEdge | null = null): void {

        this.nodes.add(edge.source);
        this.nodes.add(edge.destination);

        if (edge.source === edge.destination)
            return;

        const foundBySource = this.edges.get(edge.source);
        const foundByDestination = this.edges.get(edge.destination);

        if (foundBySource != null && foundBySource.has(edge.destination)) {

            foundBySource.set(edge.destination, edgeAttribute);

        } else if (foundByDestination != null && foundByDestination.has(edge.source)) {

            foundByDestination.set(edge.source, edgeAttribute);

        } else {

            if (foundBySource != null) {
                foundBySource.set(edge.destination, edgeAttribute);
            } else {
                this.edges.set(edge.source, new Map([[edge.destination, edgeAttribute]]));
            }
        }
    }

    * getEdges(): Iterable<Edge> {

        for (const [source, destinations] of this.edges.entries()) {
            for (const destination of destinations.keys()) {
                yield {
                    source, destination
                }
            }
        }
    }
}
