from typing import NamedTuple
import re

from constants import *
import schema

def tokenize(code):
    token_specification = [
        (TOKEN_NUMBER, r'\d+(\.\d*)?'),
        (TOKEN_ASSIGN, r'='),
        (TOKEN_KEY, r'\[(".*"|\d+)\]'),
        (TOKEN_STRING,  r'".*"'),
        (TOKEN_BOOLEAN,  r'(true|false)'),
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
