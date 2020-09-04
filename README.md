# SF Covid-19 Dashboard:
## A real time visualization dashboard for San Francisco's coronavirus data.

  ### [live project](https://sf-covid-dashboard.com/)
 
 #### * Limitations exist due to the nature of data collection.
 #### * A 3 day grace period is used to raise accuracy. 
 #### * Due to recovery data being inconsitantly reported, I avoid use of that metric. 
 
    ---
       

 
  <img width="1280" alt="Screen Shot 2020-09-04 at 10 24 23 AM" src="https://user-images.githubusercontent.com/43154475/92269476-15b7de80-ee99-11ea-9aaf-8d16da4c3a52.png">
  
    ---
       

 
- ## Tools and Architecture: 
    
  ##### Frontend:
    - This App is built with Material UI and React.js
    - Chart.js wrapper react-chart-js2 is used for the Line and Bar charts.
    - Neighborhood map is made with MapBox wrapper react-map-gl, with custom vector overlays. 
    
    ---
       

    <img width="1280" alt="Screen Shot 2020-09-04 at 10 24 45 AM" src="https://user-images.githubusercontent.com/43154475/92269480-194b6580-ee99-11ea-8d83-01fed0934b5b.png">

    ---
       

  ##### Backend: 
    - No backend - served by an AWS CloudFront distribution from an S3 bucket. 
    
  ##### Data: 
    - The data is sourced from [SODA open data library](https://dev.socrata.com/consumers/getting-started.html).
    - 8 sources of data are explored, each dataset is formatted diferently and needs to be converted to usable format.
    - Each dataset has mulitple visualizations possible, each is bundled and cached in state until another dataset is chosen.
   
- ## Features:
    - One simple chart, populated by data dynamically based on user input. 
    - Each dataset has multiple sub categories, providing for granular visualization of specific parameters.
    - Date range can be adjusted to trim datasets as needed.
    - Footer provides data collection date, link to data source. 
    <br/>

    <img width="1280" alt="Screen Shot 2020-09-04 at 10 30 03 AM" src="https://user-images.githubusercontent.com/43154475/92269750-a393c980-ee99-11ea-838c-2dd266b29e6b.png">
    
    ---
       

    <img width="1280" alt="Screen Shot 2020-09-04 at 10 32 23 AM" src="https://user-images.githubusercontent.com/43154475/92269932-fbcacb80-ee99-11ea-9d0b-f9d60ad3a8df.png">
    ---
       

    <img width="1280" alt="Screen Shot 2020-09-04 at 10 33 53 AM" src="https://user-images.githubusercontent.com/43154475/92270037-2ddc2d80-ee9a-11ea-90f8-09d0cf2bb3fd.png">

    ---
       
- ## Additions:
    - Future releases will contain an 'About' page, discussing the data and collection techniques, and with links to covid related resources.
    - More datasets are prepared for use, visualizations to come. 
    - I have data prepared for a traditional Dashboard, and a landing page that shows high level stats. 
    - More details on the Map interface.
  
