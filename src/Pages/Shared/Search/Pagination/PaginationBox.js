import {useState} from "react";

function PaginationBox({totalPages, onNextPage, onPreviousPage, onGoToPage, page}) {
    const [toPage, setToPage] = useState();

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
        onGoToPage(toPage);
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
                        <input className="user-input-text" placeholder="PAGE INDEX" required
                            value={toPage}
                            onChange={e => {
                                setToPage(e.target.value);
                            }}/>

                        <input className="button-style-4" type="submit" value="Go to page"/>
                    </form>

                </div>: null
            }
        </div>
    );
}

export default PaginationBox;
