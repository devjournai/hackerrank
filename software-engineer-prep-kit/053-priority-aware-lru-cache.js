'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'simulatePriorityCache' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER capacity
 *  2. INTEGER numOperations
 *  3. STRING_ARRAY operationTypes
 *  4. INTEGER_ARRAY keys
 *  5. INTEGER_ARRAY values
 *  6. INTEGER_ARRAY priorities
 */

class Node {
    constructor(key, value, priority) {
        this.key = key;
        this.value = value;
        this.priority = priority;
        this.prev = null;
        this.next = null;
    }
}

class DoublyList {
    constructor() {
        this.head = new Node(null, null, null);
        this.tail = new Node(null, null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    addToHead(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    removeTail() {
        if (this.tail.prev === this.head) return null;
        const removed = this.tail.prev;
        this.remove(removed);
        return removed;
    }

    isEmpty() {
        return this.head.next === this.tail;
    }
}

function simulatePriorityCache(capacity, numOperations, operationTypes, keys, values, priorities) {
    if (capacity === 0) return [];

    const cache = new Map();
    const priorityMap = new Map();
    const activePriorities = new Set();
    let minPriority = Infinity;
    
    const output = [];

    const ensurePriorityList = (priority) => {
        if (!priorityMap.has(priority)) {
            priorityMap.set(priority, new DoublyList());
        }
    };

    const updateMinPriority = () => {
        if (!activePriorities.size) {
            minPriority = Infinity;
            return;
        }
        minPriority = Math.min(...activePriorities);
    };

    const moveToHead = (node) => {
        const list = priorityMap.get(node.priority);
        list.remove(node);
        list.addToHead(node);
    };

    const evict = () => {
        updateMinPriority();
        const list = priorityMap.get(minPriority);
        const removed = list.removeTail();
        cache.delete(removed.key);

        if (list.isEmpty()) {
            priorityMap.delete(minPriority);
            activePriorities.delete(minPriority);
            updateMinPriority();
        }
    };

    for (let i = 0; i < numOperations; i++) {
        const op = operationTypes[i];
        const key = keys[i];

        if (op === "get") {
            if (!cache.has(key)) {
                output.push(-1);
            } else {
                const node = cache.get(key);
                moveToHead(node);
                output.push(node.value);
            }

        } else if (op === "put") {
            const value = values[i];
            const priority = priorities[i];

            if (cache.has(key)) {
                const node = cache.get(key);
                node.value = value;
                moveToHead(node);

            } else {
                if (cache.size === capacity) evict();

                const newNode = new Node(key, value, priority);
                ensurePriorityList(priority);
                priorityMap.get(priority).addToHead(newNode);
                cache.set(key, newNode);
                activePriorities.add(priority);

                if (priority < minPriority) minPriority = priority;
            }

        } else if (op === "updatePriority") {
            const newPriority = priorities[i];
            if (!cache.has(key)) continue;

            const node = cache.get(key);
            const oldPriority = node.priority;

            const oldList = priorityMap.get(oldPriority);
            oldList.remove(node);
            if (oldList.isEmpty()) {
                priorityMap.delete(oldPriority);
                activePriorities.delete(oldPriority);
                if (oldPriority === minPriority) updateMinPriority();
            }

            node.priority = newPriority;
            ensurePriorityList(newPriority);
            priorityMap.get(newPriority).addToHead(node);
            activePriorities.add(newPriority);
            if (newPriority < minPriority) minPriority = newPriority;
        }
    }

    return output;
}

function main() {
    const capacity = parseInt(readLine().trim(), 10);

    const numOperations = parseInt(readLine().trim(), 10);

    const operationTypesCount = parseInt(readLine().trim(), 10);

    let operationTypes = [];

    for (let i = 0; i < operationTypesCount; i++) {
        const operationTypesItem = readLine();
        operationTypes.push(operationTypesItem);
    }

    const keysCount = parseInt(readLine().trim(), 10);

    let keys = [];

    for (let i = 0; i < keysCount; i++) {
        const keysItem = parseInt(readLine().trim(), 10);
        keys.push(keysItem);
    }

    const valuesCount = parseInt(readLine().trim(), 10);

    let values = [];

    for (let i = 0; i < valuesCount; i++) {
        const valuesItem = parseInt(readLine().trim(), 10);
        values.push(valuesItem);
    }

    const prioritiesCount = parseInt(readLine().trim(), 10);

    let priorities = [];

    for (let i = 0; i < prioritiesCount; i++) {
        const prioritiesItem = parseInt(readLine().trim(), 10);
        priorities.push(prioritiesItem);
    }

    const result = simulatePriorityCache(capacity, numOperations, operationTypes, keys, values, priorities);

    process.stdout.write(result.join('\n') + '\n');
}
