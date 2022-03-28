import { useState } from "react";
import React from "react";

function Hook() {
  const [filter, setfilter] = useState([]);
  const[loadingbar , setloadingbar]= useState(false)
  const[errormsg, seterrormsg]=useState("");
  const[sort ,setsort]=useState("")

  const API_KEY = "26260741-df4d83d25b17ea22a47b7202e";
  const URL = "https://pixabay.com/api/";

  const getImages = (searchValue: string) => {
    if (searchValue) {
      setloadingbar(true)
      const requestValues: object = {
        method: "GET",
        Headers: {
          "Content-Type": "application/json",
          // Authorization : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzk2ZWNmNmIzMWUzNTdkNDVkNjIyNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjQ3OTMxNDMwLCJleHAiOjE2NDgwMTc4MzB9.BkQKCFDVzrGsGb8wOkneDFwt7e7tR0J3znZ3dtj94PY"
        },
      };
      let url: string = `${URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&safesearch=true&per_page=25&order=latest`;
      fetch(url, requestValues)
        .then((result: any) => {
          return result.json();
        })
        .then((result: any) => {
          // console.log(result.hits, "resultprint");
          setloadingbar(false)
          setfilter(result.hits);

          if (result.hits.length > 0){
          setfilter(result.hits);
          seterrormsg("");
            
          }
          else {
            seterrormsg("No results found for - " + searchValue)
            // console.log(searchValue)
          }
        })
        .catch((err: any) => {
          console.log(err, "ERROR");
        });
    }
    else{
      // setfilter(result.totalhits)
    }
    
  };
  return {
    getImages,
    filter,
    loadingbar,
    errormsg,    
  };
}

export default Hook;

// ${URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&per_page=20
