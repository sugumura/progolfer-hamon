# coding: utf-8

class ProgolferHamon:
    def __init__(self):
        self.__StarShip=""
        self.__Stars=""
        self.__StageInfo=""

    def set_StarShip(self,ship):
        self.__StarShip=ship
    def get_StarShip(self):
        return self.__StarShip
    StarShip=property(get_StarShip,set_StarShip)

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
