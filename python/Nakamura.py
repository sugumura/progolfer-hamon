import numpy as np

pp = [259,700]
pp=np.asarray(pp)
speed = 10
degree = 90
stars = []
stars.append([259,68,10])
stars.append([400,350,100000])
stars = np.asarray(stars)

def getPlayerVector(spd,deg):
	player_vector=[]
	player_vector.append(spd*np.cos(np.radians(deg)))
	player_vector.append(spd*np.sin(np.radians(deg)))
	return player_vector

def getCalculatedStarVectorToPlayer(star,ppoint):
	stars_vector = []
	stars_scholar = []
	stars_degree = []
	G = 1
	for num in range(len(star)):
		x = (star[num][0] - ppoint[0])
		y = (ppoint[1] - star[num][1])
		r = np.sqrt((x*x)+(y*y))
		r = r*r
		stars_scholar.append(star[num][2]/r)
		deg = np.arctan2(y,x)
		deg *= 180/np.pi
		if (deg < 0 and deg > -180):
			deg += 360 
		print(deg)
		stars_degree.append(deg)

		stars_vector.append([(stars_scholar[num]*np.cos(np.radians(stars_degree[num]))),(stars_scholar[num]*np.sin(np.radians(stars_degree[num])))])
	return stars_vector
pv = getPlayerVector(speed,degree)
print("%.10f" % pv[0])
print("%.10f" % pv[1])


sv = getCalculatedStarVectorToPlayer(stars,pp)
print("%.10f" % sv[0][0])
print("%.10f" % sv[1][0])
