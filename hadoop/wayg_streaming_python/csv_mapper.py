#!/usr/bin/env python3
# -*-coding:utf-8 -*

import sys
sys.path.append( '/home/j7c202/.local/lib/python3.7/site-packages')

from konlpy.tag import Okt


#okt = Okt()
#print(okt.pos("i hate hadoop...... i want to go home..."))

for line in sys.stdin:
    print("%s\t%s" % (line, 1))