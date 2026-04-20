SELECT
    MAX(CASE WHEN Occupation = 'Doctor' THEN Name END),
    MAX(CASE WHEN Occupation = 'Professor' THEN Name END),
    MAX(CASE WHEN Occupation = 'Singer' THEN Name END),
    MAX(CASE WHEN Occupation = 'Actor' THEN Name END)
FROM (
    SELECT Name, Occupation,
           ROW_NUMBER() OVER (PARTITION BY Occupation ORDER BY Name) rn
    FROM OCCUPATIONS
) t
GROUP BY rn;
