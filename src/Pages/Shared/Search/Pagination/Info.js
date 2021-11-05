export const Info = ({totalPages, page, resultsPerPage, pageFirstResultIndex, total}) => {
    return (
        <>
            <p className="txt-small">
                Total amount of results: {total}
            </p>
            <p className="txt-small">
                Total page count: {totalPages}
            </p>

            <p className="txt-small">
                Page index: {page}
            </p>

            <p className="txt-small">
                Range: {pageFirstResultIndex + 1} - {pageFirstResultIndex + resultsPerPage}
            </p>
        </>
    );
}