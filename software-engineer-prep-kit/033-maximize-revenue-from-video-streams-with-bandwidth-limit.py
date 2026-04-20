#!/bin/python3

import math
import os
import random
import re
import sys



#
# Complete the 'allocateBandwidthMaxRevenue' function below.
#
# The function is expected to return a DOUBLE.
# The function accepts following parameters:
#  1. INTEGER N
#  2. INTEGER_ARRAY sizes
#  3. INTEGER_ARRAY revenues
#  4. LONG_INTEGER B
#

def allocateBandwidthMaxRevenue(N, sizes, revenues, B):
    if N == 0 or B == 0:
        return 0.0
        
    profit = 0.0
    
    densities = {}
    for el in range(N):
        densities[el] = revenues[el] / sizes[el]
        
    densities = sorted(densities.items(), key=(lambda d: (-d[1], -sizes[d[0]])))
    
    for idx, density in densities:
        if B >= sizes[idx]:
            # enough left to just take entire thing
            B -= sizes[idx]
            profit += revenues[idx]
        else:
            # partial reduction
            profit += B*density
            B = 0
            
        if B==0:
            break
        
    return profit

if __name__ == '__main__':
    N = int(input().strip())

    sizes_count = int(input().strip())

    sizes = []

    for _ in range(sizes_count):
        sizes_item = int(input().strip())
        sizes.append(sizes_item)

    revenues_count = int(input().strip())

    revenues = []

    for _ in range(revenues_count):
        revenues_item = int(input().strip())
        revenues.append(revenues_item)

    B = int(input().strip())

    result = allocateBandwidthMaxRevenue(N, sizes, revenues, B)

    print(result)
