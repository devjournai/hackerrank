/**
 * Path Sum Four Ways
 * Time Complexity: O(N² log N)
 * Space Complexity: O(N²)
 */

function processData(input) {
    const lines = input.trim().split('\n');
    let idx = 0;

    const N = parseInt(lines[idx++], 10);
    const matrix = [];

    for (let i = 0; i < N; i++) {
        matrix.push(lines[idx++].trim().split(' ').map(BigInt));
    }

    const INF = 10n ** 30n;

    const dist = Array.from({ length: N }, () =>
        Array(N).fill(INF)
    );

    class MinHeap {
        constructor() {
            this.heap = [];
        }

        push(item) {
            this.heap.push(item);
            this._bubbleUp(this.heap.length - 1);
        }

        pop() {
            const min = this.heap[0];
            const last = this.heap.pop();
            if (this.heap.length > 0) {
                this.heap[0] = last;
                this._bubbleDown(0);
            }
            return min;
        }

        _bubbleUp(i) {
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (this.heap[p][0] <= this.heap[i][0]) break;
                [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
                i = p;
            }
        }

        _bubbleDown(i) {
            const n = this.heap.length;
            while (true) {
                let smallest = i;
                const l = i * 2 + 1;
                const r = i * 2 + 2;

                if (l < n && this.heap[l][0] < this.heap[smallest][0]) {
                    smallest = l;
                }
                if (r < n && this.heap[r][0] < this.heap[smallest][0]) {
                    smallest = r;
                }
                if (smallest === i) break;
                [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
                i = smallest;
            }
        }

        isEmpty() {
            return this.heap.length === 0;
        }
    }

    const pq = new MinHeap();
    dist[0][0] = matrix[0][0];
    pq.push([dist[0][0], 0, 0]);

    const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];

    while (!pq.isEmpty()) {
        const [cost, x, y] = pq.pop();

        if (cost > dist[x][y]) continue;
        if (x === N - 1 && y === N - 1) break;

        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
                const newCost = cost + matrix[nx][ny];
                if (newCost < dist[nx][ny]) {
                    dist[nx][ny] = newCost;
                    pq.push([newCost, nx, ny]);
                }
            }
        }
    }

    console.log(dist[N - 1][N - 1].toString());
};

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});
process.stdin.on("end", function () {
    processData(_input);
});