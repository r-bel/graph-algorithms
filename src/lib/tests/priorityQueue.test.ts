import { HeapBasedPriorityQueue } from "../src/dataStructures/heapBasedPriorityQueue";

test('test max binary heap', () => {

    const heap = new HeapBasedPriorityQueue();

    expect(heap.peekRoot()).toBeUndefined();

    heap.enqueue(0, 9);
    heap.enqueue(1, 2);
    heap.enqueue(2, 3);
    heap.enqueue(3, 4);
    heap.enqueue(4, 6);
    heap.enqueue(5, 7);

    expect(heap.peekRoot()).toEqual([0, 9]);
    expect(heap.asArray()).toEqual([[0, 9], [4, 6], [5, 7], [1, 2], [3, 4], [2, 3]]);

    heap.enqueue(2, 5);
    heap.enqueue(2, 3);

    expect(heap.asArray()).toEqual([[0, 9], [4, 6], [5, 7], [1, 2], [3, 4], [2, 3]]);

    expect(heap.dequeue()).toEqual([0, 9]);
    expect(heap.dequeue()).toEqual([5, 7]);
    expect(heap.dequeue()).toEqual([4, 6]);
    expect(heap.dequeue()).toEqual([3, 4]);
    expect(heap.dequeue()).toEqual([2, 3]);
    expect(heap.dequeue()).toEqual([1, 2]);
    expect(heap.peekRoot()).toBeUndefined();
    expect(heap.dequeue()).toBeUndefined();
});

test('test edge case', () => {

    const heap = new HeapBasedPriorityQueue();

    heap.enqueue(0, 0);
    heap.dequeue();
    heap.enqueue(1, 0);

});

test('test min binary heap', () => {

    const heap = new HeapBasedPriorityQueue(false);

    expect(heap.peekRoot()).toBeUndefined();

    heap.enqueue(0, 9);
    heap.enqueue(1, 2);
    heap.enqueue(2, 3);
    heap.enqueue(3, 4);
    heap.enqueue(4, 6);
    heap.enqueue(5, 7);

    expect(heap.peekRoot()).toEqual([1, 2]);
});

