# SF Covid-19 Dashboard:
## A real time visualization dashboard for San Francisco's coronavirus data.

  ### [live project](https://sf-covid-dashboard.com/)
 
 #### * Limitations exist due to the nature of data collection.
 #### * A 3 day grace period is used to raise accuracy. 
 #### * Due to recovery data being inconsitantly reported, I omit figures that use it. 
 
 
- ## Tools and Architecture: 
    
  ##### Frontend:
    - This App is built with Material UI and React.js
    - React-Chart-Js2 is used for the Line and Bar charts.
    - Neighborhood map is made with MapBox wrapper for react, with custom vector overlays. 
    
  ##### Backend: 
    - No backend - served by an AWS CloudFront distribution from an S3 bucket. 
    
  ##### Data: 
    - The data is sourced from [SODA open data library](https://dev.socrata.com/consumers/getting-started.html).
    - 8 sources of data are explored, each dataset is formatted diferently and needs to be converted to usable format.
    - Each dataset has mulitple visualizations possible, each is bundled and cached in state until another dataset is chosen.
   
- ## Features:
    - One simple chart, populated by data dynamically based on user input. 
    - Each dataset has multiple sub categories, providing for granular visualization of specific parameters.
    - Date range can be adjusted to trim dataset as needed.
    - Footer provides data collection date, link to data source. 

- ## Additions:
    - Future releases will contain an 'About' page, discussing the data and collection techniques, and with links to covid related resources.
    - More datasets are prepared for use, visualizations to come. 
    - I have data prepared for a traditional Dashboard, and a landing page that shows high level stats. 
    - More details on the Map interface.
  
