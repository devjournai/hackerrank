#!/bin/python3

import math
import os
import random
import re
import sys


from collections import Counter

def calculateMinimumTimeUnits(tasks, m, k):
    if not tasks:
        return 0

    n = len(tasks)
    freq = Counter(tasks)

    left = (n + m - 1) // m

    max_freq = max(freq.values())
    right = max(left, (max_freq - 1) * (k + 1) + n)

    def can_schedule(T):
        if k > 0:
            max_per_task = m * (1 + (T - 1) // (k + 1))
        else:
            max_per_task = T * m

        for f in freq.values():
            if f > max_per_task:
                return False

        total_slots = T * m
        return total_slots >= n

    result = right
    while left <= right:
        mid = (left + right) // 2
        if can_schedule(mid):
            result = mid
            right = mid - 1
        else:
            left = mid + 1

    return result

if __name__ == '__main__':
    tasks_count = int(input().strip())

    tasks = []

    for _ in range(tasks_count):
        tasks_item = int(input().strip())
        tasks.append(tasks_item)

    m = int(input().strip())

    k = int(input().strip())

    result = calculateMinimumTimeUnits(tasks, m, k)

    print(result)
