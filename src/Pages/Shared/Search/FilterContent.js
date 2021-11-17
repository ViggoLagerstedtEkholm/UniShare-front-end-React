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
    const [pageFirstResultIndex, setPageFirstResultIndex] = useState();
    const [total, setTotal] = useState(0);
    const [result, setResult] = useState([]);

    const [page, setPage] = useState(startFilter.Page);
    const [resultsPerPage, setResultsPerPage] = useState(startFilter.ResultsPerPage);
    const [option, setOption] = useState(startFilter.Option);
    const [order, setOrder] = useState(startFilter.Order);
    const [search, setSearch] = useState(startFilter.Search);

    const [paginationLoading, setPaginationLoading] = useState(false);

    const DisplayBox = displayBox;

    useEffect(() => {
        doSearch();
    }, [page, resultsPerPage, order, result.data, update])

    const onSetFilters = (filter) => {
        const {Page, ResultsPerPage, Option, Order, Search} = filter;

        setHasLoaded(false);

        setPage(Page);
        setResultsPerPage(ResultsPerPage);
        setOption(Option);
        setOrder(Order);
        setSearch(Search);

        doUpdate();
    }

    const doUpdate = () =>{
        setUpdate(update + 1);
    }

    const onGoToPage = (page) => {
        if(page > numberOfPages || page < 1){
            setPage(1);
        }else{
            setPage(parseInt(page, 10));
        }
        setPaginationLoading(true);
    }

    const onNextPage = () =>{
        setPage(page + 1);
        setPaginationLoading(true);
    }

    const onPreviousPage = () =>{
        setPage(page - 1);
        setPaginationLoading(true);
    }

    const doSearch = () => {
        startFilter.Page = page;
        startFilter.Search = search;
        startFilter.Order = order;
        startFilter.Option = option;
        startFilter.ResultsPerPage = resultsPerPage;

        Search(APIEndPoint, startFilter).then(response => {
            const result = response.data;
            const pagination = result['pagination'];
            const {totalPages, pageFirstResultIndex, resultsPerPage, totalMatches} = pagination;

            setNumberOfPages(totalPages);
            setPageFirstResultIndex(pageFirstResultIndex);
            setResultsPerPage(resultsPerPage);
            setTotal(totalMatches);
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
            {hasLoaded ?
                (message ?
                        <div className="display-result-box">
                            <Message msg={message}/>
                        </div>
                :
                    <div className="display-result-box">

                        <Info totalPages={numberOfPages}
                              page={page}
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
                </div> :
                <PaginationBox totalPages={numberOfPages} onGoToPage={onGoToPage} onNextPage={onNextPage} onPreviousPage={onPreviousPage} page={page}/>
            }
        </div>
    );
}

export default FilterContent;