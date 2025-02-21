import { gql, useSubscription, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Button, ToggleButton, ToggleButtonGroup, Box, Typography, Grid, Paper } from "@mui/material";

const GET_PROJECTS = gql`
  query {
    projects {
      id
      name
      tasks {
        id
        name
      }
    }
  }
`;

const TASK_ADDED = gql`
  subscription {
    taskAdded {
      id
      name
    }
  }
`;

function TaskList() {
  const { loading, error, data, refetch } = useQuery(GET_PROJECTS);
  const { data: subscriptionData } = useSubscription(TASK_ADDED);

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewStyle, setViewStyle] = useState(localStorage.getItem("viewStyle") || "list");

  useEffect(() => {
    if (data) {
      setProjects(data.projects);
    }
  }, [data]);

  useEffect(() => {
    if (subscriptionData) {
      refetch();
    }
  }, [subscriptionData, refetch]);

  const handleProjectChange = (id) => setSelectedProject(id);
  const handleViewChange = (_, newStyle) => {
    if (newStyle) {
      setViewStyle(newStyle);
      localStorage.setItem("viewStyle", newStyle);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ marginBottom: 2 }}>
        <ToggleButtonGroup value={viewStyle} exclusive onChange={handleViewChange}>
          <ToggleButton value="list">List</ToggleButton>
          <ToggleButton value="grid">Grid</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        {projects.map((project) => (
          <Button
            key={project.id}
            onClick={() => handleProjectChange(project.id)}
            variant="contained"
            sx={{
              margin: 1,
              backgroundColor: "#0288D1",
              color: "#fff",
              "&:hover": { backgroundColor: "#0277BD" },
            }}
          >
            {project.name}
          </Button>
        ))}
      </Box>
      {selectedProject && (
        <Box>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Tasks for {projects.find((p) => p.id === selectedProject)?.name}
          </Typography>
          {viewStyle === "grid" ? (
            <Grid container spacing={2}>
              {projects
                .find((p) => p.id === selectedProject)
                ?.tasks.map((task) => (
                  <Grid item xs={12} sm={6} md={4} key={task.id}>
                    <Paper sx={{ padding: 2, backgroundColor: "#f5f5f5", boxShadow: 3 }}>
                      <Typography variant="body1">{task.name}</Typography>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          ) : (
            <Box sx={{ display: "block" }}>
              {projects
                .find((p) => p.id === selectedProject)
                ?.tasks.map((task) => (
                  <Box key={task.id} sx={{ marginBottom: 2, backgroundColor: "#f5f5f5", padding: 2, boxShadow: 3 }}>
                    <Typography variant="body1">{task.name}</Typography>
                  </Box>
                ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default TaskList;