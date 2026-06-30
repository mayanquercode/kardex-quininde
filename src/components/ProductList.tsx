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
import { useQueryKardexProduct } from "../hooks/use-inventory";

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

      {!categoria ? (
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.5)" }}>
            Selecciona una categoría
          </Typography>
        </Box>
      ) : isLoading ? (
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : !data || data.length === 0 ? (
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.5)" }}>
            {debouncedSearch ? "Sin resultados para esa búsqueda" : "No hay productos en esta categoría"}
          </Typography>
        </Box>
      ) : (
        <TableContainer sx={{ flex: 1, minHeight: 0, overflow: "auto", "&::-webkit-scrollbar": { width: 6 }, "&::-webkit-scrollbar-track": { background: "transparent" }, "&::-webkit-scrollbar-thumb": { background: "#555", borderRadius: 3 } }}>
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
              {data.map((product: any) => (
                <TableRow key={product.code} hover sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" } }}>
                  <TableCell sx={{ color: "white" }}>{product.code}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.product_type}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.stock?.[0]?.system_quantity ?? "-"}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.stock?.[0]?.physical_quantity ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
