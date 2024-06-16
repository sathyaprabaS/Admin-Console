import { useState } from 'react'
import './App.css'
import Header from './Header'
import HistoryLog from './HistoryLog'
import InventoryCount from './InventoryCount'
import RecentGatheredData from './RecentGatheredData'
import AverageMSRP from './AverageMSRP'

function App() {
  const [filteredInventoryData, setFilteredInventoryData] = useState([]);
  const [filteredMSRPData, setFilteredMSRPData] = useState([]);

  const handleFilterApplyInventory = (data:any) => {
    setFilteredInventoryData(data);
  };

  const handleFilterApplyMSRP = (data:any) => {
    setFilteredMSRPData(data);
  };



  return (
    <>
      <Header onFilterApplyInventory={handleFilterApplyInventory} onFilterApplyMSRP={handleFilterApplyMSRP} // Pass the function down
  />
      <RecentGatheredData/>
      <InventoryCount filteredData={filteredInventoryData} />
      <AverageMSRP filteredDatas={filteredMSRPData} />
      <HistoryLog/>

    </>
  )
}

export default App
