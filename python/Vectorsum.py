import numpy as np

def vectorsum(myship,stars):
    ans = 0
    ms = np.asarray(myship)
    for i in range(len(stars)):
        ans = stars[i] + ms
        ms = np.asarray(ans)
    return ans

myship = [0,10]#自機の座標
myship = np.asarray(myship)
stars = []#各星
stars.append([10,0])
stars.append([10,10])
stars.append([100,100])
stars = np.asarray(stars)
s = vectorsum(myship,stars)
print(s)
