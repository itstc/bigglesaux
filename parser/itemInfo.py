from datetime import date
import sys
import json

from tokenizer import tokenize, queryKey
from constants import *
import schema

def addItemInfo(key, value, arr):
    if not value:
        arr.append(None)
        return

    name, color, itemVal, *_ = value.split('|')
    # itemLink format: itemName#|cffCOLOR_RGB|Hitem:itemId:....|
    itemObject = schema.ItemInfo(itemVal.split(':')[1], name[:-1], color[3:])
    arr.append(itemObject)

def main():
    if len(sys.argv) <= 1:
        return

    with open(sys.argv[1]) as f:
        content = f.read()
        with open("items.json", 'w') as writer:
            result = queryKey(content, ('account', 'items'), addItemInfo)
            if not result:
                return
            writer.write(json.dumps(result, default=vars))

main()
