import { useState, useEffect } from 'react'

import { Typography, Container, Stack } from '@mui/material';
import { MuiMarkdown } from 'mui-markdown';

import { useParams } from 'react-router-dom';
import type { BlogType } from '../types/blog.types';
import { getBlog } from '../api/blog.api';


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

            <MuiMarkdown>
                { blog?.content.replace(/\n/g, '  \n\n') }
            </MuiMarkdown>

        </Stack>

    </Container>
  );

};

export default Blog;
