import csv
import json
import logging
import sys

in_filename = sys.argv[1]
out_filename = sys.argv[2]

csvFile = open(in_filename, 'rU')
jsonFile = open(out_filename, 'w')

fieldNames = ('a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q')

input = csv.DictReader( csvFile, fieldNames )

projects = []

projectCount = 0

def parseBusinessUnit(businessUnitInput):

    parsed = businessUnitInput.replace(',', ' ')
    parsed = parsed.lower()
    parsed = parsed.replace('highered', 'higherEd')

    return parsed


def parseSubSection(subSectionInput):

    parsed = subSectionInput.replace(',', ' ')
    parsed = parsed.lower()
    parsed = parsed.replace('northamerica', 'northAmerica')
    parsed = parsed.replace('growthventure', 'growthVenture')

    return parsed


for row in input:

    #logging.warning('input row ' + row[COL_PROJECT_LEAD])

    firstColumn = row['a']

    # Omit blank rows and header rows
    if firstColumn and firstColumn != 'id':

        project = dict()

        # We get the following from the CSV

        project['id'] =              row['a']
        project['subSection'] =      row['b']
        project['businessUnit'] =    row['c']
        project['center'] =          row['d']
        project['shortTitle'] =      row['e']
        project['fullTitle'] =       row['f']
        project['icon'] =            row['g']
        project['projectLeads'] =    row['h']
        project['leadEmail'] =       row['i']
        project['problem'] =         row['j']
        project['projectGoal'] =     row['k']
        project['projectResults'] =  row['l']
        project['pearsonOutcomes'] = row['m']
        project['status'] =          row['n']
        project['whoToContact'] =    row['o']
        project['resources'] =       row['p']
        project['isVisible'] = 'true' if row['q'] == "TRUE" else 'false'

        # Other fields
            
        projectCount = projectCount + 1

        projects.append( project )


#logging.warning( projects )

jsonFile.write( json.dumps( projects ) )
