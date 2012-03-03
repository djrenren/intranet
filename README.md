#Intranet
So cutting edge you will cut your mouse on it.

##Set Up:
  * git clone the intranet repository.
  * Make sure MongoDB is installed (via your package manager).
  * Run "npm install -d" to install the dependencies (currently ejs, express, jade, and mongoose).
  * Start intranet by running:
  
  ```
  $ node intranet.js
  ```


##Code Styling:
  * Indentation should be done with tabs, not spaces.
  * There should be no space between a function name, "if," "for," etc. and the following open parenthesis (e.g., "while(true)", NOT "while (true)").
  * Function arguments should not be separated from their containing parentheses with any sort of whitespace (e.g., "while(true)", NOT "while( true )").
  * The open brace that begins a function, if, for, etc. should be on the same line as the if, for, etc. and preceded by a space.
  * The closing brace that ends a function, if, for, etc. should be on the same indentation level as the line with the corresponding open brace.
  * Test code quality using jshint:

  ```
  $ jshint [file1] [file2] [..] --config config/jshint.json
  ```
