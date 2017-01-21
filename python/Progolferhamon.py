# coding: utf-8
import PhysicalCalculation as py
class ProgolferHamon:
    def __init__(self):
        self.__StarShip=None
        self.__Stars=None
        self.__StageInfo=None
        self.__Frames=None
    def set_StarShip(self,ship):
        self.__StarShip=ship
    def get_StarShip(self):
        return self.__StarShip
    StarShip=property(get_StarShip,set_StarShip)
    def set_Stars(self,starlst):
        self.__Stars=starlst
    def get_Stars(self):
        return self.__Stars
    StarShip=property(set_Stars,get_Stars)
    def set_StageInfo(self,stage):
        self.__StageInfo=stage
    def get_StageInfo(self):
        return self.__StageInfo
    StarShip=property(set_StageInfo,get_StageInfo)

    def createPositionData(self):
        self.Frames=None
        self.Frames = py.getCaluculatedFrame(self.StarShip,self.Stars)

class StarShip:
    def __init__(self,x,y,sp,dr):
        self.x = x
        self.y = y
        self.speed = sp
        self.drection = dr
    def setData(self,x,y,sp,dr):
        print("hello")
        self.x = x
        self.y = y
        self.speed = sp
        self.drection = dr

class Star:
    def __init__(self,x,y,g):
        self.x = x
        self.y = y
        self.grabity = g

class StageInfo:
    def __init__(self):
        self.id=0
        self.name=""
