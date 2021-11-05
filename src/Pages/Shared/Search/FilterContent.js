import {useEffect, useState} from "react";
import FilterBox from "./FilterBox";
import PaginationBox from "./Pagination/PaginationBox";
import Search from "./Search";
import {Info} from "./Pagination/Info";
import Message from "../Files/Message";
import {Loading} from "../State/Loading";

const FilterContent = ({APIEndPoint, startFilter, options, displayBox, showFilterBox}) => {
    const [message, setMessage] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);
    const [update, setUpdate] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState();
    const [resultsPerPage, setResultsPerPage] = useState();
    const [pageFirstResultIndex, setPageFirstResultIndex] = useState();
    const [total, setTotal] = useState(0);
    const [result, setResult] = useState([]);

    const [paginationLoading, setPaginationLoading] = useState(false);

    const DisplayBox = displayBox;

    useEffect(() => {
        doSearch();
    }, [startFilter.Page, startFilter.ResultsPerPage, startFilter.Option, startFilter.Order, result.data, update])

    const onSetFilters = (filter) => {
        setHasLoaded(false);
        startFilter.Page = filter.Page;
        startFilter.ResultsPerPage = filter.ResultsPerPage;
        startFilter.Option = filter.Option;
        startFilter.Order = filter.Order;
        startFilter.Search = filter.Search;
        doSearch();
        doUpdate();
    }

    const doUpdate = () =>{
        setUpdate(update + 1);
    }

    const onGoToPage = (page) => {
        if(page > numberOfPages || page < 1){
            startFilter.Page = 1;
        }else{
            startFilter.Page = parseInt(page, 10);;
        }
        setPaginationLoading(true);
        doSearch();
    }

    const onNextPage = () =>{
        startFilter.Page = startFilter.Page + 1;
        setPaginationLoading(true);
        doSearch();
    }

    const onPreviousPage = () =>{
        startFilter.Page = startFilter.Page - 1;
        setPaginationLoading(true);
        doSearch();
    }

    const doSearch = () => {
        Search(APIEndPoint, startFilter).then(response => {
            const result = response.data;
            const pagination = result['pagination']
            setNumberOfPages(pagination['totalPages']);
            setPageFirstResultIndex(pagination['pageFirstResultIndex']);
            setResultsPerPage(pagination['resultsPerPage']);
            setTotal(result['totalMatches']);
            setResult(result);
            setHasLoaded(true);
            setPaginationLoading(false);
        }).catch(error => {
            setMessage("Could not fetch! : " + error.msg);
        });
    }

    return (
        <div>
            <FilterBox options={options} onSetFilters={onSetFilters} showFilterBox={showFilterBox} doUpdate={doUpdate}/>

            {hasLoaded ? (message ? <Message msg={message}/> :
                    <div className="display-result-box">

                        <Info totalPages={numberOfPages}
                              page={startFilter.Page}
                              resultsPerPage={resultsPerPage}
                              pageFirstResultIndex={pageFirstResultIndex}
                              total={total}
                        />

                        <DisplayBox results={result} doUpdate={doUpdate} filter={startFilter}/>
                    </div>
            ) : <div className="display-result-box">
                <Loading/>
            </div>
            }

            {paginationLoading ? <div>
                    <hr/>
                    <Loading/>
                </div>:
                <PaginationBox totalPages={numberOfPages} onGoToPage={onGoToPage} onNextPage={onNextPage} onPreviousPage={onPreviousPage} page={startFilter.Page}/>
            }
        </div>
    );
}

export default FilterContent;