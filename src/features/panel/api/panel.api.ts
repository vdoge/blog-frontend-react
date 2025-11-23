import type { BlogType } from "../../blog/types/blog.types";
import api from "../../../shared/api/api";


export const getBlog = async (id: string): Promise<BlogType> => {

    const blog = await api.get(`/api/blog/${id}`);

    return blog.data;
};