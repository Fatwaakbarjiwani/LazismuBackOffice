import { useDispatch, useSelector } from "react-redux";
import { setPageNumber2 } from "../redux/reducers/campaignReducer";

function PageNumber2() {
  const { page2 } = useSelector((state) => state.campaign);
  // const page2 = 10;
  const limit = page2;
  const pages = Array.from({ length: limit }, (_, index) => index + 1);

  const dispatch = useDispatch();
  const { pageNumber2 } = useSelector((state) => state.campaign);

  const handlePage = (value) => {
    dispatch(setPageNumber2(value));
  };

  const renderPagination = () => {
    if (pages.length < 1) {
      return null;
    }

    const currentIndex = pages.indexOf(pageNumber2);
    const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
    const nextPage =
      currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

    return (
      <>
        {page2 > 1 && (
          <nav
            aria-label="Page navigation example"
            className="flex justify-center gap-4 items-end"
          >
            <ul className="inline-flex -space-x-px text-sm">
              {prevPage !== null && (
                <li key={prevPage}>
                  <button
                    className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 text-gray-500 bg-white hover:bg-orange-400 hover:text-white`}
                    onClick={() => handlePage(prevPage)}
                  >
                    {prevPage}
                  </button>
                </li>
              )}

              <li key={pageNumber2}>
                <button
                  className={`text-lg flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${"text-white bg-orange-400 hover:bg-orange-400 hover:text-gray-700"}`}
                  onClick={() => handlePage(pageNumber2)}
                >
                  {pageNumber2}
                </button>
              </li>

              {nextPage !== null && (
                <li key={nextPage}>
                  <button
                    className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 text-gray-500 bg-white hover:bg-orange-400 hover:text-white`}
                    onClick={() => handlePage(nextPage)}
                  >
                    {nextPage}
                  </button>
                </li>
              )}
            </ul>
          </nav>
        )}
      </>
    );
  };

  return <div>{renderPagination()}</div>;
}

export default PageNumber2;
