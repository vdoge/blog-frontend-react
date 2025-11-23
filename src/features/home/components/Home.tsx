import { useState, useEffect } from 'react'

import { Typography, Container, Card, CardContent, Stack, Box, Link as MuiLink } from '@mui/material';
import { MuiMarkdown } from 'mui-markdown';

import { getBlogs } from '../api/home.api';
import Panel from '../../panel/components/Panel';
import type { BlogType } from '../../blog/types/blog.types';
import { Link as RouterLink } from 'react-router-dom';


function Home() {
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(() => {
        const fetchData = async() => {
          setBlogs(await getBlogs());
        };

        fetchData();

    }, []);


    return (    
        <Container maxWidth="md" sx={{ mt:2 }}>

            <Stack sx={{ gap: 2 }} direction="row"> 

            
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Panel blogs={blogs} />
                </Box>

                <Stack spacing={2}>

                    {
                        // for each blog
                        blogs?.map((blog: BlogType) => {
                            return (
                                    
                                <Card key={blog._id} sx={{ minWidth: 0 }}>
                                    <CardContent>
                                        <Stack spacing={1}>
                                            
                                            <Typography variant="h3">
                                                <MuiLink component={RouterLink} to={`/blog/${blog._id}`} color="inherit" underline="hover" key={blog._id}>
                                                    { blog.title }
                                                </MuiLink>
                                            </Typography>

                                            <Typography variant="subtitle1">
                                                { blog.author.name + " - " + new Date(blog.created).toLocaleDateString("en-NZ", { dateStyle: "medium" }) }
                                            </Typography>

                                            <MuiMarkdown overrides={{}}>
                                                { blog.content.replace(/\n/g, '  \n\n') }
                                            </MuiMarkdown>

                                        </Stack>
                                    </CardContent>
                                </Card>

                            )
                        })
                    }
                    
                </Stack>

            </Stack>
            
        </Container>
    );

};

export default Home;
