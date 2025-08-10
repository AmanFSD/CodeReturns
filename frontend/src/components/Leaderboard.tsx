import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";

export default function Leaderboard() {
  const [list, setList] = useState<{ user: string; xp: number; rank: number }[]>([]);

  useEffect(() => {
    axios.get("/api/leaderboard/").then((res) => setList(res.data));
  }, []);

  return (
    <div>
      <Typography variant="h5" mb={2}>🏆 Leaderboard</Typography>
      <List>
        {list.map(({ user, xp, rank }) => (
          <ListItem key={user}>
            <ListItemText
              primary={`${rank}. ${user}`}
              secondary={`XP: ${xp}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}