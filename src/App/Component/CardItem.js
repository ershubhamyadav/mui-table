import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper, Typography } from "@mui/material";
import {
  DeleteOutline,
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined
} from "@mui/icons-material";
import { Button } from "../Component";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

const CardItem = (props) => {
  const { ind, item, key, moveTask, removeTask } = props;
  return (
    <Item sx={{ margin: "20px 0" }} key={item.title}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        padding="10px"
        sx={{ minHeight: "130px" }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          padding="8px 0"
        >
          <Typography fontSize="14px" width={"30px"}>
            {item.title}
          </Typography>
          <Button
            sx={{ backgroundColor: "none", padding: 0 }}
            icon={
              <>
                <DeleteOutline
                  sx={{ alignSelf: "flex-end" }}
                  color="error"
                  fontSize="14px"
                />
                <Typography
                  fontSize="14px"
                  style={{
                    color: "#e96061",
                    marginBottom: "-4px"
                  }}
                >
                  Delete
                </Typography>
              </>
            }
            onClick={() => removeTask(ind, key)}
          ></Button>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent={
            parseInt(ind) === 1
              ? "flex-end"
              : parseInt(ind) === 4
              ? "flex-start"
              : "space-between"
          }
          alignItems="center"
          padding="8px 0"
        >
          {parseInt(ind) !== 1 && (
            <ArrowCircleLeftOutlined
              onClick={() => moveTask(ind, parseInt(ind) - 1, key)}
              style={{ color: "#a19d9d" }}
            />
          )}
          {parseInt(ind) !== 4 && (
            <ArrowCircleRightOutlined
              onClick={() => moveTask(ind, parseInt(ind) + 1, key)}
              style={{ color: "#a19d9d" }}
            />
          )}
        </Grid>
      </Grid>
    </Item>
  );
};

export default React.memo(CardItem);
