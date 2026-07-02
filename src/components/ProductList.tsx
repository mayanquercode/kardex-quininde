import { useState, useEffect, useMemo } from "react";
import debounce from "debounce";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQueryKardexProduct } from "../hooks/use-inventory";
import type { ProductWithStock } from "../types/inventory";

interface ProductListProps {
  categoria: string | null;
}

export default function ProductList({ categoria }: ProductListProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debounceSearch = useMemo(() => debounce((v: string) => setDebouncedSearch(v), 300), []);

  useEffect(() => {
    debounceSearch(search);
  }, [search, debounceSearch]);

  useEffect(() => {
    setSearch("");
    setDebouncedSearch("");
  }, [categoria]);

  const { data, isLoading } = useQueryKardexProduct(categoria, debouncedSearch);

  function renderContent() {
    if (!categoria) {
      return (
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.5)" }}>
            Selecciona una categoría
          </Typography>
        </Box>
      );
    }

    if (isLoading) {
      return (
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    }

    if (!data || data.length === 0) {
      return (
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.5)" }}>
            {debouncedSearch ? "Sin resultados para esa búsqueda" : "No hay productos en esta categoría"}
          </Typography>
        </Box>
      );
    }

    return (
      <>
        <TableContainer
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: "auto",
            display: { xs: "none", md: "block" },
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": { background: "#555", borderRadius: 3 },
          }}
        >
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#2a2a2a", color: "white" }}>Código</TableCell>
                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#2a2a2a", color: "white" }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#2a2a2a", color: "white" }}>Tipo</TableCell>
                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#2a2a2a", color: "white" }}>Sistema</TableCell>
                <TableCell sx={{ fontWeight: "bold", backgroundColor: "#2a2a2a", color: "white" }}>Físico</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((product: ProductWithStock) => (
                <TableRow key={product.code} hover sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" } }}>
                  <TableCell sx={{ color: "white" }}>{product.code}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.product_type}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.stock?.system_quantity ?? "-"}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.stock?.physical_quantity ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {data.map((product: ProductWithStock) => (
            <Paper
              key={product.code}
              sx={{
                p: 2,
                backgroundColor: "#2a2a2a",
                color: "white",
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <Typography variant="subtitle2" sx={{ color: "#90caf9", fontWeight: "bold" }}>
                {product.code}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {product.name}
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 0.5 }}>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                  Tipo: {product.product_type}
                </Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                  Sistema: {product.stock?.system_quantity ?? "-"}
                </Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                  Físico: {product.stock?.physical_quantity ?? "-"}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </>
    );
  }

  return (
    <Box sx={{ flex: 1, backgroundColor: "#16171D", display: "flex", flexDirection: "column", p: 2, minHeight: 0, overflowY: "auto" }}>
      <TextField
        size="small"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": { backgroundColor: "white", borderRadius: 1 },
        }}
      />
      {renderContent()}
    </Box>
  );
}
