import { UnionFind } from "../dataStructures/unionFind";
import { ReadNodes, DistinctRoutesAdjacencyProvider } from "./models";

export const isCyclic = (graph: DistinctRoutesAdjacencyProvider<number> & ReadNodes) => {

    const unionFind = new UnionFind(graph.getNodes());

    let cycleFound = false;

    for (const vertex of graph.getNodes()) {

        if (cycleFound)
            break;

        const adjacentVertices = graph.getAdjacentFromSource(vertex);

        if (adjacentVertices == null) {
            break;
        }

        for (const adjacentVertex of adjacentVertices) {

            const x = unionFind.findRoot(vertex);
            const y = unionFind.findRoot(adjacentVertex);

            if (x === y) {
                cycleFound = true;
                break;
            } else {
                unionFind.union(x, y);
            }
        }
    }

    return cycleFound;
}
