import React from 'react';
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Project, ProjectNull } from '../types/project.d';
import api from '../api/project';

export default function ProjectDetail(props: any) {
  const {id} = useParams();
  const [project, setProject] = useState<Project>(ProjectNull);
  console.log('id', id);

  useEffect(() => {
    getProject();
  }, [id])

  const getProject = async () => {
    try {
      const _projects = await api.getProjects(id);
      if (_projects && _projects.length !== 0) {
        setProject(_projects[0]);
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Box>
      <Typography variant="h2">
        {project.name}
      </Typography>
      <Box sx={{
        py: 8,
        px: 6,
      }}>
        <Typography sx={{mt: 1.5}} variant="body2">
          {project.description}
        </Typography>
        <Typography sx={{mt: 1.5}} variant="h5">
          Token total: {project.tokenTotal}
        </Typography>
        <Typography sx={{mt: 1.5}} variant="h5">
          Point / token: {project.pointPerToken}
        </Typography>
      </Box>
    </Box>
  );
}
