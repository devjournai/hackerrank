/**
 * Prime Pair Sets
 * Time Complexity: O(P^K)
 * Space Complexity: O(P + cache)
 */

const fs = require('fs');

function processData(input) {
    const lines = input.trim().split(/\s+/);
    if (lines.length < 2) return;
    const N = parseInt(lines[0]);
    const K = parseInt(lines[1]);

    const MAX_PRIME_TO_CONSIDER = 100000;
    const sieveLimit = Math.max(N, MAX_PRIME_TO_CONSIDER + 1000);
    const { isComposite, primesList } = sievePrimes(N, sieveLimit);

    const primeCache = new Map();
    const nprimes = primesList.length;

    const pow10 = new BigInt64Array(nprimes);
    for (let i = 0; i < nprimes; i++) {
        let p = primesList[i];
        let pwr = 1n;
        if (p === 0) {
            pwr = 10n;
        } else {
            let temp = p;
            while (temp > 0) {
                pwr *= 10n;
                temp = Math.floor(temp / 10);
            }
        }
        pow10[i] = pwr;
    }

    const comp = Array.from({ length: nprimes }, () => []);
    const compHS = Array.from({ length: nprimes }, () => new Set());

    for (let i = 0; i < nprimes; i++) {
        for (let j = i + 1; j < nprimes; j++) {
            const pI = BigInt(primesList[i]);
            const pJ = BigInt(primesList[j]);

            const concat1 = pI * pow10[j] + pJ;
            const concat2 = pJ * pow10[i] + pI;

            if (isConcatPrime(concat1, isComposite, primeCache)) {
                if (isConcatPrime(concat2, isComposite, primeCache)) {
                    comp[i].push(j);
                    compHS[i].add(j);
                }
            }
        }
    }

    const sums = [];
    const currentSet = [];

    for (let i = 0; i < nprimes; i++) {
        if (nprimes - i < K) break;

        currentSet.push(i);
        const candidates = [...comp[i]];
        search(comp, compHS, primesList, currentSet, candidates, K, sums);
        currentSet.pop();
    }

    sums.sort((a, b) => a < b ? -1 : 1).forEach(s => console.log(s.toString()));
};

function search(comp, compHS, primes, currentSet, candidates, K, sums) {
    if (currentSet.length === K) {
        let sum = 0n;
        for (let idx of currentSet) sum += BigInt(primes[idx]);
        sums.push(sum);
        return;
    }

    if (candidates.length < K - currentSet.length) return;

    for (let i = 0; i < candidates.length; i++) {
        const candidateIndex = candidates[i];
        const newCandidates = [];

        for (let j = i + 1; j < candidates.length; j++) {
            const nextCandidate = candidates[j];
            if (compHS[candidateIndex].has(nextCandidate)) {
                newCandidates.push(nextCandidate);
            }
        }

        if (newCandidates.length < K - (currentSet.length + 1)) continue;

        currentSet.push(candidateIndex);
        search(comp, compHS, primes, currentSet, newCandidates, K, sums);
        currentSet.pop();
    }
};

function sievePrimes(N, limit) {
    const isComposite = new Uint8Array(limit + 1);
    isComposite[0] = isComposite[1] = 1;
    for (let i = 2; i * i <= limit; i++) {
        if (!isComposite[i]) {
            for (let j = i * i; j <= limit; j += i) isComposite[j] = 1;
        }
    }
    const primesList = [];
    for (let i = 2; i <= N; i++) {
        if (!isComposite[i] && i <= 100000 && i !== 2 && i !== 5) {
            primesList.push(i);
        }
    }
    return { isComposite, primesList };
};

function isConcatPrime(x, sieve, cache) {
    if (cache.has(x)) return cache.get(x);

    let result;
    if (x < BigInt(sieve.length)) {
        result = sieve[Number(x)] === 0;
    } else {
        result = isPrimeMR(x);
    }

    cache.set(x, result);
    return result;
};

const MILLER_BASES = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];

function isPrimeMR(n) {
    if (n < 2n) return false;
    if (n === 2n || n === 3n) return true;
    if (n % 2n === 0n || n % 3n === 0n) return false;

    let d = n - 1n;
    let s = 0n;
    while (d % 2n === 0n) {
        d /= 2n;
        s++;
    }

    for (let a of MILLER_BASES) {
        if (a >= n) continue;
        let x = modPow(a, d, n);
        if (x === 1n || x === n - 1n) continue;

        let composite = true;
        for (let r = 1n; r < s; r++) {
            x = (x * x) % n;
            if (x === n - 1n) {
                composite = false;
                break;
            }
        }
        if (composite) return false;
    }
    return true;
};

function modPow(base, exp, mod) {
    let res = 1n;
    base %= mod;
    while (exp > 0n) {
        if (exp % 2n === 1n) res = (res * base) % mod;
        base = (base * base) % mod;
        exp /= 2n;
    }
    return res;
};

const data = fs.readFileSync(0, "utf8");
processData(data);