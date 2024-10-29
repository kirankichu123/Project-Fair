import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import SERVERURL from '../services/serverUrl';
import { editResponseContext } from '../contexts/ContextShare';
import { editProjectAPI } from '../services/allAPI';

const Edit = ({ project }) => {
  const { editResponse, setEditResponse } = useContext(editResponseContext);
  const [imageFileStatus, setImageFileStatus] = useState(false);
  const [preview, setPreview] = useState("");
  const [projectData, setProjectData] = useState({
    id: project?._id,
    title: project?.title,
    languages: project?.languages,
    overview: project?.overview,
    github: project?.github,
    website: project?.website,
    projectImg: ""
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (
      projectData.projectImg &&
      (projectData.projectImg.type === "image/png" || projectData.projectImg.type === "image/jpg" || projectData.projectImg.type === "image/jpeg")
    ) {
      setImageFileStatus(true);
      setPreview(URL.createObjectURL(projectData.projectImg));
    } else {
      setImageFileStatus(false);
      setPreview("");
      setProjectData({ ...projectData, projectImg: "" });
    }
  }, [projectData.projectImg]);

  const handleClose = () => {
    setShow(false);
    resetProjectData();
  };

  const handleShow = () => {
    setShow(true);
    resetProjectData();
  };

  const resetProjectData = () => {
    setProjectData({
      id: project?._id,
      title: project?.title,
      languages: project?.languages,
      overview: project?.overview,
      github: project?.github,
      website: project?.website,
      projectImg: ""
    });
  };

  const handleUpdateProject = async () => {
    const { id, title, languages, overview, github, website, projectImg } = projectData;
    if (title && languages && overview && github && website) {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("overview", overview);
      reqBody.append("github", github);
      reqBody.append("website", website);
      if (preview) reqBody.append("projectImg", projectImg);

      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        };

        try {
          const result = await editProjectAPI(id, reqBody, reqHeader);
          if (result.status === 200) {
            alert("Project updated successfully!");
            handleClose();
            setEditResponse(result);
          } else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("Please fill the form completely!");
    }
  };

  return (
    <>
      <button onClick={handleShow} className='btn'> <i className="fa-solid fa-edit"></i></button>
      <Modal size='lg' centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input
                  onChange={(e) => setProjectData({ ...projectData, projectImg: e.target.files[0] })}
                  style={{ display: 'none' }}
                  type="file"
                />
                <img
                  width="200px"
                  height="200px"
                  src={preview || `${SERVERURL}/uploads/${project?.projectImg}`}
                  alt="Project Preview"
                />
              </label>
              {!imageFileStatus && (
                <div className="text-warning fw-bolder my-2">
                  *Upload only the following file types: jpeg, jpg, png.
                </div>
              )}
            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input
                  value={projectData.title}
                  onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                  type="text"
                  placeholder="Project Title"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectData.languages}
                  onChange={(e) => setProjectData({ ...projectData, languages: e.target.value })}
                  type="text"
                  placeholder="Languages Used in Project"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectData.overview}
                  onChange={(e) => setProjectData({ ...projectData, overview: e.target.value })}
                  type="text"
                  placeholder="Project Overview"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectData.github}
                  onChange={(e) => setProjectData({ ...projectData, github: e.target.value })}
                  type="text"
                  placeholder="Project Github Link"
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <input
                  value={projectData.website}
                  onChange={(e) => setProjectData({ ...projectData, website: e.target.value })}
                  type="text"
                  placeholder="Project Website Link"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Edit;
