SELECT ROUND(LAT_N, 4)
FROM (
    SELECT LAT_N,
           ROW_NUMBER() OVER (ORDER BY LAT_N) rn,
           COUNT(*) OVER () cnt
    FROM STATION
) t
WHERE rn = (cnt + 1) / 2;
