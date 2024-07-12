import { useState } from 'react'
import './Styles/App.css'
import Header from './components/Header'
import Table from './components/Table'
import { SkeletonTheme } from 'react-loading-skeleton';
import Statistics from './components/Statistics'
import Chart from './components/Chart';

function App() {

  return (
    <>
      <SkeletonTheme baseColor="#d7dbd8" highlightColor="#c7c9c8">
        <Header />
        <div id='Table'>
          <Table />
        </div>
        <div id='Statistics'>
          <Statistics />
        </div>
        <div id='Charts'>
          <Chart />
        </div>
      </SkeletonTheme>
    </>
  )
}

export default App
