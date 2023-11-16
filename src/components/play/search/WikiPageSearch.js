import axios from "axios";
import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

function WikiPageSearch(){
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const searchString = 'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&formatversion=2&search=';

  const onWikiSearch = async (query)=>{
    setLoading(true);
    axios.get(
      searchString+query
    ).then((res)=>{
      const resultArr = res.data;
      setOptions(resultArr.at(1));
      console.log(resultArr.at(1));
    }).catch((err)=>{
      console.log(err);
      setOptions([]);
    }).finally(()=>{
      setLoading(false);
    })
    
    
  }


  return(
      <AsyncTypeahead 
        id="wikiSearchBox"
        isLoading={loading}
        onSearch={onWikiSearch}
        options={options}
        delay={400}
      />
  );
}

export default WikiPageSearch;