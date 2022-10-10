#!/usr/bin/env python3
# -*-coding:utf-8 -*

import sys  #시스템 패키지
import lib


for line in lib.csv.reader(sys.stdin):
    if line[0] == '관광지':
        continue

    name = line[0]                       # 관광지명
    text = line[1] + "\n" + line[3]     # 블로그 제목 + 내용
    for pos in lib.morph(text):
        print('%s,%s %s' % (name, pos, 1))







