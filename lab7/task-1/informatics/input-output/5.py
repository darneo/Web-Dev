import math
a = int(input())
b = int(input())

if a % 109 : 
    print(0)
else :
    if b > 0 : 
        print(a*b % 109)
    else :     
        print(109 - abs(a*b) % 109 )