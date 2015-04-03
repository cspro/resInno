# Efficacy Projects Visualisation

Based on the Org Structure visualisation here: http://csprojecthub.com/cs/webapps/orgStructure/

The app is all client-side, using AngularJS for the logic / templating, and css for animations and transitions. There is no server-side component.  However, if you want to run and test the app on your local machine, you will need to do the following:

* On Mac: python -m SimpleHTTPServer
* Windows: Install WAMP (http://www.wampserver.com/en/) for windows. Place the orgStructure folder in the www folder of your WAMP install ('c:\wamp\www')
* In your browser, go to 'http://localhost:8888/orgStructure/'

Application data is in 'data/project_data.json'. The format should be pretty self-explanatory if you compare it to the project popup. Titles and subtitles for sections may be in the html templates rather than the data file; those can be found in the 'partials/' folder. They are just HTML docs with some special tags for AngularJS to populate them. Any text that is not inside of either a {{ }} or in an HTML attribute (i.e., ng-include="someVariable") should be safe to edit.  If it looks like text that appears in the app, it probably is.

To generate the project data JSON from the spreadsheet CSV:

* Save the latest CSV file under the 'data-in' folder
* Open up a terminal window and `cd` to the 'data-in' directory (you can drag the folder in from the Finder window to paste in the path)
* Type: `iconv -f ISO-8859-15 -t UTF-8 [CSV filename here.csv] > EfficacyDashboard.csv`
* Go back up one directory by doing: `cd ..`
* Type: `python generateProjectDataFromCSV.py`

That should be it.

Good luck!
