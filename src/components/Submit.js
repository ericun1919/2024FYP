import React from "react";
import { useEffect, useState } from "react";
import { CAccordionBody } from '@coreui/react';
import { CAccordionHeader } from '@coreui/react';
import { CAccordionItem } from '@coreui/react';
import { CAccordion } from '@coreui/react';
import { classnames } from "../utils/general";

const Submit = ({ testcase ,code, handleSubmit, submitOutputDetails, submitting, handleExpand}) => {

    const [tc, setTc] = useState(null);
    const switchTestcase = (i) =>{
        if (tc && tc === testcase[i]){
            setTc(null);
        } else{
            setTc(testcase[i]);
        }
    }

    async function copyTextToClipboard() {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(b64DecodeUnicode(tc.fields.input_code64));
        } else {
          return document.execCommand('copy', true, b64DecodeUnicode(tc.fields.input_code64));
        }
    }

    function b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
    const getTestcase = () =>{
        return(
            <div className = "flex flex-col">
                <br></br>

                <div className= "flex justify-between font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
                    <div>
                        Input
                    </div>
                    <div>
                        <button onClick={copyTextToClipboard}>
                            <img className ='h-5 inline-block mb-1' src={process.env.PUBLIC_URL  + `/copy.png`}></img>
                        </button>
                    </div>

                </div>
                <pre className="px-2 py-2 w-full h-24 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
                    {b64DecodeUnicode(tc.fields.input_code64)}
                </pre>
                <br></br>
                <div className= "font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
                    Output
                </div>
                <pre className="px-2 py-2  w-full h-24 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
                    {tc.fields.visible? b64DecodeUnicode(tc.fields.output_code64): 'Hidden'}
                </pre>
                <br></br>
                <div className= "font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
                    Status
                </div>
                <div>
                    {submitOutputDetails.length > 0 ? submitOutputDetails[testcase.indexOf(tc)].status?.description : "-"}
                </div>
            </div>
        )
    }
    return (
        <CAccordionItem itemKey={3}>
            <CAccordionHeader onClick={handleExpand}><span className="font-bold"><img className ='h-5 inline-block mr-1 mb-1'src={process.env.PUBLIC_URL  + `/submit.png`}></img>Submit</span></CAccordionHeader>
                <CAccordionBody>
                <div className=" overflow-y-auto" style={{height:"35rem"}}>
                    
                <div className='flex flex-col '>
                <button
                    onClick={handleSubmit}
                    disabled={!code || submitting} 
                    className={classnames(
                    "ml-auto border-2 border-black z-10 rounded-md px-1 py-2 w-[30%]",
                    !code ? "opacity-50" : ""
                    )}
                >
                    {submitting? <div className="items-center ml-1">{'Processing'}<img className ='h-5 inline-block mb-1'src={process.env.PUBLIC_URL  + `/processing.gif`}></img></div> : "Run"}
                </button>
                <br></br>
                <div>
                {testcase.map(t => {
                return (
                    <button
                    onClick={() => switchTestcase(testcase.indexOf(t))}
                    className={classnames(
                    "m-2 border-2 border-black z-10 text-black rounded-md px-1 py-1 w-[25%] cursor-pointer",
                    !code ? "opacity-50" : "",
                    testcase.indexOf(t) === testcase.indexOf(tc)? "bg-slate-200":"",
                    submitOutputDetails.length < 1?  "border-inherit" : submitOutputDetails[testcase.indexOf(t)].status.description === 'Accepted'? "border-lime-600": "border-rose-600",
                    )}
                >
                    {t.fields.visible? <div>{'Testcase'}{testcase.indexOf(t) + 1}</div>:<div className='mr-1'><img className = "h-4 inline-block mb-1"src={process.env.PUBLIC_URL  + `/testcase_hidden.png`}></img>{'Testcase'}{testcase.indexOf(t) + 1}</div>}
                </button>
                );
                })}
                </div>
                </div>
                {(submitOutputDetails && tc) ? <>{getTestcase()}</> : null}
                </div>
            </CAccordionBody>
        </CAccordionItem>

  );
};

export default Submit;