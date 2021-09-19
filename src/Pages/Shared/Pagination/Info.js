export const Info = ({number_of_pages, page, results_per_page_count, start_page_first_result, total}) => {
    return (
        <>
            <p className="txt-small">
                Total amount of results: {total}
            </p>
            <p className="txt-small">
                Total page count: {number_of_pages}
            </p>

            <p className="txt-small">
                Page index: {page}
            </p>

            <p className="txt-small">
                Range: {start_page_first_result + 1} - {start_page_first_result + results_per_page_count}
            </p>
        </>
    );
}