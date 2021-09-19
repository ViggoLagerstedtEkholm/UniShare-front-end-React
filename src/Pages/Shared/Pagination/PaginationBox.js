import {useState} from "react";

function PaginationBox({totalPages, onNextPage, onPreviousPage, onGoToPage, page}) {
    const nextPage = e =>{
        e.preventDefault();
        onNextPage();
    }

    const previousPage = e =>{
        e.preventDefault();
        onPreviousPage();
    }

    const goToPage = e =>{
        e.preventDefault();
        const pageNumber = e.target.pageNR.value;
        onGoToPage(pageNumber);
    }

    return (
        <div className="content-pagination">
            {totalPages > 1 ?
                <div>
                    <div className="content-pagination-bar">
                        <div>
                            {page > 1 ? <form onSubmit={previousPage}>
                                <button type="submit" className="pagination-button">🡸</button>
                            </form>: null}

                        </div>
                        <div>
                            {page <= totalPages - 1 ? <form onSubmit={nextPage}>
                                <button type="submit" className="pagination-button">🡺</button>
                            </form>: null}

                        </div>
                    </div>
                    <form onSubmit={goToPage}>
                        <input className="user-input-text" type="number" name="pageNR" placeholder="PAGE INDEX" required/>
                        <input className="button-style-4" type="submit" name="submit" value="Go to page"/>
                    </form>
                </div>: null
            }
        </div>
    );
}

export default PaginationBox;
