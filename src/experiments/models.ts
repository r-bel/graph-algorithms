import { Edge } from "../generic-models/edge";

export interface CountNodes {

    nodeCount(): number;
}

export interface WeightedEdge<TWeight = number> extends Edge {

    weight: TWeight
}

export interface ReadNodes {

    getNodes(): Iterable<number>;
}

/**
 * This interface is defined to return every edge being queryable starting from only one of the two nodes.
 * This is important for undirected graph algorithms. For example to detect cycles in an undirected graph, two
 * sides should not return the same edge.
 */
export interface DistinctRoutesAdjacencyProvider<TNode = number> {

    getAdjacentFromSource(source: TNode): TNode[] | undefined;
}
