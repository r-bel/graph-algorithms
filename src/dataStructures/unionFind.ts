export class UnionFind {

    private readonly disjointSet = new Map<number, number>();

    constructor(nodes: Iterable<number>) {

        for (const vertex of nodes) {

            this.disjointSet.set(vertex, vertex);
        }
    }

    findRoot(node: number) {

        let rootNodeCandidate: number = node;

        while (this.disjointSet.get(rootNodeCandidate) !== rootNodeCandidate) {

            const c = this.disjointSet.get(rootNodeCandidate);
            if (c != null)
                rootNodeCandidate = c;
        }

        return rootNodeCandidate;
    }

    union(u: number, v: number) {

        const x = this.findRoot(u);
        const y = this.findRoot(v);

        this.disjointSet.set(x, y);
    }
}