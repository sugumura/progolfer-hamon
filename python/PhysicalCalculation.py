# -*- coding: utf-8 -*-
import numpy as np
import Progolferhamon
def getPlayerVector(spd,deg):
    player_vector=[]
    player_vector.append(spd*np.cos(np.radians(deg)))
    player_vector.append(spd*np.sin(np.radians(deg)))
    player_vector = np.asarray(player_vector)
    return player_vector

def getCalculatedStarVectorToPlayer(ppoint,star):
    stars_vector = []
    stars_scholar = []
    stars_degree = []
    G = 1
    for num in range(len(star)):
        deg = 0
        x = (star[num][0] - ppoint[0])
        y = (ppoint[1] - star[num][1])
        r = np.sqrt((x*x)+(y*y))
        r = r*r
        stars_scholar.append(star[num][2]/r)
        deg = np.arctan2(y,x)
        deg *= 180/np.pi
        #print("deg",deg)
        if (deg < 0.0 and deg > -180.0):
            deg += 360 
            #print(deg)
        stars_degree.append(deg)
        stars_vector.append([(stars_scholar[num]*np.cos(np.radians(stars_degree[num]))),(stars_scholar[num]*np.sin(np.radians(stars_degree[num])))])
    stars_vector = np.asarray(stars_vector)
    return stars_vector

def speeddeg(x_2 , y_2 , x ,y):
    '''print("x2 %.10f" % x_2)
    print("y2 %.10f" % y_2)
    print("x %.10f" % x)
    print("y %.10f" % y)'''
    data = []
    deg = 0
    speed = np.sqrt((x_2)**2 + (y_2)**2 )
    
    dx = (x_2 -x)
    dy = (y_2 - y)

    deg = np.arctan2(dy,dx)
    deg *= 180/np.pi
    #print(deg)
    if (deg < 0 and deg > -180):
        deg += 360 
	#else if (deg )
    data.append(speed)
    data.append(deg)
    #print(speed)
    #print(deg)
    return data

def vectorsum(mv,stars):
    ans = 0
    #print("mv",mv)
    ms = np.asarray(mv)
    for i in range(len(stars)):
        sta = []
        sta.append(stars[i][0])
        sta.append(stars[i][1])
        sta = np.asarray(sta)
        #print(stars[i][0])
        ans = sta + ms
        ms = np.asarray(ans)
    #print("ans",ans)
    return ans

def calculatePlayerNextPoint(px,py,pv):
    ans = []
    ans.append(px +pv[0])
    ans.append(py - pv[1])
    return ans

def getCaluculatedFrame(ship,starlist):
    #csv = ""
    stars = []
    #istars = []
    #istars.append(Star(259,68,100))
    #istars.append(Star(400,35,50))
    for i in range(len(starlist)):
        stars.append([starlist[i].x,starlist[i].y,starlist[i].grabity])
    stars = np.asarray(stars)
    
    current_ship = ship
    frame=[]

    for f in range(60):
        #print("--------------------------------------")

        current_ship=Progolferhamon.StarShip(current_ship.x,current_ship.y,current_ship.speed,current_ship.drection)
        current_ship_point_array = []
        current_ship_point_array.append(current_ship.x)
        current_ship_point_array.append(current_ship.y)
        current_ship_point_array = np.asarray(current_ship_point_array)


        current_player_vector = getPlayerVector(current_ship.speed,current_ship.drection)
        #print("current_player_vector x %.10f" % current_player_vector[0])
        #print("current_player_vector y %.10f" % current_player_vector[1])

        stars_vector = getCalculatedStarVectorToPlayer(current_ship_point_array,stars)
        #print("stars_vector %.10f" % stars_vector[0][0])
       # print("stars_vector %.10f" % stars_vector[0][1])

        sum_vector = vectorsum(current_player_vector,stars_vector)

        #print("sum_vector x %.10f" % sum_vector[0])
        #print("sum_vector x %.10f" % sum_vector[1])

        next_ship_speed_deg = speeddeg(sum_vector[0],sum_vector[1],current_player_vector[0],current_player_vector[1])
        
        next_ship_point = calculatePlayerNextPoint(current_ship.x,current_ship.y,sum_vector)

       # print("next_speed %.10f"%next_ship_speed_deg[0])
        #print("next_deg %.10f"%next_ship_speed_deg[1])

        #print("next_point x",next_ship_point[0])
        #print("next_point y",next_ship_point[1])
        current_ship.setData(next_ship_point[0],next_ship_point[1],next_ship_speed_deg[0],next_ship_speed_deg[1])
        #print("current_ship y ",current_ship.y)
        frame.append(current_ship)
        #csv += str(f) + ", " + str(current_ship.x)  + ", " + str(current_ship.y) + ", " + str(current_ship.speed) + ", " + str(current_ship.drection) + "\n"
      
    #with open("./test3.csv","wb") as w:
        #w.write(csv)
    return frame

