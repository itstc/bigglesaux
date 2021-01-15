class Token:
    def __init__(self, key, value, line, column):
        self.key = key
        self.value = value
        self.line = line
        self.column = column

    def __str__(self):
        return 'Token ({}, {}, {}, {})'.format(self.key, self.value, self.line, self.column)

    def __repr__(self):
        return 'Token ({}, {}, {}, {})'.format(self.key, self.value, self.line, self.column)

class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value

    def __str__(self):
        return 'Node({}, {})'.format(self.key, self.value)

    def __repr__(self):
        return 'Node({}, {})'.format(self.key, self.value)

class Item:
    def __init__(self, itemId, minBuyout, listings):
        self.itemId = itemId
        self.minBuyout = minBuyout
        self.listings = listings

    def __str__(self):
        return 'Item({}, {}, {})'.format(self.itemId, self.minBuyout, self.listings)

    def __repr__(self):
        return 'Item({}, {}, {})'.format(self.itemId, self.minBuyout, self.listings)


class Listing:
    def __init__(self, buyout, recordedAt):
        self.buyout = buyout
        self.recordedAt = recordedAt

    def __str__(self):
        return 'Listing({}, {})'.format(self.buyout, self.recordedAt)

    def __repr__(self):
        return 'Listing({}, {})'.format(self.buyout, self.recordedAt)

class ItemInfo:
    def __init__(self, itemId, itemName, color):
        self.itemId = itemId
        self.itemName = itemName
        self.color = color

    def __str__(self):
        return 'ItemInfo({}, {}, {})'.format(self.itemId, self.itemName, self.color)

    def __repr__(self):
        return 'ItemInfo({}, {}, {})'.format(self.itemId, self.itemName, self.color)

