import type { BlogType } from "../../blog/types/blog.types";
import api from "../../../shared/api/api";


export const getBlogs = async (): Promise<[BlogType]> => {

    const blogs = await api.get(`/api/blog/blogs`);

    return blogs.data;
};