import { useDispatch, useSelector } from "react-redux";
import { setPageNumberDashboard } from "../redux/reducers/campaignReducer";
import { useState } from "react";

function PageNumberDashboard() {
  const dispatch = useDispatch();
  const [inputPage, setInputPage] = useState("");
  const { pageNumberDashboard } = useSelector((state) => state.campaign);
  const { pageDashboard } = useSelector((state) => state.campaign);
  // const page = 10;

  const handlePage = (value) => {
    if (value >= 1 && value <= pageDashboard) {
      dispatch(setPageNumberDashboard(value));
    }
  };

  const handleJumpToPage = (event) => {
    event.preventDefault();
    const page = Number(inputPage);
    if (page >= 1 && page <= page) {
      handlePage(page);
      setInputPage("");
    }
  };

  const renderPagination = () => {
    const pages = Array.from({ length: pageDashboard }, (_, index) => index + 1);
    if (pages.length < 1) {
      return null;
    }

    const currentIndex = pages.indexOf(pageNumberDashboard);
    const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
    const nextPage =
      currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

    return (
      <>
        {pageDashboard > 1 && (
          <nav
            aria-label="Page navigation example"
            className="flex items-center gap-4"
          >
            <ul className="inline-flex -space-x-px text-sm">
              {prevPage !== null && (
                <li key={prevPage}>
                  <button
                    className="flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 text-gray-500 bg-white hover:bg-orange-400 hover:text-white"
                    onClick={() => handlePage(prevPage)}
                  >
                    {prevPage}
                  </button>
                </li>
              )}

              <li key={pageNumberDashboard}>
                <button
                  className="text-lg flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 text-white bg-orange-400 hover:bg-orange-400 hover:text-gray-700"
                  onClick={() => handlePage(pageNumberDashboard)}
                >
                  {pageNumberDashboard}
                </button>
              </li>

              {nextPage !== null && (
                <li key={nextPage}>
                  <button
                    className="flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 text-gray-500 bg-white hover:bg-orange-400 hover:text-white"
                    onClick={() => handlePage(nextPage)}
                  >
                    {nextPage}
                  </button>
                </li>
              )}
            </ul>
            <form
              onSubmit={handleJumpToPage}
              className="flex items-center space-x-2"
            >
              <input
                type="number"
                value={inputPage}
                onChange={(e) => setInputPage(e.target.value)}
                className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Page"
                min="1"
                max={pageDashboard}
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-orange-400 rounded hover:bg-orange-500"
              >
                Jump
              </button>
            </form>
          </nav>
        )}
      </>
    );
  };

  return <div>{renderPagination()}</div>;
}

export default PageNumberDashboard;
