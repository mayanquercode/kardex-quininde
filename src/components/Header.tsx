import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface HeaderProps {
  categoria: string | null;
}

export default function Header({ categoria }: HeaderProps) {
  return (
    <Box sx={{ height: "100%", backgroundColor: "#16171D", display: "flex", alignItems: "center", px: 3 }}>
      <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
        CATEGORIA: {categoria || ""}
      </Typography>
    </Box>
  );
}
