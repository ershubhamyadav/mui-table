import React, { useEffect, useState } from "react";
import {
  CssBaseline,
  Container,
  Box,
  Grid,
  Typography,
  TextField
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { Button, Modal, SearchInput, CardItem } from "../Component";

const initialTaskData = {
  1: [], //{title: ""}
  2: [],
  3: [],
  4: []
};

export default function TaskContainer() {
  const [taskData, setTaskData] = useState(initialTaskData);
  const [filterTaskData, setFilterTaskData] = useState(initialTaskData);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const addNewTask = () => {
    let key = Object.keys(taskData)[0];
    let objTask = { ...taskData };

    objTask[key].push({ title });
    setTaskData(objTask);
    setOpen(false);
    setTitle("");
    setText("");
  };

  const moveTask = (taskId, newTaskId, ind) => {
    newTaskId = String(newTaskId);
    let objTask = { ...taskData };
    let data = objTask[taskId].splice(ind, 1);
    objTask[newTaskId].push({ ...data[0] });
    setTaskData(() => objTask, searchTask());
  };

  const removeTask = (taskId, ind) => {
    let objTask = { ...taskData };
    objTask[taskId].splice(ind, 1);
    setTaskData(() => objTask, searchTask());
  };

  const searchTask = () => {
    let newObj = {};
    for (const key in taskData) {
      if (Object.hasOwnProperty.call(taskData, key)) {
        const tasks = taskData[key];
        newObj = {
          ...newObj,
          [key]:
            tasks.length > 0
              ? tasks.filter((task) =>
                  text !== ""
                    ? task.title.toUpperCase().search(text.toUpperCase()) >=
                        0 && task
                    : task
                )
              : tasks
        };
      }
    }
    setFilterTaskData(newObj);
  };

  useEffect(() => {
    searchTask();
  }, [text, taskData]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed sx={{ margin: "20px 10px" }}>
        <Box sx={{ height: "80vh" }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            padding="15px"
          >
            <SearchInput
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#e7ebf0", color: "#000000" }}
              onClick={() => setOpen(true)}
              icon={<Add sx={{ paddingRight: "5px" }} />}
              title="Add task"
            />
          </Grid>
          <Grid container rowSpacing={1}>
            {Object.keys(filterTaskData).map((ele) => (
              <Grid
                item
                xs={3}
                style={{ maxWidth: "22%" }}
                sx={{
                  bgcolor: "#e7ebf0",
                  padding: "1px 1px",
                  minHeight: "80vh",
                  maxWidth: "22%",
                  margin: "0 17px"
                }}
                key={ele}
              >
                <Box
                  sx={{
                    padding: "15px"
                  }}
                >
                  <Typography
                    fontSize="14px"
                    variant="h3"
                    marginBottom={"10px"}
                  >
                    STEP {ele}
                  </Typography>
                  {filterTaskData[ele].length > 0 &&
                    filterTaskData[ele].map((item, key) => (
                      <CardItem
                        ind={ele}
                        item={item}
                        key={key}
                        moveTask={moveTask}
                        removeTask={removeTask}
                      />
                    ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      {open && (
        <Modal
          open={open}
          setOpen={setOpen}
          title=" Add Task"
          Children={
            <>
              <Box sx={{ marginBottom: "2rem" }}>
                <TextField
                  id="filled-password-input"
                  placeholder="Add Title"
                  autoComplete="current-password"
                  variant="filled"
                  sx={{ width: "100%" }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Button
                disabled={!title}
                variant="contained"
                sx={{ backgroundColor: "#e7ebf0", color: "#000000" }}
                title="Add task"
                onClick={() => addNewTask()}
              />
            </>
          }
        ></Modal>
      )}
    </React.Fragment>
  );
}
