# leancsv
Cross-platform, dependency-free CSV generation library written in JavaScript. Only 100 lines of code!

# Usage
Creating a new CSV:  
	var myCsv = new leancsv();

Add a header:  
	myCsv.addheader(arrayOfFields);

Add a row:  
	myCsv.addRow(arrayOfFields [, index]);

Convert CSV to a string:  
	myCsv.stringify();