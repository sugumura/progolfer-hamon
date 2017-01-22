# coding: utf-8
import base64
import cgi
import json
import logging
import logging.handlers
import sys
import Progolferhamon
from cgi import parse_qs
from wsgiref.simple_server import make_server


# Create logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Handler 
LOG_FILE = '/opt/python/log/hamonweb-app.log'
# LOG_FILE = './hamonweb-app.log'
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
    <meta charset="utf-8">
    <title>Pro Golfer HAMON</title>
    <style>
    * {
        padding: 0;
        margin: 0
    }
    </style>
    <script src="html/node_modules/createjs-easeljs/lib/easeljs-0.8.2.min.js"></script>
    <script src="html/node_modules/createjs-preloadjs/lib/preloadjs-0.6.2.min.js"></script>
    <script src="html/node_modules/createjs-soundjs/lib/soundjs-0.6.2.min.js"></script>
    <script src="html/node_modules/createjs-tweenjs/lib/tweenjs-0.6.0.min.js"></script>
    <link rel="stylesheet" type="text/css" href="html/css/move.css" media="all">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
<body>
    <h1>Global Game Jam 2017 Kumamoto,Japan Progolfer-Hamon</h1>
    <div id="box">
        <p></p>
    </div>
    <div id="fadein">
        <img src="html/assets/images/Titlelogo.png">
    </div>
    <div id="flash"> 
        <a href="html/index.html"><img id="startimg" src="html/assets/images/start.png" style="display:none;"></a>
    </div>
    <canvas id="GameWindow" width="768" height="768"></canvas>
    <script src="html/js/title.js"></script>
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

                try:
                    request_body_size = int(environ.get('CONTENT_LENGTH', 0))
                except (ValueError):
                    request_body_size = 0

                    # When the method is POST the variable will be sent
                    # in the HTTP request body which is passed by the WSGI server
                    # in the file like wsgi.input environment variable.
                request_body = environ['wsgi.input'].read(request_body_size).decode('utf-8')
                # d = parse_qs(request_body)
                #
                # logger.info(d)
                # logger.info('test')
                # logger.info('start parsing')
                # post_env = environ.copy()
                # logger.info('start parsing2')
                # post_env['QUERY_STRING'] = ''
                # logger.info('start parsing3')
                # logger.info(environ['wsgi.input'])
                # post = cgi.FieldStorage(fp=environ['wsgi.input'],environ=post_env,keep_blank_values=True)
                # logger.info('start parsing4')
                # reqstr=post.value
                # logger.info(reqstr)

                response=startgameservice(request_body)
                logger.info("--Response Data 1")
                logger.info(response)
                status = '200 OK'
                headers = [('Content-type', 'application/json'),
                           ('Access-Control-Allow-Origin', '*'),
                           ('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE'),
                           ('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization')]
                start_response(status, headers)
                logger.info('return response')
                return [response.encode('utf-8')]

        except (TypeError, ValueError):
            logger.warning('Error retrieving request body for async work.')
            logger.warning(sys.exc_info())
        status = '200 OK'
        headers = [('Content-type', 'application/json')]
    else:
        if path == '/':
            response=welcome
        else:
            response=''

        status = '200 OK'
        headers = [('Content-type', 'text/html'),
                   ('Access-Control-Allow-Origin', '*'),
                   ('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE'),
                   ('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization')
                   ]

    logger.info('create response')
    start_response(status, headers)
    return response

def startgameservice(reqstr):
    logger.info("--Parse JSON")
    reqobj=json.loads(reqstr)

    logger.info("--Create Model")
    model=Progolferhamon.ProgolferHamon()

    model.StarShip=Progolferhamon.StarShip(reqobj["starship"]["x"],reqobj["starship"]["y"],reqobj["starship"]["speed"],reqobj["starship"]["direction"])

    model.StageInfo=Progolferhamon.StageInfo(reqobj["stageinfo"]["id"],reqobj["stageinfo"]["name"])

    for itm in reqobj["stars"]:
        star=Progolferhamon.Star(itm["x"],itm["y"],itm["gravity"])
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
    httpd = make_server('', 8000, application)
    print("Serving on port 8000...")
    httpd.serve_forever()
