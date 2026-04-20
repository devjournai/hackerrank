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
 * Complete the 'calculateMinimumSpanningTreeWeightWithFreeEdge' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. 2D_INTEGER_ARRAY edges
 */

function calculateMinimumSpanningTreeWeightWithFreeEdge(n, m, edges) {
    class DSU {
        constructor(n) {
            this.parent = Array.from({ length: n }, (_, i) => i);
            this.rank = Array(n).fill(0);
        }
        find(x) {
            if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
            return this.parent[x];
        }
        union(a, b) {
            a = this.find(a);
            b = this.find(b);
            if (a === b) return false;
            if (this.rank[a] < this.rank[b]) {
                this.parent[a] = b;
            } else if (this.rank[b] < this.rank[a]) {
                this.parent[b] = a;
            } else {
                this.parent[b] = a;
                this.rank[a]++;
            }
            return true;
        }
    }

    edges.sort((a, b) => a[2] - b[2]);

    const dsu = new DSU(n);
    let baseMST = 0;
    const mstAdj = Array.from({ length: n }, () => []);

    for (let [u, v, w] of edges) {
        if (dsu.union(u, v)) {
            baseMST += w;
            mstAdj[u].push([v, w]);
            mstAdj[v].push([u, w]);
        }
    }

    const LOG = 17;
    const parent = Array.from({ length: n }, () => Array(LOG).fill(-1));
    const maxEdge = Array.from({ length: n }, () => Array(LOG).fill(0));
    const depth = Array(n).fill(0);

    function dfs(node, par) {
        for (let [nei, w] of mstAdj[node]) {
            if (nei !== par) {
                parent[nei][0] = node;
                maxEdge[nei][0] = w;
                depth[nei] = depth[node] + 1;
                dfs(nei, node);
            }
        }
    }

    dfs(0, -1);

    for (let j = 1; j < LOG; j++) {
        for (let i = 0; i < n; i++) {
            if (parent[i][j - 1] !== -1) {
                parent[i][j] = parent[parent[i][j - 1]][j - 1];
                maxEdge[i][j] = Math.max(maxEdge[i][j - 1], maxEdge[parent[i][j - 1]][j - 1]);
            }
        }
    }

    function getMaxOnPath(u, v) {
        if (depth[u] < depth[v]) [u, v] = [v, u];
        let maxW = 0;

        let diff = depth[u] - depth[v];
        for (let k = 0; k < LOG; k++) {
            if (diff & (1 << k)) {
                maxW = Math.max(maxW, maxEdge[u][k]);
                u = parent[u][k];
            }
        }

        if (u === v) return maxW;

        for (let k = LOG - 1; k >= 0; k--) {
            if (parent[u][k] !== parent[v][k]) {
                maxW = Math.max(maxW, maxEdge[u][k], maxEdge[v][k]);
                u = parent[u][k];
                v = parent[v][k];
            }
        }

        return Math.max(maxW, maxEdge[u][0], maxEdge[v][0]);
    }

    let answer = baseMST;

    for (let [u, v, w] of edges) {
        const maxW = getMaxOnPath(u, v);
        answer = Math.min(answer, baseMST - maxW);
    }

    return answer;
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const m = parseInt(readLine().trim(), 10);

    const edgesRows = parseInt(readLine().trim(), 10);

    const edgesColumns = parseInt(readLine().trim(), 10);

    let edges = Array(edgesRows);

    for (let i = 0; i < edgesRows; i++) {
        edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
    }

    const result = calculateMinimumSpanningTreeWeightWithFreeEdge(n, m, edges);

    process.stdout.write(result + '\n');
}
