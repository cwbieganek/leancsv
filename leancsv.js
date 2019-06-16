(function() {
	var leancsv = function() {
		var _header;
		var _rows = [];
		var _columnCount = 0;
		var _rowCount = 0;    // Should this include the header?

		// TODO: Description		
		this.addHeader = function(headerFields) {
			if (!Array.isArray(headerFields)) {
				throw "headerFields argument must be of type Array.";
			}
			_header = headerFields;
			_columnCount = headerFields.length;
		};

		// TODO: Description
		this.addRow = function(fields, index) {
			if (!index) {
				_rows.push(fields);
			} else {
				_rows.splice(index, 0, fields);
			}
		};

		this.getColumnCount = function() {
			return _columnCount;
		};

		this.getRowCount = function() {
			return _rowCount;
		};

		// TODO: Description
		this.stringify = function() {
			var asString = "";
			if (_header) {
				_header.forEach(function(field, i) {
					asString += stringifyField(field);
					if (i < _header.length - 1) {
						asString += ",";
					} else {
						asString += "\n";
					}
				});
			}
			_rows.forEach(function(row) {
				var rowString = "";
				row.forEach(function(field, i) {
					rowString += stringifyField(field);
					if (i < row.length - 1) {
						rowString += ",";
					} else {
						rowString += "\n";
					}
				});
				asString += rowString;
			});
			return asString;
		};

		// Determines if the field contains special characters
		function shouldEscape(field) {
			var regEx = /[\,\"\n]+/;
			return regEx.test(field);
		}

		// Stringifies field argument and handles special characters
		function stringifyField(field) {
			// Convert number to string to be safe
			field = '' + field;
			var asString = "";
			var charCount = field.length;
			var mustEscape = shouldEscape(field);
			if (mustEscape) {
				asString += '"';
			}
			for (var i = 0; i < charCount; i++) {
				var char = field[i];
				if (char != '"') {
					asString += char;
				} else {
					asString += '""'; // Escape " with an extra "
				}
			}
			if (mustEscape) {
				asString += '"';
			}
			return asString;
		}
	};
	// Determine platform before exporting
	try {
		window;
		document;
		// Browser if we make it this far
		window.leancsv = leancsv;
	} catch (e) {
		// Node
		module.exports = leancsv;
	}
}())