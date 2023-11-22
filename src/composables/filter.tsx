import React, { useEffect, useState } from "react";
import Image from "next/image";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface props{
    clicked: ()=> void;
}

export default function Filter(props: props) {
  const [range, setRange] = useState([500, 200000]);
  const [selectedOption, setSelectedOption] = useState<string>('default');
  const [filterSetting, setFilterSetting] = useState({
    range: range,
    option: selectedOption
  })

  useEffect(() =>{
    if (sessionStorage.getItem('priceRange')) {
        const array = JSON.parse(sessionStorage.getItem('priceRange') as string)
        setRange(array)
    }
    else{
        sessionStorage.setItem('priceRange', JSON.stringify(range));
    }
    if (sessionStorage.getItem('selectedOption')) {
        setSelectedOption(sessionStorage.getItem('selectedOption') as string)
    }
    else{
        sessionStorage.setItem('selectedOption', selectedOption);
    }
  },[])

  function closefilter() {
    const filterSec = document.querySelector(".filterSec") as HTMLDivElement;
    filterSec.style.display = "none";
    props.clicked();
  }

  useEffect(()=>{
    setFilterSetting((s)=> s = {
        range: range,
        option: selectedOption
    } )
  }, [range, selectedOption])

  const handleRangeChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setRange(newValue);
      sessionStorage.setItem('priceRange', JSON.stringify(newValue));
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
    // Store the selected option in sessionStorage
    sessionStorage.setItem('selectedOption', newOption);
  };

  const handleFiltered = ()=>{
    sessionStorage.setItem('filterSetting', JSON.stringify(filterSetting));
    closefilter()
  }

  return (
    <div className={`filterSec`}>
      <Image
        src="/images/icon-close-menu.svg"
        alt="icon-close-menu"
        width={15}
        height={15}
        className="icon-close-filter"
        onClick={closefilter}
      />

      <label htmlFor="priceRange">Price Range:</label>
      <Slider
        range
        min={0}
        max={1000000}
        value={range}
        onChange={handleRangeChange}
      />

      <span className="range">
        {range[0]} to {range[1]}
      </span>

      <label htmlFor="orderSelect">Order By:</label>
      <select id="orderSelect" name="orderSelect" value={selectedOption} onChange={handleOptionChange}>
        <option value="default">Default</option>
        <option value="ascending">Price: Low to High</option>
        <option value="descending">Price: High to Low</option>
        <option value="alphabetical">Alphabetical</option>
      </select>


      <button className="filterBtn" onClick={handleFiltered}>Filter</button>
    </div>
  );
}
