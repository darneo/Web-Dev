def sum67(nums):
    flag = True
    sm = 0
    for n in nums:
        if n == 6:
            flag = False
        if flag:
            sm += n
            continue
        if n == 7:
            flag = True
    return sm