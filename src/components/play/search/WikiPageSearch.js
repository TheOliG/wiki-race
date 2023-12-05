import axios from "axios";
import { useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

function WikiPageSearch( { setURL, setTitle } ){
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [optionLinks, setOptionLinks] = useState({});
  const [randomLoading, setRandomLoading] = useState(false);

  const baseString = 'https://en.wikipedia.org/w/api.php?origin=*';

  const onWikiSearch = (query)=>{
    setLoading(true);
    const params = {
      action: "opensearch",
      limit: "8",
      format: "json",
      formatversion: "2",
      search: query
    }
    let searchString = baseString;
    Object.keys(params).forEach((key)=>{searchString += "&" + key + "=" + params[key];});

    axios.get(
      searchString
    ).then((res)=>{
      const resultArr = res.data;
      const resultMap = {};

      // This maps all the names to a url
      for(var i = 0; i<resultArr[1].length; i++){
        resultMap[resultArr[1][i]] = resultArr[3][i]
      }

      setOptionLinks(resultMap);
      setOptions(resultArr[1]);
    }).catch((err)=>{
      console.log(err);
      setOptions([]);
    }).finally(()=>{
      setLoading(false);
    })
  }

  const handleSelection = (s)=>{
    if(s in optionLinks){
      setURL(optionLinks[s]);
      setTitle(s);
    }
    else{
      setURL('');
      setTitle('');
    }
    setSelected(s);
  }

  const handleRandom = ()=>{
    setRandomLoading(true);

    const params = {
      action: "query",
      grnnamespace: "0",
      format: "json",
      generator: "random",
      formatversion: "2",
      prop: "info|extracts",
      inprop: "url",
    }
    let searchString = baseString;
    Object.keys(params).forEach((key)=>{searchString += "&" + key + "=" + params[key];});
    
    axios.get(searchString).then((res)=>{
      setURL(res.data.query.pages[0].canonicalurl);
      setTitle(res.data.query.pages[0].title);
      setSelected([res.data.query.pages[0].title]); 
    }).catch((err)=>{
      console.log('Error getting random page: ' + err);
    }).finally(()=>{
      setRandomLoading(false);
    })

    
  }


  return(
    <InputGroup>
      <AsyncTypeahead 
        style={{"flex":1}}
        id="wikiSearchBox"
        isLoading={loading}
        onSearch={onWikiSearch}
        onChange={handleSelection}
        options={options}
        delay={400}
        selected={selected}
      />
      <Button variant="outline-secondary" onClick={handleRandom} disabled={randomLoading}>
        Randomise
      </Button>
    </InputGroup>
      
  );
}

export default WikiPageSearch;