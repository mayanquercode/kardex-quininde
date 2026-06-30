import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Header from "../components/Header";
import AsideCategories from "../components/AsideCategories";
import ProductList from "../components/ProductList";

export default function Home() {
  const [categoria, setCategoria] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
      <Header
        categoria={categoria}
        onMenuClick={() => setDrawerOpen(true)}
      />
      <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            width: 280,
            flexShrink: 0,
            borderRight: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <AsideCategories selected={categoria} onSelect={setCategoria} />
        </Box>
        <Box sx={{ flex: 1, minHeight: 0, display: "flex" }}>
          <ProductList categoria={categoria} />
        </Box>
      </Box>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { md: "none" } }}
      >
        <Box sx={{ width: 280, height: "100%", backgroundColor: "#1A2025" }}>
          <AsideCategories
            selected={categoria}
            onSelect={(cat) => {
              setCategoria(cat);
              setDrawerOpen(false);
            }}
          />
        </Box>
      </Drawer>
    </Box>
  );
}
