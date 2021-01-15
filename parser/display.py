from datetime import date
import sys
import json

from tokenizer import tokenize, queryKey
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

def main():
    if len(sys.argv) <= 1:
        return

    with open(sys.argv[1]) as f:
        content = f.read()
        with open("result.json", 'w') as writer:
            result = queryKey(content, ('Bigglesworth|Alliance', 'history'), addItem)
            if not result:
                return
            writer.write(json.dumps(result, default=vars))

main()
