import csv
import json
import sys


in_filename = sys.argv[1]
out_filename = sys.argv[2]


with open(in_filename, 'r') as f:
    data = json.loads(f.read())

colnames = data[0].keys()
with open(out_filename, 'w') as f:
    writer = csv.writer(f)
    writer.writerow(colnames)  # header
    for row in data:
        encoded_row = [v.encode('utf-8') for v in row.values()]
        writer.writerow(encoded_row)
