import axios from "axios";
import { useEffect, useState } from "react";
import left from './img/left.svg';
import right from './img/right.svg';

const Trending = () => {
  const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/top_rated", {
        params: {
          api_key: "11cedbb1d6d79381b452e2fdec102159",
        },
      })
      .then((response) => {
        if (response.status !== 200) throw new Error("Could not fetch");
        console.log(response.data.results);
        setData(response.data.results);
        setDisplayedData(response.data.results.slice(startIndex, startIndex + 5));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [startIndex]);

  const handleLoadMore = () => {
    setStartIndex((prevIndex) => prevIndex + 5);
  };

  const handleReturnToFirstSlice = () => {
    setStartIndex(0);
  };


  return (
   <div>
      <div className="container flex-wrap mx-auto flex justify-between items-center mb-12">
        <div>
          <h3 className="text-[#FFF] text-4xl">Trending Now</h3>
        </div>
        <div>
          {startIndex > -4 && (
            <button
              className="bg-[#1F1F1F] hover:bg-[#1A1A1A] mr-4 text-white font-bold py-2 px-4 rounded"
              onClick={handleReturnToFirstSlice}
            >
              <img src={left} alt="Navigate to the Left" />
            </button>
          )}
          {data.length > startIndex +4 && (
            <button
              className="bg-[#1F1F1F] hover:bg-[#1A1A1A] text-white font-bold py-2 px-4 rounded"
              onClick={handleLoadMore}
            >
              <img src={right} alt="Navigate to the Right" />
            </button>
          )}
        </div>
      </div>
      <div className="flex grid-cols-5 justify-center mb-24">
        {displayedData.map((movie) => (
          <div key={movie.id} className="max-w-[250px] mx-2 my-4 overflow-hidden border gap-7 bg-[#1A1A1A]  border-[#262626] p-5 rounded-lg shadow-lg">
            <img
              className="w-[200px] h-[250px] bg-cover items-center "
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.backdrop_path}`}
              alt={`Backdrop of ${movie.original_title}`}
            />
            <div className=" py-4">
            
              <button className="text-[#999999] bg-[#141414] p-2 border-[#262626] rounded-3xl ">Release Date: {movie.release_date}</button>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
        }
export default Trending;









