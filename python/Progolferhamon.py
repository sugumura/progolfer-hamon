# coding: utf-8

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

class StarShip:
    def __init__(self):
        self.x=0
        self.y=0
        self.speed=0
        self.direction=0

class Star:
    def __init__(self):
        self.x=0
        self.y=0
        self.glavity=0

class StageInfo:
    def __init__(self):
        self.id=0
        self.name=""
