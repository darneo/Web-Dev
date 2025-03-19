def no_teen_sum(a, b, c):
  return teen(a) + teen(b) + teen(c)
 
def teen(n):
  if 13 <= n <= 14 or 17 <= n <= 19:
    return 0
  return n