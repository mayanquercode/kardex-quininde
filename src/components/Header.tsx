import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
  categoria: string | null;
  onMenuClick: () => void;
}

export default function Header({ categoria, onMenuClick }: HeaderProps) {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1A2025" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ display: { md: "none" }, mr: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
          {categoria || "Kardex Quinindé"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
