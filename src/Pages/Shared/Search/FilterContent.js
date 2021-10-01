import {useEffect, useState} from "react";
import FilterBox from "./FilterBox";
import PaginationBox from "../Pagination/PaginationBox";
import Search from "./Search";
import {Info} from "../Pagination/Info";
import Message from "../Files/Message";

const FilterContent = ({APIEndPoint, startFilter, options, displayBox, showFilterBox}) => {
    const [filter, setFilter] = useState(startFilter);
    const [message, setMessage] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);
    const [page, setPage] = useState(1);

    const [update, setUpdate] = useState(1);

    const [number_of_pages, setNumber_of_pages] = useState(1);
    const [results_per_page_count, setResults_per_page_count] = useState(1);
    const [start_page_first_result, setStart_page_first_result] = useState(1);
    const [total, setTotal] = useState(0);

    const [result, setResult] = useState([]);

    const DisplayBox = displayBox;

    useEffect(() => {
        doSearch();
    }, [page, filter, result.data, update])

    const onSetFilters = (filter) => {
        setHasLoaded(false);
        setFilter(filter);
        setPage(1);
        doSearch();
    }

    const doUpdate = () =>{
        setUpdate(update + 1);
    }

    const onGoToPage = (page) => {
        if(page > number_of_pages || page < 1){
            setPage(1);
        }else{
            setPage(page);
        }
        doSearch();
    }

    const onNextPage = () =>{
        setPage(page + 1);
        doSearch();
    }

    const onPreviousPage = () =>{
        setPage(page - 1);
        doSearch();
    }

    const doSearch = () => {
        filter['page'] = page;
        filter['ID'] = startFilter['ID'];
        console.log("ID: " + filter['ID']);
        Search(APIEndPoint, filter, page).then(response => {
            console.log("Response: " + response);
            const result = response.data;
            setNumber_of_pages(result['number_of_pages']);
            setStart_page_first_result(result['start_page_first_result']);
            setResults_per_page_count(result['results_per_page_count']);
            setTotal(result['total']);
            setResult(result);
            setHasLoaded(true);
        }).catch(error => {
            console.log("Error: " + error);
            setMessage("Could not fetch users! : " + error.msg);
        });
    }

    return (
        <div>
            <FilterBox options={options} onSetFilters={onSetFilters} showFilterBox={showFilterBox} doUpdate={doUpdate}/>

            {hasLoaded ? (message ? <Message msg={message}/> :
                    <div className="display-result-box">

                        <Info number_of_pages={number_of_pages}
                              page={page}
                              results_per_page_count={results_per_page_count}
                              start_page_first_result={start_page_first_result}
                              total={total}
                        />

                        <DisplayBox results={result} doUpdate={doUpdate} filter={filter}/>
                    </div>
            ) : <div className="display-result-box">
                <h4>Loading...</h4>
            </div>
            }

            <PaginationBox totalPages={number_of_pages} onGoToPage={onGoToPage} onNextPage={onNextPage} onPreviousPage={onPreviousPage} page={page}/>
        </div>
    );
}

export default FilterContent;