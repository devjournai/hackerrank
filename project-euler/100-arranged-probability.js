process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});

function processData(input) {
    const lines = input.trim().split(/\s+/); // Split by any whitespace
    let lineIdx = 0;
    
    const T = parseInt(lines[lineIdx++]);
    
    for (let t = 0; t < T; t++) {
        const P = BigInt(lines[lineIdx++]);
        const Q = BigInt(lines[lineIdx++]);
        const D = BigInt(lines[lineIdx++]);
        
        solve(P, Q, D);
    }
}

function solve(P, Q, D) {
    // 1. Reduce Fraction P/Q
    const common = gcd(P, Q);
    P = P / common;
    Q = Q / common;

    // 2. Setup Diophantine: P*X^2 - Q*Y^2 = P - Q
    // Let determinant Det = P*Q
    const Det = P * Q;
    const K = P - Q; // The RHS constant derived from P(2n-1)^2 - Q(2b-1)^2

    // Check if Det is a perfect square
    const sqrtDet = sqrtBigInt(Det);
    if (sqrtDet * sqrtDet === Det) {
        solveSquareCase(P, Q, D, sqrtDet);
    } else {
        solvePellCase(P, Q, D, Det, K);
    }
}

// Case where P*Q is a perfect square (Difference of Squares)
function solveSquareCase(P, Q, D, S) {
    // Equation: (PX - SY)(PX + SY) = P(P - Q) = Target
    // Since P < Q, Target is negative. 
    // Let's rewrite: (SY - PX)(SY + PX) = P(Q - P) = Target (Positive now)
    
    const Target = P * (Q - P);
    
    // We need to find factors u * v = Target such that u <= v
    // Then SY - PX = u, SY + PX = v
    // 2*SY = u + v  => Y = (u+v)/2S
    // 2*PX = v - u  => X = (v-u)/2P
    // Constraints: (u+v) % 2S == 0, (v-u) % 2P == 0, Y odd, X odd.
    // Also n = (X+1)/2 > D.
    
    // Optimization:
    // Max n occurs when u is minimized (u=1). 
    // Approx max 2PX approx v approx Target. 
    // Max X approx Target/2P = (Q-P)/2.
    // Max n approx (Q-P)/4. 
    // Since Q <= 10^7, max n is around 2.5*10^6.
    // If D > 2.5*10^6, it's likely "No solution". 
    // We iterate u from 1 up to sqrt(Target).
    
    let bestN = null;
    let bestB = null;

    // Iterate factors
    // Since Target can be up to ~10^14, we iterate u up to 10^7. Feasible.
    const limit = sqrtBigInt(Target);
    
    for (let u = 1n; u <= limit; u++) {
        if (Target % u === 0n) {
            const v = Target / u;
            
            // Check if solution exists for pair (u, v)
            checkSquareSol(u, v, P, S, D);
        }
    }
    
    function checkSquareSol(u, v, P, S, D) {
        // 2*PX = v - u
        const v_minus_u = v - u;
        const twoP = 2n * P;
        
        if (v_minus_u % twoP !== 0n) return;
        const X = v_minus_u / twoP;
        
        // 2*SY = u + v
        const v_plus_u = v + u;
        const twoS = 2n * S;
        
        if (v_plus_u % twoS !== 0n) return;
        const Y = v_plus_u / twoS;
        
        // Check odd parity (variable substitution requirement)
        if (X % 2n === 0n || Y % 2n === 0n) return;
        
        const n = (X + 1n) / 2n;
        const b = (Y + 1n) / 2n;
        
        if (n > D) {
            if (bestN === null || n < bestN) {
                bestN = n;
                bestB = b;
            }
        }
    }

    if (bestN !== null) {
        console.log(bestB.toString() + " " + bestN.toString());
    } else {
        console.log("No solution");
    }
}

// Case where P*Q is not a square (Pell Equation)
function solvePellCase(P, Q, D, Det, K) {
    // 1. Find fundamental solution (r, s) to r^2 - Det*s^2 = 1
    const fund = getFundamentalPell(Det);
    if (!fund) {
        // Should not happen for non-square Det
        console.log("No solution");
        return;
    }
    
    const r = fund.x;
    const s = fund.y;

    // 2. Generate solutions from two seeds:
    // Seed 1: (1, 1) -> Represents trivial solution n=1, b=1
    // Seed 2: (1, -1) -> Represents conjugate class
    
    let sol1 = findFirstValid(1n, 1n, r, s, P, Q, D);
    let sol2 = findFirstValid(1n, -1n, r, s, P, Q, D);
    
    // Select the best valid solution
    let finalN = null;
    let finalB = null;
    
    if (sol1 && sol2) {
        if (sol1.n < sol2.n) {
            finalN = sol1.n; finalB = sol1.b;
        } else {
            finalN = sol2.n; finalB = sol2.b;
        }
    } else if (sol1) {
        finalN = sol1.n; finalB = sol1.b;
    } else if (sol2) {
        finalN = sol2.n; finalB = sol2.b;
    }
    
    if (finalN !== null) {
        console.log(finalB.toString() + " " + finalN.toString());
    } else {
        console.log("No solution");
    }
}

// Finds the first solution in a recurrence chain where n > D
function findFirstValid(x0, y0, r, s, P, Q, limitD) {
    let x = x0;
    let y = y0;
    
    // Recurrence:
    // x_new = x*r + y*s*Q
    // y_new = y*r + x*s*P
    
    // We iterate until we find a solution > D.
    // If numbers get absurdly large without match, we break (though math guarantees eventual growth).
    
    while (true) {
        // Calculate next terms
        let x_next = x * r + y * s * Q;
        let y_next = y * r + x * s * P;
        
        x = x_next;
        y = y_next;
        
        // Check validity
        // X must be odd (2n-1) and Y must be odd (2b-1)
        // Also X must be positive for valid n > 0.
        // In the (1, -1) branch, X can be negative initially. We take abs(X) because (-X)^2 = X^2.
        
        let absX = x < 0n ? -x : x;
        let absY = y < 0n ? -y : y;
        
        if (absX % 2n !== 0n && absY % 2n !== 0n) {
            let n = (absX + 1n) / 2n;
            let b = (absY + 1n) / 2n;
            
            if (n > limitD) {
                return { n: n, b: b };
            }
        }
        
        // Safety break for extremely large numbers (solving for limitD ~ 10^15 usually takes few steps)
        // If n exceeds limitD significantly, we might have skipped? 
        // No, we check every step. If we just found one > limitD, we return it immediately.
        // Just need to ensure we don't overflow memory or loop forever if logic is wrong.
        if (absX > limitD * 100n && absX > 10n**20n) { 
             // If we are way past D and haven't returned, something is odd, 
             // but usually the first valid one > D is caught.
             // For safety, if we found nothing valid and are super huge, stop.
             return null; 
        }
    }
}

// Continued Fraction algorithm to find fundamental solution to x^2 - Dy^2 = 1
function getFundamentalPell(D) {
    let m = 0n;
    let d = 1n;
    let a = sqrtBigInt(D);
    
    let a0 = a;
    if (a * a === D) return null; // Should be handled by square case check
    
    let h1 = 1n, h2 = 0n;
    let k1 = 0n, k2 = 1n;
    
    // Standard convergent recurrence
    while (true) {
        // Update convergents
        // h_next = a * h1 + h2
        // k_next = a * k1 + k2
        let h = a * h1 + h2;
        let k = a * k1 + k2;
        
        // Check Pell equation: h^2 - D*k^2 = 1
        if (h * h - D * k * k === 1n) {
            return { x: h, y: k };
        }
        
        // Shift for next iteration
        h2 = h1; h1 = h;
        k2 = k1; k1 = k;
        
        // Update continued fraction terms
        m = d * a - m;
        d = (D - m * m) / d;
        a = (a0 + m) / d;
    }
}

// Helper: Integer Square Root for BigInt
function sqrtBigInt(value) {
    if (value < 0n) return 0n; // Error handling
    if (value < 2n) return value;
    
    let x0 = value;
    let x1 = (x0 + value / x0) / 2n;
    
    while (x1 < x0) {
        x0 = x1;
        x1 = (x0 + value / x0) / 2n;
    }
    return x0;
}

// Helper: GCD for BigInt
function gcd(a, b) {
    while (b > 0n) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}