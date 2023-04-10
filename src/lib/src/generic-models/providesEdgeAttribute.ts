export interface ProvidesEdgeAttribute<TNode = number, TEdge = number> {

    getEdge(source: TNode, destination: TNode): TEdge | null | undefined;
}
