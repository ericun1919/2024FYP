import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Challenges = () => {
    const [question, setQuestion] = useState([]);
    function getQuestion(){
        const options = {
          method: "GET",
          headers:{
            'Authorization': 'Bearer patmoq8DTm4O7fld6.02124127bdc35e447d740d5379f6f72f64e050a85ea77ef02992f83bfdba950c' 
          },
          url: 'https://api.airtable.com/v0/app1DeeRQNeaYG5m9/challenges?sort%5B0%5D%5Bfield%5D=challenges_id&sort%5B0%5D%5Bdirection%5D=asc',
        };
        axios
        .request(options)
        .then(function (response) {
          setQuestion(response.data.records);
          console.log(response.data.records)
        })
        .catch((err) => {
          let error = err.response ? err.response.data : err;
          // get error status
          console.log("catch block...", error);
        })
      }
    useEffect(()=>{
        getQuestion();
    }, [])
    return(
        <>
            
            {question.map(q => {
                return(<div>
                    <Link to={`/problems/?cid=${q.fields.challenges_id}&user_id=1`}> {q.fields.challenges_id}{q.fields.title}</Link>
                </div>)
            })}
        </>
    )
}
export default Challenges;