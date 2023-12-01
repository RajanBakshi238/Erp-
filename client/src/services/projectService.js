import { postData } from "src/utils/api";

export const createProject = (data) => {
    return postData('project',data)
}