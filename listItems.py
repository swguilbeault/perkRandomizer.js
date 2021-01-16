#prints list of items in a folder in a format that can be copied and pasted in the js file
import os

while True:
    path = raw_input("path: ")

    for item in os.listdir(path):
        print "'" + item + "', ",

    print
