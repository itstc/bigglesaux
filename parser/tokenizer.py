from typing import NamedTuple
import re

from constants import *
import schema

def queryKey(content, keys, addFn):
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
            addFn(currKey, currVal, current)
            result.append(current)
            start = False
            keyIdx = 0
        elif token.key == TOKEN_KEY:
            currKey = token.value
        elif token.key in (TOKEN_STRING, TOKEN_NUMBER, TOKEN_BOOLEAN):
            currVal = token.value
        elif token.key == TOKEN_LISTNEXT:
            addFn(currKey, currVal, current)
    return result

def tokenize(code):
    token_specification = [
        (TOKEN_NUMBER, r'\d+(\.\d*)?'),
        (TOKEN_ASSIGN, r'='),
        (TOKEN_KEY, r'\[(".*"|\d+)\]'),
        (TOKEN_STRING,  r'".*"'),
        (TOKEN_BOOLEAN,  r'(true|false)'),
        (TOKEN_NIL,  r'nil'),
        (TOKEN_ROOT,  r'[A-Za-z0-9]+'), 
        (TOKEN_LISTSTART, r'{'),
        (TOKEN_LISTEND, r'}'),
        (TOKEN_LISTNEXT, r','),
        (TOKEN_NEWLINE,  r'\n'),
        (TOKEN_SKIP, r'([ \t]+|--.*)'),
        (TOKEN_MISMATCH, r'.')
    ]
    tok_regex = '|'.join('(?P<%s>%s)' % pair for pair in token_specification)
    line_num = 1
    line_start = 0
    for mo in re.finditer(tok_regex, code):
        kind = mo.lastgroup
        value = mo.group()
        column = mo.start() - line_start
        if kind == TOKEN_NUMBER:
            value = float(value) if '.' in value else int(value)
        elif kind == TOKEN_NUMBER:
            value = None
        elif kind == TOKEN_KEY:
            value = re.sub(r'(^\["?|"?\]$)', '', value)
        elif kind == TOKEN_STRING:
            value = re.sub(r'(^"|"$)', '', value)
        elif kind == TOKEN_NEWLINE:
            line_start = mo.end()
            line_num += 1
            continue
        elif kind == TOKEN_SKIP:
            continue
        elif kind == TOKEN_MISMATCH:
            raise RuntimeError(f'{value!r} unexpected on line {line_num}')
        yield schema.Token(kind, value, line_num, column)
