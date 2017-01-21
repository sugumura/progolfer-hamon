import numpy as np

x = 0#自機のX
y = 0#自機のY
x_2 = 10# 移動後
y_2 = 10# 移動後
def speeddeg(x_2 , y_2 , x ,y):
	speed = np.sqrt((x_2 - x)**2 + (y_2 - y)**2 )
	deg = np.arctan2((y_2 - y) ,(x_2 - x))
	deg *= 180/np.pi

	if (deg < 0 and deg > -180):
		deg += 360 
	#else if (deg )
	print(speed)
	print(deg)
	
speeddeg(10,-10,0,0)
