import { Edge } from "../generic-models/edge";
import { MstGraph } from "./mstGraph";
import { isCyclic } from "./isCyclic";
import { WeightedEdge } from "./models";

export const kruskal = (weightedEdges: WeightedEdge[], vertexCount: number): IterableIterator<Edge> => {

    const edgesSorted = weightedEdges.sort((edgeA, edgeB) => edgeA.weight - edgeB.weight);

    const edgeWidthLowestWeight = edgesSorted[0];

    const minimalSpanningTree = new MstGraph<number>(false);

    minimalSpanningTree.setEdge(edgeWidthLowestWeight);    

    let i = 1;

    while (minimalSpanningTree.edgeCount() < vertexCount - 1 && i < edgesSorted.length) {

        minimalSpanningTree.setEdge(edgesSorted[i]);

        if (isCyclic(minimalSpanningTree)) {
            minimalSpanningTree.removeEdge(edgesSorted[i]);
        }

        i++;
    }

    return minimalSpanningTree.getEdges();
}
