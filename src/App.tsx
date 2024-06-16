import { useState } from 'react'
import './App.css'
import FilterOptions from './FilterOptions'
import Header from './Header'
import HistoryLog from './HistoryLog'
import InventoryCount from './InventoryCount'
import RecentGatheredData from './RecentGatheredData'
import AverageMSRP from './AverageMSRP'

function App() {
  const [filteredInventoryData, setFilteredInventoryData] = useState([]);
  const [filteredMSRPData, setFilteredMSRPData] = useState([]);

  const handleFilterApplyInventory = (data) => {
    setFilteredInventoryData(data);
  };

  const handleFilterApplyMSRP = (data) => {
    setFilteredMSRPData(data);
  };

  const removeAllFilters = () => {
    // Implement logic to clear filters or reset state in App component
    setFilteredInventoryData([]);
    setFilteredMSRPData([]);
  };


  return (
    <>
      <Header onFilterApplyInventory={handleFilterApplyInventory} onFilterApplyMSRP={handleFilterApplyMSRP} onRemoveAllFilters={removeAllFilters} // Pass the function down
  />
      <RecentGatheredData/>
      <InventoryCount filteredData={filteredInventoryData} onRemoveAllFilters={removeAllFilters} // Pass the function down
 />
      <AverageMSRP filteredDatas={filteredMSRPData} />
      <HistoryLog/>

    </>
  )
}

export default App
