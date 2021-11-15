import React, { useReducer, useRef, useState } from 'react';
import { init, imgReducer, pageReducer } from "./store"
import { useFetch, useInfiniteScroll, useLazyLoading } from './hooks/customHooks'
import Card from './components/Card';
import Header from './components/Header';
import Search from './components/Search';
import './index.css';

function App() {
  const [query, setQuery] = useState(null)
  const [pager, pagerDispatch] = useReducer(pageReducer, { query: query, page: 0 })
  const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true, }, init)

  let bottomBoundaryRef = useRef(null);
  useFetch(query, pager, imgDispatch);
  useLazyLoading('.card-img-top', imgData.images)
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  return (
    <div className="main">
      <Header />
      <Search cb={setQuery} />

      <div id='images' className="container">
        <div className="row">
          {imgData.images.map((image, i) => {
            return (
              <Card {...image} key={i} />
            )
          })}
        </div>
      </div>

      {imgData.fetching && (
        <div className="text-center bg-secondary m-auto p-3">
          <p className="m-0 text-white">Loading images...</p>
        </div>
      )}
      <div id='page-bottom-boundary' style={{ border: '1px solid transparent' }} ref={bottomBoundaryRef}></div>
    </div>
  );
}

export default App;
