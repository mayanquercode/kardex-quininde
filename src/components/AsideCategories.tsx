import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import categorias from "../data/categorias";

interface AsideCategoriesProps {
  selected: string | null;
  onSelect: (cat: string) => void;
}

export default function AsideCategories({ selected, onSelect }: AsideCategoriesProps) {
  return (
    <Box sx={{ height: "100%", backgroundColor: "#1A2025", overflowX: "hidden", overflowY: "auto", "&::-webkit-scrollbar": { width: 6 }, "&::-webkit-scrollbar-track": { background: "transparent" }, "&::-webkit-scrollbar-thumb": { background: "#555", borderRadius: 3 } }}>
      {categorias.map((cat) => (
        <Button
          key={cat}
          fullWidth
          onClick={() => onSelect(cat)}
          sx={{
            justifyContent: "flex-start",
            color: selected === cat ? "#90caf9" : "white",
            textTransform: "none",
            py: 1,
            px: 2,
            borderRadius: 0,
            backgroundColor: selected === cat ? "rgba(144, 202, 249, 0.12)" : "transparent",
            borderLeft: selected === cat ? 3 : 0,
            borderColor: "#90caf9",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
        >
          {cat}
        </Button>
      ))}
    </Box>
  );
}
