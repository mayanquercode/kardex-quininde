import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AsideCategories from "../components/AsideCategories";
import Header from "../components/Header";
import ProductList from "../components/ProductList";

export default function Home() {
  const [categoria, setCategoria] = useState<string | null>(null);

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid size={3} sx={{ height: "100%" }}>
          <AsideCategories selected={categoria} onSelect={setCategoria} />
        </Grid>
        <Grid container direction="column" size={9} sx={{ height: "100vh", minHeight: 0 }}>
        {/*<Grid sx={{ flex: 2 }}>
            <Header categoria={categoria} />
          </Grid>*/}
          <Grid sx={{ flex: 10, display: "flex", minHeight: 0 }}>
            <ProductList categoria={categoria} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
