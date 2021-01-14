from datetime import date
import sys
import json

from tokenizer import tokenize
from constants import *
import schema

def parseListings(listings):
    if not listings:
        return []

    recordedAt = date.today().strftime('%Y-%m-%d')
    posts = listings.split(';')

    result = []
    for post in posts:
        buyout, _ = post.split('@')
        result.append(schema.Listing(buyout, recordedAt))

    return result

def addItem(key, value, arr):
    _,buyout,listings = value.split('#')
    listingResult = parseListings(listings)

    arr.append(schema.Item(key,buyout,listingResult))

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
            addItem(currKey, currVal, current)
            result.append(current)
            start = False
            keyIdx = 0
        elif token.key == TOKEN_KEY:
            currKey = token.value
        elif token.key in (TOKEN_STRING, TOKEN_NUMBER, TOKEN_BOOLEAN):
            currVal = token.value
        elif token.key == TOKEN_LISTNEXT:
            addItem(currKey, currVal, current)
    return result

def main():
    if len(sys.argv) <= 1:
        return

    with open(sys.argv[1]) as f:
        with open("result.json", 'w') as writer:
            result = queryKey(f.read(), ('Bigglesworth|Alliance', 'history'))
            if not result:
                return
            writer.write(json.dumps(result, default=vars))

main()
