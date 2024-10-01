import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 20;

  
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://assignment.stage.crafto.app/getQuotes?limit=${quotesPerPage}&offset=${offset}`,
          { headers: { Authorization: token } }
        );

        const fetchedQuotes = response.data.data;

        if (fetchedQuotes.length === 0) {
          setHasMore(false);
        } else {
          setQuotes((prev) => [...prev, ...fetchedQuotes]);
          setOffset((prev) => prev + quotesPerPage);
        }
      } catch (err) {
        console.error("Error fetching quotes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [offset, token]);

  const startIndex = (currentPage - 1) * quotesPerPage;
  const currentQuotes = quotes.slice(startIndex, startIndex + quotesPerPage);
  const totalPages = Math.ceil(quotes.length / quotesPerPage);

  const handleLogout = () => {

    localStorage.removeItem("token");
    navigate("/"); 
  };

  const handleCreateQuote = () => {

    navigate("/create-quote"); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-100 mb-4 sm:mb-0">Quotes</h1>
        {token && (
          <div className="flex space-x-4">
            <button
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-lg transition duration-200 hover:opacity-90 transform hover:scale-105"
              onClick={handleCreateQuote}
            >
              Create Quote
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentQuotes.map((quote) => (
          <div
            key={quote.id}
            className="relative bg-gray-800 shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105"
          >
            {quote.mediaUrl && (
              <img
                src={quote.mediaUrl}
                className="w-full h-40 object-cover rounded-t-2xl"
                alt="Quote"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-gray-100 font-bold p-4">
              {quote.text}
            </div>
            <div className="p-4 text-gray-300">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg text-white hover:underline transition duration-200">
                  {quote.username}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(quote.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && <p className="text-center mt-6 text-gray-200">Loading...</p>}
      {!hasMore && <p className="text-center mt-6 text-gray-200">No more quotes</p>}

      <div className="flex justify-between items-center mt-8">
        <button
          className={`bg-purple-500 text-white 
            px-4 py-2 rounded-lg 
            ${currentPage === 1 ? 
                "opacity-50 cursor-not-allowed" : 
                "hover:bg-purple-600 transition duration-200"}`
            }
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-100">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`bg-purple-500 text-white px-4 py-2 rounded-lg 
            ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : 
                "hover:bg-purple-600 transition duration-200"}`}
          onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Quotes;
