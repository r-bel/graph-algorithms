export class Queue<T> {

    private readonly items: T[] = [];

    enqueue(item: T): void {

        this.items.push(item);
    }

    dequeue(): T | undefined {

        return this.items.shift();
    }

    size(): number {
 
        return this.items.length;
    }
}