import React, { useEffect, useState, Fragment } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import LanguagesDropdown from "./LanguagesDropdown";
import ThemeDropdown from "./ThemeDropdown";
import FontSizeDropdown from "./FontSizeDropdown";
import { languageOptions } from "../constants/languageOptions";
import { themeOptions } from "../constants/themeOptions";
import { classnames } from "../utils/general";
import ReactDOM from 'react-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import {
  Accordion,
  AccordionHeader,
  AccordionBody
} from "@material-tailwind/react";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Submit from "./Submit";
import { useRef } from 'react';
import { redirect } from "react-router-dom";

const RAPID_API_URL = "https://judge0-ce.p.rapidapi.com/submissions"
const RAPID_API_HOST = "judge0-ce.p.rapidapi.com"
const RAPID_API_KEY = "fbe7df1e99msh10f296f62348e88p18ba83jsn4f2f578fb950"


const Landing = () => {
  
  const [fontSize, setFontSize] = useState(24);
  const [cInfo, setCInfo] = useState(null);
  const inputArea = document.querySelector('.inputarea');
  const [language, setLanguage] = useState(languageOptions[0]);
  const [theme, setTheme] = useState(themeOptions[1]);
  const [submitExpanded, setSubmitExpanded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({cid: -1, user_id: -1});
  const user_id = searchParams.get('user_id');
  const cid = searchParams.get('cid');
  const [PythonDefault, setPythonDefault] = useState('');
  const [testcase, setTestcase] = useState([]);
  const [code, setCode] = useState('');
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [compileOutputDetails, setCompileOutputDetails] = useState(null);
  const [submitOutputDetails, setSubmitOutputDetails] = useState([]);
  const [processing, setProcessing] = useState(null);
  const [submitting, setSubmitting] = useState(null);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");



  const onSelectChange = (sl) => {
    setLanguage(sl);
  };
  const onThemeSelectChange = (t1) => {
    setTheme(t1);
  }
  const onFontSizeSelectChange = (fs) => {
    setFontSize(fs.value);
  };

  function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
  }
  React.useEffect(() => {

    if (inputArea){
      inputArea.addEventListener("keydown", keyPress);
      return () => {
        inputArea.removeEventListener("keydown", keyPress);
      };
    }
  });

  const keyPress = (e) =>{
    if (e.key === "Enter" && e.ctrlKey === true ){
      handleCompile();
      console.log(customInput)
    }
  }

  // const navigate = useNavigate();
  // useEffect(() => {
  //   setInterval(pingServer, 5000);
  //   window.addEventListener("beforeunload", (ev) => 
  //   {  
  //     const options = {
  //       method: "POST",
  //       url: "https://api.bricks.academy/api:dIOXaIX5/online",
  //       data: {
  //           "lastonline": null,
  //           "s_id": 1
  //         },
  //       headers: {
  //       "content-type": "application/json",
  //       },
  //     };
  //     axios
  //     .request(options)
  //     .then(function (response) {
  //       setQuestion(response.data);
  //     })
  //     .catch((err) => {
  //       let error = err.response ? err.response.data : err;
  //       // get error status
  //       console.log("catch block...", error);
  //     });
  //     const date = new Date();
  //     console.log(date);
  //   });
  // }, []);


  
  // function handleRemoveQueryStrings() {
  //   navigate({
  //     pathname: window.location.pathname,
  //     search: '',
  //   });
  // }
  function handleThemeChange(th) {
    const theme = th;

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  
  function pingServer() {
    const date = new Date();
    const options = {
      method: "POST",
      url: "https://api.bricks.academy/api:dIOXaIX5/online",
      data: {
          "lastonline": date,
          "s_id": 2
        },
      headers: {
      "content-type": "application/json",
      },
    };
    axios
    .request(options)
    .then(function (response) {
      //pass
    })
    .catch((err) => {
      let error = err.response ? err.response.data : err;
      // get error status
      console.log("catch block...", error);
    });
  }
  const getTestcase = () =>{
    const options = {
      method: "GET",
      headers:{
        'Authorization': 'Bearer patmoq8DTm4O7fld6.02124127bdc35e447d740d5379f6f72f64e050a85ea77ef02992f83bfdba950c' 
      },
      url: 'https://api.airtable.com/v0/app1DeeRQNeaYG5m9/test_case/' + `?filterByFormula=challenges_id=${cid}`,
    };
    axios
    .request(options)
    .then(function (response) {
      console.log(response.data.records);
      setTestcase(response.data.records);
    })
    .catch((err) => {
      let error = err.response ? err.response.data : err;
      // get error status
      console.log("catch block...", error);
    })
  }
  useEffect(() => {
    getTestcase();
    getQuestion();
    // if (user_id > 0 && cid > 0){
    //   getQuestion();
    //   getSession();
    // }
    // handleRemoveQueryStrings();
  },[]);
  
  const getSession = () => {
    const options = {
      method: "POST",
      url: 'https://api.bricks.academy/api:session/problem_session',
      data: {
        "user_id": user_id,
        "problem_id": cid
      }
    };
    axios
    .request(options)
    .then(function (response) {
      setPythonDefault(response.data.code);
      setCode(response.data.code);
    })
    .catch((err) => {
      let error = err.response ? err.response.data : err;
      // get error status
      console.log("catch block...", error);
    })
  }

  function getQuestion(){
    const options = {
      method: "GET",
      headers:{
        'Authorization': 'Bearer patmoq8DTm4O7fld6.02124127bdc35e447d740d5379f6f72f64e050a85ea77ef02992f83bfdba950c' 
      },
      url: 'https://api.airtable.com/v0/app1DeeRQNeaYG5m9/challenges/' + `?filterByFormula=challenges_id=${cid}`,
    };
    axios
    .request(options)
    .then(function (response) {
      setCInfo(response.data.records[0].fields);
    })
    .catch((err) => {
      let error = err.response ? err.response.data : err;
      // get error status
      console.log("catch block...", error);
    })
  }


  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);


  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        setPythonDefault('');
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleSubmit = () => {
    setSubmitOutputDetails([]);
    setSubmitting(true);
    
    let form = []
    
    {testcase.map(t => {
      const newItem = {
        language_id: 71,
        // encode source code in base64
        expected_output: t.fields.output_code64,
        source_code: b64EncodeUnicode(code),
        stdin: t.fields.input_code64? t.fields.input_code64: null,
      }
      form.push(newItem);
    }
    )}
    console.log(form)
    const formData = {
      submissions: form
    }

    const options = {
      method: "POST",
      url: RAPID_API_URL + '/batch',
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": RAPID_API_HOST,
        "X-RapidAPI-Key": RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        let token = '';
        {response.data.map(d => {
          token = token + d.token + ',';
        })}

        checkStatus_Submit(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `too many requests`,
            10000
          );
        }
        setSubmitting(false);
        console.log("catch block...", error);
      });
  };

  const handleCompile = () => {
    setCompileOutputDetails("");
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: b64EncodeUnicode(code),
      stdin: b64EncodeUnicode(customInput),
    };

    const options = {
      method: "POST",
      url: RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": RAPID_API_HOST,
        "X-RapidAPI-Key": RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `too many requests`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": RAPID_API_HOST,
        "X-RapidAPI-Key": RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 1000);
        return;
      } else {
        setProcessing(false);
        setSubmitting(false);
        setCompileOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      setSubmitting(false);
      showErrorToast();
    }
  };

  const checkStatus_Submit = async (token) => {
    const options = {
      method: "GET",
      url: RAPID_API_URL + "/batch",
      params: { tokens: token, base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": RAPID_API_HOST,
        "X-RapidAPI-Key": RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let data = response.data.submissions;
      let processing = false
      {data.map(d => {
        if (d.status?.id === 1 || d.status?.id === 2){
          processing = true
        }
      })}

      // Processed - we have a result
      if (processing) {
        // still processing
        setTimeout(() => {
          checkStatus_Submit(token);
        }, 1000);
        return;
      } else {
        console.log(response.data.submissions)
        setProcessing(false);
        setSubmitting(false);
        setSubmitOutputDetails(response.data.submissions);
        // sendSubmit(response.data.submissions);
        showSuccessToast(`Compiled Successfully!`);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      setSubmitting(false);
      showErrorToast();
    }
  };

  useEffect(() => {
    defineTheme("oceanic-next");
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const sendSubmit = (submissions) => {
    if (checkSubmitStatus(submissions)){
      console.log(1)
      let submission = submissions[submissions.length - 1]
      const options = {
        headers: {
          "content-type": "application/json"
        },
        method: "POST",
        url: 'https://api.bricks.academy/api:problem/problem_submission',
        data: {
          "pid": cid,
          "user_id": user_id,
          "code": code,
          "code_base64": b64EncodeUnicode(code),
          "code_size": code.length,
          "token": submission.token,
          "execution_time": submission.time,
          "execution_memory": submission.memory
        }
      };
      axios
      .request(options)
      .then(function (response) {
        window.top.location.replace("https://www.codingclub.ai/problems");
      })
      .catch((err) => {
        console.log("err", err);
        setProcessing(false);
        showErrorToast();
      })
    }
  }
  const checkSubmitStatus = (submissions)=>{
    console.log(submissions)
    for (let i = 0; i < submissions.length; i++){
      if (submissions[i].status.description !== 'Accepted'){
        return false
      }
    }
    return true
  }
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "bottom-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const saveCode = () =>{
    const options = {
      method: "POST",
      url: 'https://api.bricks.academy/api:session/problem_session/c',
      data: {
        "user_id": user_id,
        "problem_id": cid,
        "code": code
      }
    };
    axios
    .request(options)
    .then(function (response) {
      //pass
    })
    .catch((err) => {
      let error = err.response ? err.response.data : err;
      // get error status
      console.log("catch block...", error);
    })
  }

 

  const handleSubmitExpand = () =>{
    if (submitExpanded == true){
      setSubmitExpanded(false)
    }else{
      setSubmitExpanded(true)
    }
    console.log(submitExpanded)
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex">
        <div className="flex flex-col w-[23%] border-r-2 bg-slate-50">
          {cInfo? <div className="flex p-3 flex-col">

            <div className="rounded-md bg-slate-100 p-2 mb-2">

                <h1 className="text-xl font-bold">
                  ProblemID: {cInfo.challenges_id}
                </h1>
                <h1 className='text-lg font-bold'>{cInfo.title}</h1>
                
            
            </div>

            <div className="rounded-md bg-slate-100 p-2 mb-2">

                <h1 className="text-xl font-bold">
                  Difficulty: {cInfo.difficulty}
                </h1>
                
        
            </div>

            <div className="rounded-md bg-slate-100 p-2 mb-2">

                <h1 className="text-xl font-bold">
                  Description: 
                </h1>
                <h1 className='text-sm font-bold'>{cInfo.description}</h1>
            
            </div>

            <div className="rounded-md bg-slate-100 p-2">

                <h1 className="text-xl font-bold">
                  Example: 
                </h1>
                <pre>
                  <h1 className='text-lg font-bold'>Input:</h1>
                  <p className="pl-2 m-0">
                    {cInfo.example_input}
                  </p>
                </pre>
                <pre>
                  <h1 className='text-lg font-bold m-0'>Output:</h1>
                  <p className="pl-2 m-0">
                    {cInfo.example_output}
                  </p>
                </pre>
            
            </div>

          </div> : ""}
        </div>
      
        <div className="flex pt-1 flex-col w-[77%]">
          <div className = "block w-[100%] px-3 py-1">
            <div className = "flex justify-between" style={{height:"6vh"}}>
              <div className="mr-2 mb-2">
                <LanguagesDropdown onSelectChange={onSelectChange} />
              </div>
              <div className="flex">
                <div className="mr-2 mb-2">
                  <FontSizeDropdown onSelectChange={onFontSizeSelectChange} />
                </div>
                <div className="mb-2">
                  <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
                </div>
              </div>

            </div>
          
            <div className="items-end codeWindow " style={{height:"58vh"}}>
                  <CodeEditorWindow
                    fontSize = {fontSize}
                    defaultValue = {PythonDefault}
                    code={code}
                    onChange={onChange}
                    language={language?.value}
                    theme={theme.value}
                  />
            </div>

            <div className='flex' style={{height:"34vh"}}>

                  <div className="relative w-[30%] mr-3">
                    <CustomInput
                      code = {code}
                      processing={processing}
                      sendData={handleCompile}
                      customInput={customInput}
                      setCustomInput={setCustomInput}
                    />
                  </div>

                  <OutputWindow compileOutputDetails={compileOutputDetails} />

              </div>
          </div>
          
          <div className = "w-[100%] px-4 py-1 md:w-[40%] md:fixed md:top-24 md:right-10">

    
          {(user_id > 0) && (cid > 0) &&
            <Fragment>
              <Submit 
              handleExpand={handleSubmitExpand}
              testcase={testcase} 
              code = {code}
              handleSubmit = {handleSubmit}
              submitOutputDetails = {submitOutputDetails}
              submitting = {submitting}
          />
          </Fragment>
          }
          </div>
        </div>
      </div>
  </>
  );
};
export default Landing;
