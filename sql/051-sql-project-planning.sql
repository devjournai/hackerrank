SELECT 
    MIN(Start_Date) AS project_start,
    MAX(End_Date) AS project_end
FROM (
    SELECT 
        Start_Date,
        End_Date,
        DATE_SUB(Start_Date, INTERVAL ROW_NUMBER() OVER (ORDER BY Start_Date) DAY) AS grp
    FROM Projects
) t
GROUP BY grp
ORDER BY DATEDIFF(MAX(End_Date), MIN(Start_Date)), project_start;
