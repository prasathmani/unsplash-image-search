import { useEffect, useCallback, useRef } from 'react';
import { createApi } from 'unsplash-js';
const unsplash = createApi({ accessKey: "j2y6B23X5elobbTY-bRdSqrI8867tLCTt09DuqGQFPE" });

// make API calls and pass the returned data via dispatch
export const useFetch = (query, data, dispatch) => {
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCHING_IMAGES', fetching: true })
      try {
        let res = await unsplash.search.getPhotos({ query: query, page: data.page, perPage: 12 });
        if (res.type === 'success') {
          res = res.response;
          dispatch({ type: 'STACK_IMAGES', images: res?.results })
          dispatch({ type: 'FETCHING_IMAGES', fetching: false })
        }
      }
      catch (err) {
        dispatch({ type: 'FETCHING_IMAGES', fetching: false })
        return err;
      }
    }
    if (query) {
      fetchData();
    } else {
      dispatch({ type: 'FETCHING_IMAGES', fetching: false })
    }
  }, [dispatch, query, data.page])
}

// infinite scrolling with intersection observer
export const useInfiniteScroll = (scrollRef, dispatch) => {
  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            dispatch({ type: 'ADVANCE_PAGE' });
          }
        });
      }).observe(node);
    },
    [dispatch]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);
}

// lazy load images with intersection observer
export const useLazyLoading = (imgSelector, items) => {
  const imgObserver = useCallback(node => {
    const intObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.intersectionRatio > 0) {
          const currentImg = en.target;
          const newImgSrc = currentImg.dataset.src;

          // only swap out the image source if the new url exists
          if (!newImgSrc) {
            console.error('Image source is invalid');
          } else {
            currentImg.src = newImgSrc;
          }
          intObs.unobserve(node);
        }
      });
    })
    intObs.observe(node);
  }, []);

  const imagesRef = useRef(null);

  useEffect(() => {
    imagesRef.current = document.querySelectorAll(imgSelector);

    if (imagesRef.current) {
      imagesRef.current.forEach(img => imgObserver(img));
    }
  }, [imgObserver, imagesRef, imgSelector, items])
}
