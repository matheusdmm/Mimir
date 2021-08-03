#   
#        _ __    ,---.      .-._                       _,.---._                  ,---.      
#     .-`.' ,`..--.'  \    /==/ \  .-._  _,..---._   ,-.' , -  `.   .-.,.---.  .--.'  \     
#    /==/, -   \==\-/\ \   |==|, \/ /, /==/,   -  \ /==/_,  ,  - \ /==/  `   \ \==\-/\ \    
#   |==| _ .=. /==/-|_\ |  |==|-  \|  ||==|   _   _\==|   .=.     |==|-, .=., |/==/-|_\ |   
#   |==| , '=',\==\,   - \ |==| ,  | -||==|  .=.   |==|_ : ;=:  - |==|   '='  /\==\,   - \  
#   |==|-  '..'/==/ -   ,| |==| -   _ ||==|,|   | -|==| , '='     |==|- ,   .' /==/ -   ,|  
#   |==|,  |  /==/-  /\ - \|==|  /\ , ||==|  '='   /\==\ -    ,_ /|==|_  . ,'./==/-  /\ - \ 
#   /==/ - |  \==\ _.\=\.-'/==/, | |- ||==|-,   _`/  '.='. -   .' /==/  /\ ,  )==\ _.\=\.-' 
#   `--`---'   `--`        `--`./  `--``-.`.____.'     `--`--''   `--`-`--`--' `--`         
#   
#   VERSION 0.75
#   
#   POST and GET kinda implemented
#   You gonna need to run PANDORA from the root of the project
#   That you're serving
#   Otherwhise its not gonna work
#
#
#   TODO:
#       Serve specific folders/files
#       Change dinamically the host
#       SSL integration

import http.server
import socket
import socketserver
from io import BytesIO
import ssl                                                        #   For future implementation with Openssl

PORT      = 8040                                                  #   Define the standard port
HOST      = 'localhost'                                           #   Define the standard host
Request   = http.server.SimpleHTTPRequestHandler                  #   Simple http request handler, it commits all files and directories within the SelfHost.py folder
SERVE    = '/deploy'                                              #   Main folder to serve
TEST     = '/test'                                                #   Test folder

class Pandora():
    def Logo():
        logo = open('etc/logo.txt', 'r')
        for line in logo.readlines():
            print(line, end = '')


    def Ssl():
        context = ssl.SSLContext(ssl.PROTOCOL_TLSv1)
        context.load_cert_chain(certfile='YOUR CERT')
        bindsocket = socket.socket()
        bindsocket.bind('', 2099)
        bindsocket.listen(5)

    def GET(self):                              #   Shitty implementation of GET request
        self.sendResponse(200)                  #   Average time response in MS
        self.endHeaders()
        self.wfile.write('GET REQUEST')

    def POST(self):                             #   Shitty implementation of POST request
        contentLength = int(self.headers['Content Length'])
        body = self.rfile.read(contentLength)
        self.sendResponse(200)                  #   Average time response in MS
        self.endHeaders()
        response = BytesIO()
        response.write(b'POST REQUEST SENDED')
        response.write(b'RECEIVED POST REQUEST ')
        response.write(body)
        self.wfile.write(response.getvalue())

    def Server():
        with socketserver.TCPServer((HOST, PORT), Request) as httpd:            #   ("host/ip address", desired port), call the resquests from files
        
            print('\n\nRunning @ ',HOST,':',PORT)                               #   Simply outputs on terminal the port that the server is operating
            print('Please, open your browser.\n')
                
            httpd.serve_forever()                                               #   Method that simply begins listening and responding to incoming requests

            while socketserver == True:
                listener = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                listener.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
                listener.bind((HOST, PORT))
                listener.listen(1)
                listener.sendall(httpd)

    # LOOP
    Logo()
    Server()