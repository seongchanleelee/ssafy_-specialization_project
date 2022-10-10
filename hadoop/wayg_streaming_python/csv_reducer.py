#!/usr/bin/env python3
# -*-coding:utf-8 -*

import sys


def print_output(word, count):
    print('{}\t{}'.format(word, count))


word, count = None, 0

for line in sys.stdin:
    fields = line.strip().split('\t')

    if fields[0] != word:
        if word is not None:
            print_output(word, count)

        word, count = fields[0], 0

    count += 1

print_output(word, count)