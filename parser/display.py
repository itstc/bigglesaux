from tokenizer import tokenize
from constants import *
import schema

import sys


def queryKey(content, keys):
    keyIdx = 0
    result = []
    current = None
    start = False
    currKey,currVal = None,None
    for token in tokenize(content):
        if token.key == TOKEN_LISTSTART and keyIdx >= len(keys):
            start = True
        elif token.key == TOKEN_KEY and keyIdx < len(keys) and token.value == keys[keyIdx]:
            keyIdx += 1

        if not start:
            continue

        elif token.key == TOKEN_LISTSTART:
            current = []
        elif token.key == TOKEN_LISTEND:
            current.append(schema.Node(currKey, currVal))
            result.append(current)
            start = False
            keyIdx = 0
        elif token.key == TOKEN_KEY:
            currKey = token.value
        elif token.key in (TOKEN_STRING, TOKEN_NUMBER, TOKEN_BOOLEAN):
            currVal = token.value
        elif token.key == TOKEN_LISTNEXT:
            current.append(schema.Node(currKey, currVal))
    return result

def main():
    if len(sys.argv) <= 1:
        return

    with open(sys.argv[1]) as f:
        result = queryKey(f.read(), ('Bigglesworth|Alliance', 'history'))
        for line in result[0]:
            print(line)

main()
