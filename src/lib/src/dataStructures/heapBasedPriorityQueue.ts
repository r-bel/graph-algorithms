export class HeapBasedPriorityQueue<K = number> {

    // store as array of tuples with resp value and priority
    private readonly elements: [K, number][] = [];
    // to retrieve the index for a key we maintain a Map
    private readonly indexMapByKey = new Map<K, number>();

    constructor(private readonly useMax = true) { }

    enqueue(key: K, priority: number): void {

        if (this.indexMapByKey.has(key)) {

            this.changePriority(key, priority);

        } else {

            // push new tuple to the end of the array
            const index = this.elements.push([key, priority]) - 1;
            this.indexMapByKey.set(key, index);

            this.bubbleUp(index);
        }
    }

    peekRoot(): [K, number] | undefined {

        return this.elements?.[0];
    }

    dequeue(): [K, number] | undefined {

        if (this.elements.length === 0) {
            return undefined;
        }

        const max = this.elements[0];
        const lastItem = this.elements.pop();

        if (lastItem !== undefined)
            this.indexMapByKey.delete(lastItem[0]);

        if (this.elements.length === 0) {
            return max;
        }

        if (lastItem !== undefined) {
            this.indexMapByKey.delete(this.elements[0][0]);
            this.elements[0] = lastItem;
            this.indexMapByKey.set(lastItem[0], 0);
        }

        this.sinkDown(0);

        return max;
    }

    asArray = () => this.elements;

    private bubbleUp(index: number): number {

        let parent = this.parentIndex(index);

        // Loop up through the tree until the item at index is on the right position.
        // So while the elements priority is larger than its parent.
        while (parent > -1 && (this.useMax ? this.elements[parent][1] < this.elements[index][1] : this.elements[parent][1] > this.elements[index][1])) {

            // Update the index map
            this.indexMapByKey.set(this.elements[index][0], parent);
            this.indexMapByKey.set(this.elements[parent][0], index);

            // Swap with the parent.
            [this.elements[index], this.elements[parent]] = [this.elements[parent], this.elements[index]];

            index = parent;
            parent = this.parentIndex(parent);
        }

        return index;
    }

    private changePriority(key: K, priority: number): void {

        let index = this.indexMapByKey.get(key);

        if (index !== undefined) {

            this.elements[index][1] = priority;

            index = this.bubbleUp(index);

            this.sinkDown(index);
        }
    }

    private readonly parentIndex = (index: number) => Math.floor((index - 1) / 2);

    private sinkDown(index: number) {

        const valueToSink = this.elements[index];

        let parent = index;
        const endlessly = true;
        while (endlessly) {

            const left = (2 * parent) + 1;
            const right = (2 * parent) + 2;

            if (left >= this.elements.length)
                return;

            const swapWithLeft = this.useMax ?
                valueToSink[1] < this.elements[left][1] && (right >= this.elements.length || this.elements[left][1] > this.elements[right][1])
                :
                valueToSink[1] > this.elements[left][1] && (right >= this.elements.length || this.elements[left][1] < this.elements[right][1]);

            const swapWithRight = this.useMax ?
                right < this.elements.length && valueToSink[1] < this.elements[right]?.[1]
                :
                right < this.elements.length && valueToSink[1] > this.elements[right]?.[1];

            if (swapWithLeft) {

                this.elements[parent] = this.elements[left];
                this.elements[left] = valueToSink;
                this.indexMapByKey.set(this.elements[left][0], parent);
                this.indexMapByKey.set(valueToSink[0], left);

                parent = left;

            } else if (swapWithRight) {

                this.elements[parent] = this.elements[right];
                this.elements[right] = valueToSink;
                this.indexMapByKey.set(this.elements[right][0], parent);
                this.indexMapByKey.set(valueToSink[0], right);

                parent = right;

            } else {

                return;
            }
        }
    }
}
