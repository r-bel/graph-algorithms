import { AdjacencyProvider } from "../generic-models/adjacencyProvider";
import { Edge } from "../generic-models/edge";

export class SimpleUndirectedGraph implements AdjacencyProvider {

    // edges are stored in two directions
    private readonly edges = new Map<number, Set<number>>();

    getAllAdjacent(source: number): number[] | undefined {

        if (!this.edges.has(source)) {

            return undefined;
        }

        if (this.edges.has(source)) {

            const destinations = this.edges.get(source);

            return destinations == null ? [] : Array.from(destinations.keys());
            
        } else {

            return [];
        }
    }

    setEdge(edge: Edge): void {

        const reflexive = edge.source === edge.destination;

        const foundBySource = this.edges.get(edge.source);
        const foundByDestination = this.edges.get(edge.destination);

        if (foundBySource != null) {

            if (!reflexive) foundBySource.add(edge.destination);

        } else {

            this.edges.set(edge.source, reflexive ? new Set() : new Set([edge.destination]));
        }

        if (foundByDestination != null) {

            if (!reflexive) foundByDestination.add(edge.source);

        } else {

            this.edges.set(edge.destination, reflexive ? new Set() : new Set([edge.source]));
        }
    }
}
