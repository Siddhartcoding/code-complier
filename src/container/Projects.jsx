import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MdBookmark } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { SET_UPDATE_PROJECT } from "../context/actions/updateProjectAction";
import { Alert } from "../components";
const Projects = () => {
  const projects = useSelector((state) => state.projects?.projects);
  const [filtered, setFiltered] = useState(null);

  const searchTerm = useSelector((state) =>
    state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : ""
  );
  useEffect(() => {
    if (searchTerm?.length > 0) {
      setFiltered(
        projects?.filter((project) => {
          const lowerCaseItem = project?.title.toLowerCase();
          return searchTerm
            .split("")
            .every((letter) => lowerCaseItem.includes(letter));
        })
      );
    } else {
      setFiltered(null);
    }
  }, [searchTerm]);

  return (
    <div
      className="w-full py-6 flex  items-center justify-center gap-6
  flex-wrap "
    >
      {filtered ? (
        <>
          {filtered &&
            filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </>
      ) : (
        <>
          {projects &&
            projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </>
      )}
    </div>
  );
};
const ProjectCard = ({ project, index }) => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const projectDetails = project;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  useEffect(() => {
    setInterval(() => {
      setShowAlert(false);
    }, 4000);
  }, [showAlert]);
  const handleProjectDetails = () => {
    if (user) {
      dispatch(SET_UPDATE_PROJECT(project));
      if (project.user?.email === user?.email) {
        navigate("/updateProject");
      }
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && <Alert status={"Warning"} alertMsg={"Login First.."} />}
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        onClick={handleProjectDetails}
        className="w-full cursor-pointer md:w-[450px] h-[375px] bg-secondary
      p-4 rounded-md flex flex-col items-center justify-center gap-4"
      >
        <div
          className="bg-primary w-full h-full rounded-md overflow-hidden"
          style={{ overflow: "hidden", height: "100%" }}
        >
          <iframe
            title="Result"
            srcDoc={project.output}
            style={{ border: "none", width: "100%", height: "100%" }}
          />
        </div>
        <div className="flex items-center justify-start gap-3 w-full">
          {/* image */}
          <div
            className="w-14 h-14 flex items-center justify-center rounded-xl 
        overflow-hidden cursor-pointer bg-emerald-500"
          >
            {project?.user?.photoURL ? (
              <>
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  src={project?.user?.photoURL}
                  alt={project?.user?.displayName}
                  referrerPolicy="no-referrer "
                  className="w-full h-full object-cover"
                />
              </>
            ) : (
              <p className="text-xl text-white font-semibold capitalize ">
                {project?.user?.email[0]}
              </p>
            )}
          </div>
          {/* name */}
          <div>
            <p className="text-white text-lg capitalize">{project?.title}</p>
            <p className="text-primaryText text-sm capitalize">
              {project?.user?.displayName
                ? project?.user?.displayName
                : `${project?.user.email.split("@")[0]}`}
            </p>
          </div>
          {/* collection */}
          <motion.div
            className="current-pointer ml-auto"
            whileTap={{ scale: 0.9 }}
          >
            <MdBookmark className="text-primaryText text-3xl" />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
export default Projects;
