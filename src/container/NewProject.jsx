import React, { useState, useEffect } from "react";
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import SplitPane from "react-split-pane";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Link } from "react-router-dom";
import logo from "../assits/logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { UserProfileDetails } from "../components";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { Alert } from "../components";

const NewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [isTittle, setIsTittle] = useState("");
  const [title, setTitle] = useState("Untitled");
  const user = useSelector((state) => state.user?.user);
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  const updateOutput = () => {
    const combineOutput = `
     <html>
       <head>
       <style> ${css}</style>
       </head>
       <body> 
       ${html}
       <script>${js} </script>       
       </body>
    </html>
    `;
    setOutput(combineOutput);
  };
  const saveProgram = async () => {
    const id = `${Date.now()}`;
    const _doc = {
      id: id,
      title: title,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user,
    };

    await setDoc(doc(db, "Projects", id), _doc)
      .then((res) => {
        setAlert(true);
      })
      .catch((err) => console.log(err));
    setInterval(() => {
      setAlert(false);
    }, 2000);
  };
  return (
    <>
      <div
        className=" w-screen h-screen flex flex-col items-start 
        justify-start overflow-hidden"
      >
        {/* ------alert section-------- */}
        <AnimatePresence>
          {alert && <Alert status={"Success"} alertMsg={"Project Saved.."} />}
        </AnimatePresence>
        {/*--------------- header section-----------*/}
        <header className=" w-full flex items-center justify-between px-12 py-4">
          <div className="flex items-center justify-center gap-6">
            <Link to={"home"}>
              <div className="w-full flex justify-start items-center">
                <img
                  src={logo}
                  alt="logo"
                  className="object-contain xl:w-[60px] h-auto sm:w-10"
                />
                <p className=" text-primaryText xl:text-2xl sm:text-sm font-bold">
                  CodeCraft
                </p>
              </div>
            </Link>
            <div className="flex flex-col items-start justify-start">
              {/* tittle */}
              <div className=" flex items-center justify-center gap-3">
                <AnimatePresence>
                  {isTittle ? (
                    <>
                      <motion.input
                        key={"TittleInput"}
                        type="text"
                        placeholder="Your Title"
                        className="px3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none "
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <motion.p
                        key={"tittleLabel"}
                        className="px-3 py-2 text-white text-lg"
                      >
                        {title}
                      </motion.p>
                    </>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {isTittle ? (
                    <>
                      <motion.div
                        key={"MdCheck"}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer"
                        onClick={() => setIsTittle(false)}
                      >
                        <MdCheck className="text-2xl text-emerald-500" />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        key={"MDEdit"}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer"
                        onClick={() => setIsTittle(true)}
                      >
                        <MdEdit className="text-2xl text-primaryText" />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              {/* follow section */}
              <div className="flex item-center justify-center px-3 -mt-2 gap-2">
                <p className=" text-primaryText text-sm">
                  {user?.displayName
                    ? user?.displayName
                    : `${user?.email.split("@")[0]}`}
                </p>
                <motion.p
                  whileTap={{ scale: 0.9 }}
                  className="text-[10px] bg-emerald-500 rounded-sm
                   px-2 py-[1px] text-primary font-semibold cursor-pointer"
                >
                  + Follow
                </motion.p>
              </div>
            </div>
          </div>
          {/*------------------user-section---------------------------*/}
          {user && (
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={saveProgram}
                className="px-6 py-4 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md"
              >
                Save
              </motion.button>
              <UserProfileDetails />
            </div>
          )}
        </header>

        {/* ------------ coding section----------- */}
        <div>
          {/*---------- horizontal --------- */}
          <SplitPane
            split="horizontal"
            minSize={100}
            maxSize={-100}
            defaultSize={"50%"}
          >
            {/* ---------top coding section------------ */}

            <SplitPane split="vertical" minSize={500}>
              {/*-------------- html code--------------- */}

              <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between">
                  <div className=" bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                    <FaHtml5 className="text-xl text-red-500 " />
                    <p className="text-xl text-primaryText font-semibold">
                      HTML
                    </p>
                  </div>

                  {/* icons-section */}

                  <div className="cursor-pointer flex items-center justify-center gap-4 px-4">
                    <FcSettings className="text-xl " />
                    <FaChevronDown className="text-xl text-primaryText" />
                  </div>
                </div>
                <div className="w-full px-2">
                  <CodeMirror
                    value={html}
                    height="600px"
                    extensions={[javascript({ jsx: true })]}
                    theme={"dark"}
                    onChange={(value, viewUpdate) => {
                      setHtml(value);
                    }}
                  />
                </div>
              </div>
              <SplitPane split="vertical" minSize={500}>
                {/* ------------------css code--------------------------*/}

                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className=" bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                      <FaCss3 className="text-xl text-sky-500 " />
                      <p className="text-xl text-primaryText font-semibold">
                        CSS
                      </p>
                    </div>
                    {/* icons-section */}
                    <div className="cursor-pointer flex items-center justify-center gap-4 px-4">
                      <FcSettings className="text-xl " />
                      <FaChevronDown className="text-xl text-primaryText" />
                    </div>
                  </div>
                  <div className="w-full px-2">
                    <CodeMirror
                      value={css}
                      height="600px"
                      extensions={[javascript({ jsx: true })]}
                      theme={"dark"}
                      onChange={(value, viewUpdate) => {
                        setCss(value);
                      }}
                    />
                  </div>
                </div>

                {/*---------------------- js code-----------------------*/}

                <div className="w-full h-full flex flex-col items-start justify-start">
                  <div className="w-full flex items-center justify-between">
                    <div className=" bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                      <FaJs className="text-xl text-yellow-500 " />
                      <p className="text-xl text-primaryText font-semibold">
                        JS
                      </p>
                    </div>

                    {/* icons-section */}

                    <div className="cursor-pointer flex items-center justify-center gap-4 px-4">
                      <FcSettings className="text-xl " />
                      <FaChevronDown className="text-xl text-primaryText" />
                    </div>
                  </div>
                  <div className="w-full px-2">
                    <CodeMirror
                      value={js}
                      height="600px"
                      extensions={[javascript({ jsx: true })]}
                      theme={"dark"}
                      onChange={(value, viewUpdate) => {
                        setJs(value);
                      }}
                    />
                  </div>
                </div>
              </SplitPane>
            </SplitPane>

            {/*---------- bottom result section------ */}
            <div
              className="bg-white"
              style={{ overflow: "hidden", height: "100%" }}
            >
              <iframe
                title="Result"
                srcDoc={output}
                style={{ border: "none", width: "100%", height: "100%" }}
              />
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
};

export default NewProject;
