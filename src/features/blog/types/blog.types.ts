export type BlogType = {
    _id: string,
    title: string,
    content: string,
    created: string,
    author: {
        name: string,
        email: string
    }
};