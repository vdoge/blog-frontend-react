import { useState } from 'react'

import { Typography, Container, Card, CardContent, TextField, Box, List, ListItem, ListItemText, Divider, Link } from '@mui/material';
import { MuiMarkdown } from 'mui-markdown';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import type { BlogType } from '../../blog/types/blog.types';



interface PanelProps {
    blogs: BlogType[] | null;
}


function Panel({ blogs }: PanelProps) {
    const [search, setSearch] = useState<String | null>("");

    return (
        <Box sx={{ minWidth: "280px" }}>

            <Card>
                <CardContent>

                    {/* Search bar */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField 
                            id="search" 
                            label="Search" 
                            variant="standard" 
                            value={search} 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setSearch(event.target.value) }}
                        />
                    </Box>

                </CardContent>
            </Card>

            <Card>
                <CardContent>

                    {/* list of blogs */}
                    <List>
                        {
                            blogs?.map((blog: BlogType) => {
                                return (
                                    <Link href={`/blog/${blog._id}`} color="inherit" underline="hover" key={blog._id}>
                                        <ListItem>
                                            <ListItemText
                                                primary={blog.title}
                                                secondary={blog.content.slice(0, 30)}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </Link>
                                );
                            })
                        }
                    </List>

                </CardContent>
            </Card>

        </Box>
    );

};

export default Panel;
