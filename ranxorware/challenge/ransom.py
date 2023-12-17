from pathlib import Path

key = b'e\x0f>\x9b\xab\xfb\x06\xe1\x9dK'
for path in Path(".").glob('**/*.important'):
    if path.is_file():
        data = bytearray(path.read_bytes())
        for i in range(len(data)):
            data[i] ^= key[i % len(key)]
        
        with open(str(path) + ".hax", "wb") as binary_file:
            binary_file.write(bytes(data))
