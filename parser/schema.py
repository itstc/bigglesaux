class Token:
    def __init__(self,key,value,line,column):
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

