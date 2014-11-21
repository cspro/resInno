import csv, json, sys, pprint, codecs

input = codecs.open(sys.argv[1], encoding='utf-8')
# read_data = input.read()
# read_data.rstrip()
# pprint.pprint(read_data)
data = json.load(input)
input.close()

csv_file = open(sys.argv[2], "wb")
output = csv.writer(csv_file, delimiter=",")

output.writerow(data[0].keys()) #header row

for row in data:
#     decoded = row.values().decode('utf-8')
#     print "Value: %s" % row.values()
    output.writerow(row.values())