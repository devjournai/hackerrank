WITH RECURSIVE nums AS (
    SELECT 2 AS n
    UNION ALL
    SELECT n + 1 FROM nums WHERE n < 1000
),
primes AS (
    SELECT n
    FROM nums
    WHERE NOT EXISTS (
        SELECT 1 FROM nums d
        WHERE d.n < nums.n
          AND d.n > 1
          AND nums.n % d.n = 0
    )
)
SELECT GROUP_CONCAT(n SEPARATOR '&')
FROM primes;
