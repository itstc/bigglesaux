from tokenizer import tokenize
import sys

def main():
    if len(sys.argv) <= 1:
        return
    with open(sys.argv[1]) as f:
        for token in tokenize(f.read()):
            print(token)

main()
