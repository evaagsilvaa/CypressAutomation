# Cypress

### To run the scripts defined on the package.json  
Documentation - https://docs.cypress.io/guides/guides/command-line
```npm run (name of the script)```
For example:
```npm run test```     
Same as:
```node_modules\\.bin\\cypress run```

    
    
### To open the Cypress Dahsboard
```./node_modules/.bin/cypress open```
    
    
### To run TestFramework test in the command line
```npx cypress run --spec cypress/integration/examples/TestFramework.js --headed --browser chrome --env  url="https://rahulshettyacademy.com"```

- (--env  url="https://rahulshettyacademy.com") <- this will overwrite what's on the cypress.config.js
- (--headed --browser chrome) <- to run with headed mode
    
### To run all tests
```npx cypress run```

### To run some tests from a specific folder
```npx cypress run --spec cypress/integration/examples/*.js```

### To run all tests with the same tag
```npx cypress run --env tags="@Smoke" --headed --browser chrome```
Same as:
```node_modules/.bin/cypress run --env tags="@Smoke" --headed --browser chrome```

### To record 
```npx cypress run --record --key 602f74b3-aa23-471e-8485-ca23577ba9e5```

- (--record --key 602f74b3-aa23-471e-8485-ca23577ba9e5) <- to record your tests running on the https://cloud.cypress.io/
- Don't forget to insert the project id on the cypress.confi.js (it's given by the https://cloud.cypress.io/)
- Don't forget to add the key given by the https://cloud.cypress.io/ on the command line (602f74b3-aa23-471e-8485-ca23577ba9e5)


### Install Cucumber 
Documentation - https://github.com/badeball/cypress-cucumber-preprocessor

```npm install @badeball/cypress-cucumber-preprocessor```    

### Cucumber Documentation 
Documentation - https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/readme.md
https://github.com/TheBrainFamily/cypress-cucumber-example


### Install plugin to generate HTML reports
Documentation - https://www.npmjs.com/package/multiple-cucumber-html-reporter
```npm install multiple-cucumber-html-reporter --save-dev```

- Add the cucumber-html-report.js File to your project and change the info if necessary
- To see the report on a HTML page, please run: ```node cucumber-html-report.js```
- After running the command, go to cucumberReports/report.html/index.html, right click and Copy Path and Paste on the browser

### Install cypress-sql-server 
Documentation - https://www.npmjs.com/package/cypress-sql-server
```npm install --save-dev cypress-sql-server```


### Install convert-excel-to-json 
Documentation - https://www.npmjs.com/package/convert-excel-to-json
```npm i convert-excel-to-json```