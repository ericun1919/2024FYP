import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Navbar,
  Card,
  Input,
  CardHeader,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Chip,
  CardFooter,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  Tooltip
} from "@material-tailwind/react";


const TABLE_HEAD = ["ID", "Title", "Difficulty"];
 

const Challenges = () => {
    const [tableRows, setTableRows] = useState([]);
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
    }, []);


    const setQuestions = (qs) => {
      let temp = [];
      {qs.map(q   => {
        let t = {
          id: q.fields.challenges_id,
          title: q.fields.title,
          difficulty: q.fields.difficulty
        }
        console.log(t)
        temp.push(t);
      })}
      setTableRows(temp);

    }
    const navList = (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">
            Pages
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">
            Account
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">
            Blocks
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">
            Docs
          </a>
        </Typography>
      </ul>
    );
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
          setQuestions(response.data.records);
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
            <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            CodeArena
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>Log In</span>
            </Button>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Log In</span>
          </Button>
        </MobileNav>
      </Navbar>

      <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full">
        <video 
          src={process.env.PUBLIC_URL+"coding.mp4"}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="shadow-2xl">
            <h1 className="text-4xl text-center" style={{width:"45rem",color:"white"}}>
              Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.
            </h1>
           
          </div>
        </div>
      </div>
      </div>
      <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Problems list
            </Typography>
          </div>

        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ id, title, difficulty}, index) => {
              const isLast = index === tableRows.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
              
              return (

                <tr key={id}>
                  <td className={classes}>
                    <Link to={`/problems/?cid=${id}&user_id=1`}> 
                      <div className="flex items-center gap-3">

                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {id}
                          </Typography>

                      </div>
                    </Link>
                  </td>
                  <td className={classes}>
                    <Link to={`/problems/?cid=${id}&user_id=1`}> 
                      <div className="flex flex-col">
            
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {title}
                        </Typography>

                      </div>
                    </Link>
                  </td>
                  <td className={classes}>
                    <Link to={`/problems/?cid=${id}&user_id=1`}> 
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={difficulty}
                          color={difficulty == "Easy" ? "green" : difficulty == "Medium" ? "amber" : "red"}
                        />
                      </div>
                    </Link>
                  </td>
                  
                </tr>
                
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
      {/* {question.map(q   => {
          return(<div>
              <Link to={`/problems/?cid=${q.fields.challenges_id}&user_id=1`}> {q.fields.challenges_id}{q.fields.title}</Link>
          </div>)
      })} */}
        </>
    )
}
export default Challenges;