import { useState, useEffect } from 'react'

import { Typography, Container, Stack } from '@mui/material';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug'

import { useParams } from 'react-router-dom';
import type { BlogType } from '../types/blog.types';
import { getBlog } from '../api/blog.api';
import CodeBlockWrapper from '../../../shared/components/CodeBlockWrapper'



function Blog() {
    const [blog, setBlog] = useState<BlogType | null>(null);
    const params = useParams<{id: string}>();

    useEffect(() => {
        const fetchData = async() => {
            if (!params.id) return;
            setBlog(await getBlog(params.id));
        };

        fetchData();

    }, [params.id]);


  return (
    <Container maxWidth="md">

        <Stack spacing={2}>

            <Typography variant="h2" sx={{ pt: 5 }}>
                { blog?.title }
            </Typography>

            <Typography variant="subtitle2" color="text.secondary">
                { blog?.author.name } - { blog ? new Date(blog.created).toLocaleDateString("en-NZ", { dateStyle: "medium" }) : null }
            </Typography>

            <Markdown 
                rehypePlugins={[rehypeRaw, rehypeSlug]}
                remarkPlugins={[remarkGfm]}

                components={{
                    code({ children, className, ...props }) {
                        return <CodeBlockWrapper code={children as string} className={className} {...props} />
                    }
                }}
            >
                { blog?.content }

            </Markdown>

        </Stack>

    </Container>
  );

};

export default Blog;
