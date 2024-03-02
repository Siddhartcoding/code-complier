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
const NewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [isTittle, setIsTittle] = useState("");
  const [title, setTitle] = useState("Untitled");

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

  return (
    <>
      <div
        className=" w-screen h-screen flex flex-col items-start 
        justify-start overflow-hidden"
      >
        {/* ------alert section-------- */}

        {/*--------------- header section-----------*/}
        <header className=" w-full flex items-center justify-between px-12 py-4">
          <div className="flex items-center justify-center gap-6">
            <Link to={"/home/projects"}>
              <img
                src={logo}
                alt="logo"
                className="bg-white object-contain w-32 h-auto"
              />
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
                        className="px3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none"
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
            </div>
          </div>
          {/*------------------- user-section ------------------------------*/}
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
