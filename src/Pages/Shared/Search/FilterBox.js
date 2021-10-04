import {useState} from "react";
import FilteringInfo from "./FilteringInfo";

function FilterBox({options, onSetFilters, showFilterBox}) {
    const[state, setState] = useState(showFilterBox);
    const[showFilteringInfo, setShowInfoFiltering] = useState(!showFilterBox);
    const[filterOrder, setFilterOrder] = useState("");
    const[filterOption, setFilterOption] = useState("");
    const[search, setSearch] = useState("");
    const[results_per_page_count, setResults_per_page_count] = useState(7);

    const toggle = () =>{
        if(state){
            setState(false);
            setShowInfoFiltering(true);
        }else{
            setState(true);
            setShowInfoFiltering(false);
        }
    }

    const onSubmit = e =>{
        e.preventDefault();
        const filterOption = e.target.filterOption.value;
        const filterOrder = e.target.filterOrder.value;
        const search = e.target.search.value;
        const results_per_page_count = parseInt(e.target.results_per_page_count.value);
        const page = 1;

        setFilterOption(filterOption);
        setFilterOrder(filterOrder);
        setSearch(search);
        setResults_per_page_count(results_per_page_count);

        const filters = {page: page, filterOption: filterOption, filterOrder: filterOrder, search: search, results_per_page_count: results_per_page_count, ID: null};

        onSetFilters(filters);
        toggle();
    }

    function renderOptions(){
        return Array.from(options).map(([key, value]) => {
            return (
                <option value={value}>{key}</option>
            )
        });
    }

    return (
        <div>
            <button className="button-style-4" onClick={toggle}> Toggle filtering.</button>
            {state ?  <form onSubmit={onSubmit}>
                <div className="content-filter-box filter-background-box">
                    <div className="row ">
                        <div className="column filter-input-background">
                            <p>
                                Select filter option
                            </p>
                            <select className="content-filter-select" name="filter_option" id="filterOption">
                                {renderOptions()}
                            </select>
                        </div>

                        <div className="column filter-input-background">
                            <p>
                                Results per page
                            </p>
                            <select className="content-filter-select" name="results_per_page_count" id="results_per_page_count">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7" selected="selected">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column filter-input-background">
                            Search
                            <input className="user-input-text" id="search" type="text" name="search"
                                   placeholder="Search"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column filter-input-background">
                            <p>
                                Filter order
                            </p>
                            <select id="filterOrder" className="content-filter-select" name="filterOrder">
                                <option value="ASC">ASC</option>
                                <option value="DESC">DESC</option>
                            </select>
                        </div>
                    </div>

                    <button className="button-style-4" type="submit" name="filter_button" value="GO">Filter</button>
                </div>
            </form>: null}

            {
                showFilteringInfo ? <FilteringInfo filterOrder={filterOrder} filterOption={filterOption} search={search} results_per_page_count={results_per_page_count}/> : null
            }

        </div>
    );
}

export default FilterBox;