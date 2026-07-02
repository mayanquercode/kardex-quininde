import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import CategoryProducts from "./pages/CategoryProducts"
import ProductDetail from "./pages/ProductDetail"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:category" element={<CategoryProducts />} />
      <Route path="/product/:code/:type" element={<ProductDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
