# ds-assessment

<picture>
      <source srcset="https://raw.githubusercontent.com/maciebey/ds-assessment/main/ds_screenshot.png">
      <img alt="App Screenshot" src="https://raw.githubusercontent.com/maciebey/ds-assessment/main/ds_screenshot.png" height="300" style="max-width: 100%;">
</picture>

This repo represents about 3 hours of work. My goal was to work in a general sense of creating a usable POC application. Application has a basic layout and functions pretty reliably in terms of fetching data between a selectable start and end date, viewing retrieved raw data in a grid component with sort/filtering/pagination abilities, and the start of basic insight done client side with the ability to exclude certain days of the week.

Next steps after checking in with stakeholders and getting a better understanding of the source data:
- expand out Insights tool with more filtering options and example client questions as described in email
- layout tweaking
- potentially graphing some data using d3, a dual line chart for Lagging vs Leading current as an example

# Project App Dependencies

ds-flask-api
- Poetry - used for python environment/dependency management
- flask - chosen for ease of setup and readability of implementation, all relevant code is in __init__.py
- flask-cors - simple CORS disable for demo purposes
- Pandas - demo csv is loaded to a dataframe. Initially was going to use dataframe's ability to query data by SQL, but filtering by properties other than date moved to be done in UI and direct comparison with dates is easy after date column is formatted to datetime using format string `"%d/%m/%Y %H:%M"`

ds-nextjs
- nextjs - used for quick setup with tailwindCSS and (unimplemented) use of query params to control datepickers
- react-datepicker - reliable datepicker component I have experience with
- ag-grid-react - reliable datatable component I have experience with, quickly resolves many common dependencies like row sorting, row filtering, and client side pagination

# Starting API

From repo parent dir:
```
cd ds-flask-api
poetry install
poetry run python src/ds_flask_api/__init__.py
```

API will run until stopped with ctrl+c

# Starting UI

Application built using node v22.16 installed with nvm, TODO nvm target node version control

From repo parent dir, in another console window:
```
cd ds-nextjs
npm install
npm run dev
```