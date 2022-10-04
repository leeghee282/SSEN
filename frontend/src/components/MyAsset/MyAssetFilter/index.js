import React from "react";
import "./style.css";

const Filter = (props) => {
    const filterChangeHandler = (event) => {
        
        props.onChangeFilter(event.target.value);
        
    }
    
    return (
        <select
            className="filter"
            id="filter"
            name="filter"
            value={props.filterBaseCode}
            onChange={filterChangeHandler}
            title="국가"
            aria-label="국가를 선택하세요."
        >
            <option value="All">전체</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="CNY">CNY</option>
            <option value="JPY">JPY</option>
        </select>
    );
};

export default Filter;