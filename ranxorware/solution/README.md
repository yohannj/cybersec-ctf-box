# Ranxorware

## Vulnerability
XOR is easily reversible

## Exploitation
XOR is a commutative operation. `A XOR B == B XOR A`.  
Other properties of XOR is that `A XOR A == 0` and `A XOR 0 == A`.

The ransom script contains a key that was used to XOR the input file.  
So we can say the encoded file is `decoded file XOR key`.

To retrieve the decoded we should XOR again, with the key: `(decoded file XOR key) XOR key == decoded file XOR (key XOR key) == decoded file XOR 0 == decoded file`.  
To do that, we can re-run `ransom.py`, changing the expected extension so that it run using the `.hax` extension.

```python
from pathlib import Path

key = b'e\x0f>\x9b\xab\xfb\x06\xe1\x9dK'
for path in Path(".").glob('**/*.hax'):
    if path.is_file():
        data = bytearray(path.read_bytes())
        for i in range(len(data)):
            data[i] ^= key[i % len(key)]
        
        with open(str(path) + ".decoded", "wb") as binary_file:
            binary_file.write(bytes(data))
```

## Fix
N/A
