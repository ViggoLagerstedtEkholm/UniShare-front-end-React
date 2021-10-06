function FilteringInfo({filterOption, filterOrder, search, results_per_page_count}) {
    return (
        <div className="search-terms-container">
            <h1>Search terms</h1>
            <ul>
                {filterOption !== "" ?
                    <li>
                        <p><b>Filter option:</b> {filterOption}</p>
                    </li>
                    : <p><b>Filter order:</b> Default </p>
                }

                {filterOrder !== "" ?
                    <li>
                        <p><b>Filter order:</b> {filterOrder}</p>
                    </li>
                    : <p><b>Filter order:</b> DESC </p>
                }

                {search !== "" ?
                    <li>
                        <p><b>Search:</b> {search}</p>
                    </li>
                    : null
                }

                <li>
                    <p><b>Results per page:</b> {results_per_page_count}</p>
                </li>
            </ul>
        </div>
    );
}

export default FilteringInfo;