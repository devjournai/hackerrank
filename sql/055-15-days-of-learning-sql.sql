SELECT 
    s1.submission_date,

    (
        SELECT COUNT(DISTINCT s2.hacker_id)
        FROM Submissions s2
        WHERE s2.submission_date = s1.submission_date
          AND (
                SELECT COUNT(DISTINCT s3.submission_date)
                FROM Submissions s3
                WHERE s3.hacker_id = s2.hacker_id
                  AND s3.submission_date < s1.submission_date
              ) = DATEDIFF(s1.submission_date, '2016-03-01')
    ) AS active_hackers,

    (
        SELECT s2.hacker_id
        FROM Submissions s2
        WHERE s2.submission_date = s1.submission_date
        GROUP BY s2.hacker_id
        ORDER BY COUNT(s2.submission_id) DESC, s2.hacker_id
        LIMIT 1
    ) AS hacker_id,

    (
        SELECT h.name
        FROM Hackers h
        WHERE h.hacker_id = (
            SELECT s2.hacker_id
            FROM Submissions s2
            WHERE s2.submission_date = s1.submission_date
            GROUP BY s2.hacker_id
            ORDER BY COUNT(s2.submission_id) DESC, s2.hacker_id
            LIMIT 1
        )
    ) AS name

FROM (
    SELECT DISTINCT submission_date
    FROM Submissions
) s1
ORDER BY s1.submission_date;
