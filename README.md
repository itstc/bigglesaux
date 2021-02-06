# bigglesaux
Access WoW Classic Bigglesworth auctions on the web
POGGERXD

### Tokenizer Constants

|Name|Value|Description|
|---|---|---|
|TOKEN_NUMBER|NUMBER|Value is a number|
|TOKEN_ASSIGN|ASSIGN|Assignment token|
|TOKEN_KEY|KEY|Key in Schema|
|TOKEN_STRING|STRING|Value is a string|
|TOKEN_BOOLEAN|BOOLEAN|Value is a boolean|
|TOKEN_ROOT|ROOT|Key is the root node|
|TOKEN_LISTSTART|LISTSTART|Token indicates the start of a list|
|TOKEN_LISTEND|LISTEND|Token indicates the end of a list|
|TOKEN_LISTNEXT|LISTNEXT|Token indicates continuation of a list|
|TOKEN_NEWLINE|NEWLINE|Token indicates newline in content|
|TOKEN_SKIP|SKIP|Token caputres whitespace and comments|
|TOKEN_MISMATCH|MISMATCH|Captures any other cases|

### Usage

`python display.py filename.lua`

```lua
-- filename.lua example
aux = {
  ["faction"] = {
    ["Bigglesworth|Alliance"] = {
      ["post"] = {
        ["9859:214"] = "2#10000#20000#0",
        ["12435:0"] = "2#2353.9166666667#2353.9166666667#0",
        ["11978:1371"] = "2#1100000#1100000#0",
        ["7972:0"] = "2#0#0#0",
        ["2592:0"] = "2#63.9#63.9#0",
        ["4556:0"] = "2#0#0#0",
        ["2018:0"] = "2#0#0#0",
        ["7909:0"] = "2#0#0#0",
        ["9187:0"] = "2#10331.5#10331.5#0",
        ["17031:0"] = "2#0#0#0",
        ["1475:0"] = "2#2499#2499#0",
        ["3740:1549"] = "2#0#0#0",
        ["18945:0"] = "2#0#0#0"
        }
      }
    }
  }
```
