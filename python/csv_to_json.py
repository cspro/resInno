import csv
import json
import logging
import sys

in_filename = sys.argv[1]
out_filename = sys.argv[2]

csvFile = open(in_filename, 'rU')
jsonFile = open(out_filename, 'w')

fieldNames = ('a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p')

input = csv.DictReader( csvFile, fieldNames )

projects = []

projectCount = 0

def parseBusinessUnit(businessUnitInput):

    parsed = businessUnitInput.replace(' ', '')
    parsed = parsed.replace(',', ' ')
    parsed = parsed.lower()
    parsed = parsed.replace('highered', 'higherEd')

    return parsed


def parseSubSection(subSectionInput):

    parsed = subSectionInput.replace(' ', '')
    parsed = parsed.replace(',', ' ')
    parsed = parsed.lower()
    parsed = parsed.replace('northamerica', 'northAmerica')
    parsed = parsed.replace('growth/venture', 'growthVenture')

    return parsed


for row in input:

    #logging.warning('input row ' + row[COL_PROJECT_LEAD])

    firstColumn = row['a']

    # Omit blank rows and header rows
    if firstColumn and firstColumn != 'id':

        project = dict()

        # We get the following from the CSV

        project['id'] = row['a']
        project['shortTitle'] = row['b']
        project['fullTitle'] = row['c']
        project['icon'] = row['d']
        project['businessUnit'] = parseBusinessUnit( row['e'] )
        project['subSection'] = parseSubSection( row['f'] )
        project['researchType'] = row['g']
        project['projectLeads'] = row['h']
        project['leadEmail'] = row['i']
        project['projectGoal'] = row['j']
        project['projectResults'] = row['k']
        project['internalPartners'] = row['l']
        project['externalPartners'] = row['m']
        project['related'] = row['n']
        project['isVisible'] = 'true' if row['o'] == "TRUE" else 'false'
        project['stage'] = row['p']

        # Other fields
            
        projectCount = projectCount + 1

        projects.append( project )


#logging.warning( projects )

jsonFile.write( json.dumps( projects ) )
