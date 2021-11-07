import React, { useState, useLayoutEffect } from 'react'
import {generateData} from '../api'

const ChartContext = React.createContext()

const ChartProvider = (props) => {

  const [data, setData] = useState({})
  const [loaded, setLoaded] = useState(false)

  useLayoutEffect(() => {
    console.log('Fetching Data: ChartContext.jsx')
    const fetchAPI = async () => {
      const data = await generateData()
      setData(data)
      setLoaded(true)
      console.log('Data fetched: success')
    };
    fetchAPI();
  }, []);

  return (
    <ChartContext.Provider value={{data, loaded}}>
      {props.children}
    </ChartContext.Provider>
  )
}

export { ChartProvider,  ChartContext }