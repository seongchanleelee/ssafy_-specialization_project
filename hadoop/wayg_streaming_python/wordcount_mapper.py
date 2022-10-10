#!/usr/bin/env phthon3
# -*-coding:utf-8 -*

import sys

for line in sys.stdin:
    words = line.strip().split()
    for word in words:
        print('{}\t{}'.format(word, 1))