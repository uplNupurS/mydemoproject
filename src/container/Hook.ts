import { useState } from "react";
import React  from "react";

function Hook() {

  const[filter , setfilter]= useState([])

  const API_KEY = "26260741-df4d83d25b17ea22a47b7202e";
  const URL = "https://pixabay.com/api/";
  
  const getImages = (searchValue: string) => {

    if (searchValue) {

      const requestValues: object = {
        method: "GET",
        Headers: {
          "Content-Type": "application/json",
          // Authorization : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzk2ZWNmNmIzMWUzNTdkNDVkNjIyNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjQ3OTMxNDMwLCJleHAiOjE2NDgwMTc4MzB9.BkQKCFDVzrGsGb8wOkneDFwt7e7tR0J3znZ3dtj94PY"
        }, 
      };
      let url: string = `${URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&per_page=20&safesearch=true`;
      fetch(url, requestValues)
        .then((result:any) => {
          return result.json()
        })
        .then((result:any) => {
           console.log(result.hits, "resultprint");
           setfilter(result.hits)
        })
        .catch((err:any) =>{
          console.log(err , "error")
        }
        );
    }
  };
  return {
    getImages,
    filter,
  };
}

export default Hook;

// ${URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&per_page=20