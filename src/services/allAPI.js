import commonAPI from "./commonAPI"
import SERVERURL from "./serverUrl"
import serverUrl from "./serverUrl"

// register called by Auth
export const registerAPI = async (reqBody)=>{
 return await commonAPI("POST",`${serverUrl}/register`,reqBody)
}

// login called by Auth
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${serverUrl}/login`,reqBody)
   }

//    addProject API called by add
export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverUrl}/add-project`,reqBody,reqHeader)
}

// homeProjectsAPI called by Home
export const homeProjectsAPI = async ()=>{
    return await commonAPI("GET",`${serverUrl}/home-projects`,"")
}

// AllProjectsAPI called by project
export const allProjectsAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${serverUrl}/all-projects`,"",reqHeader)
}

// userProjectsAPI called by Dashboard
export const userProjectsAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${serverUrl}/user-projects`,"",reqHeader)
}

//delete projectAPI called by View : http://localhost:3000/pid/remove-projects
export const deleteProjectAPI = async (pId,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVERURL}/${pId}/remove-project`,{},reqHeader)
}

//editProjectAPI called by Edit : put request to http://localhost:3000/pid/edit-projects
export const editProjectAPI = async (pId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/${pId}/edit-project`,reqBody,reqHeader)
}

//editUserApi called by profile : put request tohttp://localhost:3000/user/edit

//EditUserAPI called by profile
export const editUserAPI = async (reqBody,reqHeader)=>{
    return await CommonAPI('PUT',`${ServerURL}/user/edit,reqBody,reqHeader`)
}