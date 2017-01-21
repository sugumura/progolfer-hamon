# coding: utf-8

import cgi
import json
import logging
import logging.handlers
import sys
import Progolferhamon

from wsgiref.simple_server import make_server


# Create logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Handler 
LOG_FILE = '/opt/python/log/hamonweb-app.log'
#LOG_FILE = './hamonweb-app.log'
handler = logging.handlers.RotatingFileHandler(LOG_FILE, maxBytes=1048576, backupCount=5)
handler.setLevel(logging.INFO)

# Formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# Add Formatter to Handler
handler.setFormatter(formatter)

# add Handler to Logger
logger.addHandler(handler)

welcome = """
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Welcome Global Game Jam 2017 Kumamoto progolfer-hamon</title>
</head>
<body id="sample">
  <h1>Global Game Jam 2017 Kumamoto progolfer-hamon</h1>
  <p>Test Info Page</p>
</body>
</html>
"""

def application(environ, start_response):
    path    = environ['PATH_INFO']
    method  = environ['REQUEST_METHOD']
    if method == 'POST':
        response = ''
        try:
            if path == '/':
                request_body_size = int(environ['CONTENT_LENGTH'])
                request_body = environ['wsgi.input'].read(request_body_size).decode()
                logger.info("Received message: %s" % request_body)
            elif path == '/scheduled':
                logger.info("Received task %s scheduled at %s", environ['HTTP_X_AWS_SQSD_TASKNAME'], environ['HTTP_X_AWS_SQSD_SCHEDULED_AT'])
            elif path == '/startgame':
                logger.info("Start Game!!")

                #wsgi_input = environ['wsgi.input']
                #length = int(environ.get('CONTENT_LENGTH', 0))
                #req = dict(cgi.parse_qsl(wsgi_input.read(length).decode()))
                #for arg in req:
                #    logger.info('key:' + arg + ",value:" + req[arg])

                #logger.info("--Request Data 1")

                #reqstr=(req[' name']).replace('request','')
                #logger.info(reqstr)
                post_env = environ.copy()
                post_env['QUERY_STRING'] = ''
                post = cgi.FieldStorage(fp=environ['wsgi.input'],environ=post_env,keep_blank_values=True)

                reqstr=post.value
                logger.info(reqstr)

                response=startgameservice(reqstr)
                logger.info("--Response Data 1")
                logger.info(response)

        except (TypeError, ValueError):
            logger.warning('Error retrieving request body for async work.')
            logger.warning(sys.exc_info())
        status = '200 OK'
        headers = [('Content-type', 'application/json')]
    else:
        response = welcome
        status = '200 OK'
        headers = [('Content-type', 'text/html')]

    logger.info('create response')
    start_response(status, headers)
    return response

def startgameservice(reqstr):
    logger.info("--Parse JSON")
    reqobj=json.loads(reqstr)

    logger.info("--Create Model")
    model=Progolferhamon.ProgolferHamon()

    model.StarShip=Progolferhamon.StarShip(259,700,1,90)
    model.StarShip.x=reqobj["starship"]["x"]
    model.StarShip.y=reqobj["starship"]["y"]
    model.StarShip.speed=reqobj["starship"]["speed"]
    model.StarShip.direction=reqobj["starship"]["direction"]

    model.StageInfo=Progolferhamon.StageInfo()
    model.StageInfo.id=reqobj["stageinfo"]["id"]
    model.StageInfo.name=reqobj["stageinfo"]["name"]

    for itm in reqobj["stars"]:
        star=Progolferhamon.Star(259,68,0.1)
        star.x=itm["x"]
        star.y=itm["y"]
        star.grabity=itm["gravity"]
        model.Stars.append(star)

    logger.info("--Create Position")
    model.createPositionData()

    logger.info("--Output Result")
    resstr=""
    for itm in model.Frames:
        if(resstr=="") :
            resstr='{ "frames" : ['
        else:
            resstr=resstr + ","
        resstr=resstr + itm.getJson()

    resstr=resstr + "]}"

    return resstr


if __name__ == '__main__':
    httpd = make_server('', 8080, application)
    print("Serving on port 8080...")
    httpd.serve_forever()
