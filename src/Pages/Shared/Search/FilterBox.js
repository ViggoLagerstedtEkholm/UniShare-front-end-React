import {useState} from "react";
import FilteringInfo from "./FilteringInfo";

function FilterBox({options, onSetFilters, showFilterBox}) {
    const [state, setState] = useState(showFilterBox);
    const [showFilteringInfo, setShowInfoFiltering] = useState(!showFilterBox);
    const [Order, setOrder] = useState("");
    const [Option, setOption] = useState("");
    const [search, setSearch] = useState("");
    const [resultsPerPage, setResultsPerPage] = useState(7);

    const toggle = () => {
        if (state) {
            setState(false);
            setShowInfoFiltering(true);
        } else {
            setState(true);
            setShowInfoFiltering(false);
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        const Option = e.target.Option.value;
        const Order = e.target.Order.value;
        const Search = e.target.Search.value;
        const ResultsPerPage = parseInt(e.target.ResultsPerPage.value);
        const Page = 1;

        setOption(Option);
        setOrder(Order);
        setSearch(Search);
        setResultsPerPage(ResultsPerPage);

        const filters = {Page: Page, Option: Option, Order: Order, Search: search, ResultsPerPage: resultsPerPage};
        onSetFilters(filters);
        toggle();
    }

    function renderOptions() {
        return Array.from(options).map(([key, value]) => {
            return (
                <option value={value}>{key}</option>
            )
        });
    }

    return (
        <div>
            <button className="button-style-4" onClick={toggle}> Toggle filtering.</button>
            {state ? <form onSubmit={onSubmit}>
                <div className="content-filter-box filter-background-box">

                    <div className="row">
                        <div className="column">
                            <div className="column filter-input-background">
                                <div className="filter-text">
                                    Select filter option
                                </div>
                                <select className="content-filter-select" name="Option" id="Option"
                                        value={Option} onChange={(e) => {
                                    setOption(e.target.value);
                                }}>
                                    {renderOptions()}
                                </select>
                            </div>
                        </div>

                        <div className="column">
                            <div className="column filter-input-background">
                                <div className="filter-text">
                                    Results per page
                                </div>
                                <select className="content-filter-select" name="ResultsPerPage" id="ResultsPerPage"
                                        value={resultsPerPage}
                                        onChange={(e) => {
                                            setResultsPerPage(e.target.value);
                                        }}>
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

                        <div className="column">
                            <div className="column filter-input-background">
                                <div className="filter-text">
                                    Filter order
                                </div>
                                <select id="filterOrder" className="content-filter-select" name="Order" value={Order}
                                        onChange={(e) => {
                                            setOrder(e.target.value);
                                        }}>
                                    <option value="Ascending">Ascending</option>
                                    <option value="Descending" selected>Descending</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="column filter-input-background">
                            <div className="filter-text">
                                Search
                            </div>
                            <input className="user-input-text" id="search" type="text" name="Search"
                                   placeholder="Search"
                                   value={search}
                                   onChange={(e) => {
                                       setSearch(e.target.value);
                                   }}
                            />
                        </div>
                    </div>

                    <button className="button-style-1" type="submit" name="filter_button" value="GO">Filter</button>
                </div>
            </form> : null}

            {
                showFilteringInfo ? <FilteringInfo filterOrder={Order} filterOption={Option} search={search}
                                                   results_per_page_count={resultsPerPage}/> : null
            }

        </div>
    );
}

export default FilterBox;