# coding: utf-8
#import PhysicalCalculation as py
import NoNumpy as py
class ProgolferHamon:
    def __init__(self):
        self.__StarShip=None
        self.__Stars=list()
        self.__StageInfo=None
        self.__Frames=list()
        self.__MeteosFrames=list()
        self.__Meteos=list()

    def set_StarShip(self,ship):
        self.__StarShip=ship
    def get_StarShip(self):
        return self.__StarShip
    StarShip=property(get_StarShip,set_StarShip)

    def set_Stars(self,starlst):
        self.__Stars=starlst
    def get_Stars(self):
        return self.__Stars
    Stars=property(get_Stars,set_Stars)

    def set_StageInfo(self,stage):
        self.__StageInfo=stage
    def get_StageInfo(self):
        return self.__StageInfo
    StageInfo=property(get_StageInfo,set_StageInfo)

    def set_Frames(self,fmlst):
        self.__Frames=fmlst
    def get_Frames(self):
        return self.__Frames
    Frames=property(get_Frames,set_Frames)

    def set_MeteosFrames(self,fmlst):
        self.__MeteosFrames=fmlst
    def get_MeteosFrames(self):
        return self.__Frames
    MeteosFrames=property(get_MeteosFrames,set_MeteosFrames)
    
    def set_Meteos(self,meteolist):
        self.__Meteos = meteolist
    def get_Meteos(self):
        return self.__Meteos
    Meteos=property(get_Meteos,set_Meteos)

    def createPositionData(self):
        self.Frames=None
        self.Frames = py.getCaluculatedFrame(self.StarShip,self.Stars)
    
    def createMeteoPositionData(self):
        self.MeteosFrames = []
        for i in range(len(self.Meteos)):
            self.MeteosFrames.append(py.getCaluculatedFrameMeteo(self.Meteos[i],self.Stars))

class StarShip:
    def __init__(self,x,y,sp,dr):
        self.x = x
        self.y = y
        self.speed = sp
        self.direction = dr
    def setData(self,x,y,sp,dr):
        self.x = x
        self.y = y
        self.speed = sp
        self.direction = dr

    def getJson(self):
        #return '{"x":"{0}","y":"{1}","speed":"{1}","direction":"{1}"}'.format(self.x,self.y,self.speed,self.direction)
        ret='"x":"{0}","y":"{1}","speed":"{2}","direction":"{3}"'.format(self.x,self.y,self.speed,self.direction)
        return '{' + ret + '}'

class Star:
    def __init__(self,x,y,g):
        self.x = x
        self.y = y
        self.grabity = g

class StageInfo:
    def __init__(self):
        self.id=0
        self.name=""

class Meteo:
    def __init__(self,x,y,sp,dr):
        self.x = x
        self.y = y
        self.speed = sp
        self.direction = dr
    def setData(self,x,y,sp,dr):
        self.x = x
        self.y = y
        self.speed = sp
        self.direction = dr

    def getJson(self):
        #return '{"x":"{0}","y":"{1}","speed":"{1}","direction":"{1}"}'.format(self.x,self.y,self.speed,self.direction)
        ret='"x":"{0}","y":"{1}","speed":"{2}","direction":"{3}"'.format(self.x,self.y,self.speed,self.direction)
        return '{' + ret + '}'
