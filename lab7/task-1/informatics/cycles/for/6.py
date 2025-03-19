x = input()
s = ""
for i in x:
    if i != "0":
        s += i
print(s[::-1])