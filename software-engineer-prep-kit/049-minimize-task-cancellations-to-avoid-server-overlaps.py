#!/bin/python3

import math
import os
import random
import re
import sys



#
# Complete the 'minTasksToCancelForNoConflict' function below.
#
# The function is expected to return an INTEGER.
# The function accepts following parameters:
#  1. INTEGER n
#  2. INTEGER_ARRAY start_times
#  3. INTEGER_ARRAY end_times
#  4. 2D_INTEGER_ARRAY servers
#

def minTasksToCancelForNoConflict(n, start_times, end_times, servers):
    if n == 0:
        return 0

    tasks = []
    for i in range(n):
        tasks.append({
            'start': start_times[i],
            'end': end_times[i],
            'servers': servers[i]
        })
    
    tasks.sort(key=lambda x: x['end'])

    server_busy_until = {}
    kept_count = 0

    for task in tasks:
        start = task['start']
        end = task['end']
        req_servers = task['servers']
        
        can_schedule = True
        
        for s in req_servers:
            if s in server_busy_until and server_busy_until[s] > start:
                can_schedule = False
                break
        
        if can_schedule:
            kept_count += 1
            for s in req_servers:
                server_busy_until[s] = end

    return n - kept_count

if __name__ == '__main__':
    n = int(input().strip())

    start_times_count = int(input().strip())

    start_times = []

    for _ in range(start_times_count):
        start_times_item = int(input().strip())
        start_times.append(start_times_item)

    end_times_count = int(input().strip())

    end_times = []

    for _ in range(end_times_count):
        end_times_item = int(input().strip())
        end_times.append(end_times_item)

    servers_rows = int(input().strip())
    servers_columns = int(input().strip())

    servers = []

    for _ in range(servers_rows):
        servers.append(list(map(int, input().rstrip().split())))

    result = minTasksToCancelForNoConflict(n, start_times, end_times, servers)

    print(result)
