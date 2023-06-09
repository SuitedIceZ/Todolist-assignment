import React, { useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";

import themeContext from "../context/theme";
import "../style/Button.css";
import "../style/Task.css";
import themeColor from "../config/themeColor";

export default function Task(props) {
  const { title, description, status, dueDate, onClickRemove, onClickDone } =
    props;
  const theme = useContext(themeContext);
  return (
    <Card
      className="TaskCardContrainer"
      style={{ backgroundColor: themeColor[theme + "Theme"].primary[100] }}
    >
      <CardContent>
        <CardActionArea>
          <Typography
            variant="h6"
            component="h4"
            sx={{ fontWeight: "bold" }}
            style={{
              color: themeColor[theme + "Theme"].primary[400],
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic" }}
            style={{
              color: themeColor[theme + "Theme"].primary[400],
            }}
          >
            {dueDate}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: 2 }}
            style={{
              color: themeColor[theme + "Theme"].primary[400],
            }}
          >
            {description}
          </Typography>

          <CardActions>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 2,
              }}
            >
              {status === "TODO" && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={onClickDone}
                  sx={{ marginRight: 1 }}
                >
                  DONE!
                </Button>
              )}
              <Button variant="contained" color="error" onClick={onClickRemove}>
                DELETE
              </Button>
            </div>
          </CardActions>
        </CardActionArea>
      </CardContent>
    </Card>
  );
}
