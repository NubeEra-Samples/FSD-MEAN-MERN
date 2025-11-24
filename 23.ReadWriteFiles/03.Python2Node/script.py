# script.py
import sys

# Read arguments passed from Node.js
name = sys.argv[1] if len(sys.argv) > 1 else "World"
print(f"Hello, {name} from Python!")
