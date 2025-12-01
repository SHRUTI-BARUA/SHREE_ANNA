// // // // // // import React from "react";
// // // // // // import { Button } from "@/components/ui/button";

// // // // // // export default function ProductList({ products, isLoading, onEdit, onDelete }) {
// // // // // //   if (isLoading) {
// // // // // //     return <p className="text-center">Loading...</p>;
// // // // // //   }

// // // // // //   if (products.length === 0) {
// // // // // //     return <p className="text-center text-gray-600">No products found.</p>;
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // //       {products.map((product) => (
// // // // // //         <div key={product.id} className="p-4 rounded-xl border bg-white shadow">
// // // // // //           <h2 className="text-lg font-bold">{product.name}</h2>
// // // // // //           <p className="text-sm text-gray-600 mb-3">{product.description}</p>
// // // // // //           <p className="font-semibold text-green-600 mb-2">₹ {product.price}</p>

// // // // // //           <div className="flex justify-between mt-4">
// // // // // //             <Button onClick={() => onEdit(product)}>Edit</Button>
// // // // // //             <Button variant="destructive" onClick={() => onDelete(product.id)}>
// // // // // //               Delete
// // // // // //             </Button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       ))}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // src/components/products/ProductList.jsx
// // // // // import React from "react";

// // // // // export default function ProductList({ products, onEdit, onDelete }) {
// // // // //   if (!products || products.length === 0) return <p>No products available.</p>;

// // // // //   return (
// // // // //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // //       {products.map((p) => (
// // // // //         <div key={p.id} className="border p-4 rounded shadow">
// // // // //           <img
// // // // //             src={p.image || "https://via.placeholder.com/150"}
// // // // //             alt={p.name}
// // // // //             className="w-full h-32 object-cover mb-2 rounded"
// // // // //           />
// // // // //           <h2 className="font-bold">{p.name}</h2>
// // // // //           <p className="text-gray-600">{p.description}</p>
// // // // //           <p className="font-semibold mb-2">₹{p.price}</p>
// // // // //           <div className="flex gap-2">
// // // // //             <button onClick={() => onEdit(p)} className="bg-blue-500 text-white px-2 py-1 rounded">
// // // // //               Edit
// // // // //             </button>
// // // // //             <button onClick={() => onDelete(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">
// // // // //               Delete
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       ))}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // import React from "react";
// // // // import { Button } from "@/components/ui/button";

// // // // export default function ProductList({ products, isLoading, onEdit, onDelete }) {
// // // //   if (isLoading) return <p>Loading products...</p>;
// // // //   if (!products.length) return <p>No products found.</p>;

// // // //   return (
// // // //     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
// // // //       {products.map(product => (
// // // //         <div key={product.id} className="p-4 border rounded-lg shadow-sm">
// // // //           <h3 className="font-bold text-lg">{product.title}</h3>
// // // //           <p className="text-gray-600">{product.millet_type}</p>
// // // //           <p className="text-gray-800 font-semibold">₹{product.price_per_kg} /kg</p>
// // // //           <div className="flex gap-2 mt-2">
// // // //             <Button size="sm" onClick={() => onEdit(product)}>Edit</Button>
// // // //             <Button size="sm" variant="destructive" onClick={() => onDelete(product.id)}>Delete</Button>
// // // //           </div>
// // // //         </div>
// // // //       ))}
// // // //     </div>
// // // //   );
// // // // }

// // // import React from "react";
// // // import { Card, CardContent } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import { useNavigate } from 'react-router-dom';


// // // export default function ProductList({ products, isLoading, onEdit, onDelete }) {
// // //   if (isLoading) return <p>Loading products...</p>;
// // //   if (!products.length) return <p>No products found.</p>;

// // //   return (
// // //     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //       {products.map(product => (
// // //         <Card key={product.id} className="shadow-lg hover:shadow-xl transition-shadow">
// // //           <CardContent className="p-4">
// // //             <h3 className="font-bold text-lg mb-2">{product.title}</h3>

// // //             <p className="text-gray-700 font-semibold mb-1">
// // //               ₹{product.price_per_kg.toLocaleString()} / kg
// // //             </p>
// // //             <p className="text-gray-500 text-sm mb-3">
// // //               Available: {product.available_quantity_kg} kg
// // //             </p>

// // //             <div className="flex gap-2 mt-2">
// // //               <Button
// // //                 size="sm"
// // //                 className="bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700"
// // //                 onClick={() => onEdit(product)}
// // //               >
// // //                 Edit
// // //               </Button>
// // //               <Button
// // //                 size="sm"
// // //                 variant="destructive"
// // //                 onClick={() => onDelete(product.id)}
// // //               >
// // //                 Delete
// // //               </Button>
// // //               <Button
// // //                   size="sm"
// // //                   variant="outline"
// // //                   onClick={() => navigate(`/product/${product.id}`)}
// // //                 >
// // //                   View Details
// // //               </Button>

// // //             </div>
// // //           </CardContent>
// // //         </Card>
// // //       ))}
// // //     </div>
// // //   );
// // // }


// // import React from "react";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";

// // export default function ProductList({ products, isLoading, onEdit, onDelete }) {
// //   if (isLoading) return <p>Loading products...</p>;
// //   if (!products.length) return <p>No products found.</p>;

// //   return (
// //     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// //       {products.map(product => (
// //         <Card key={product.id} className="shadow-lg hover:shadow-xl transition-shadow">
// //           <CardContent className="p-4">
// //             <h3 className="font-bold text-lg mb-2">{product.title}</h3>

// //             <p className="text-gray-700 font-semibold mb-1">
// //               ₹{product.price_per_kg.toLocaleString()} / kg
// //             </p>
// //             <p className="text-gray-500 text-sm mb-3">
// //               Available: {product.available_quantity_kg} kg
// //             </p>

// //             <div className="flex gap-2 mt-2">
// //               <Button
// //                 size="sm"
// //                 className="bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700"
// //                 onClick={() => onEdit(product)}
// //               >
// //                 Edit
// //               </Button>
// //               <Button
// //                 size="sm"
// //                 variant="destructive"
// //                 onClick={() => onDelete(product.id)}
// //               >
// //                 Delete
// //               </Button>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       ))}
// //     </div>
// //   );
// // }

// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

// export default function ProductList({ products, isLoading, onEdit, onDelete }) {
//   const navigate = useNavigate();

//   if (isLoading) return <p>Loading products...</p>;
//   if (!products.length) return <p>No products found.</p>;

//   return (
//     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {products.map((product) => (
//         <Card
//           key={product.id}
//           className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
//         >
//           {/* Clicking anywhere on the card navigates to details */}
//           <CardContent
//             className="p-4"
//             onClick={() => navigate(`/product/${product.id}`)}
//           >
//             <h3 className="font-bold text-lg mb-2">{product.title}</h3>
//             <p className="text-gray-700 font-semibold mb-1">
//               ₹{product.price_per_kg.toLocaleString()} / kg
//             </p>
//             <p className="text-gray-500 text-sm mb-3">
//               Available: {product.available_quantity_kg} kg
//             </p>

//             {/* Buttons */}
//             <div
//               className="flex gap-2 mt-2"
//               onClick={(e) => e.stopPropagation()} // Prevent navigating when clicking buttons
//             >
//               <Button
//                 size="sm"
//                 className="bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700"
//                 onClick={() => onEdit(product)}
//               >
//                 Edit
//               </Button>
//               <Button
//                 size="sm"
//                 variant="destructive"
//                 onClick={() => onDelete(product.id)}
//               >
//                 Delete
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";

export default function ProductList({ products, isLoading, onEdit, onDelete }) {
  const navigate = useNavigate();

  if (isLoading) return <p>Loading products...</p>;
  if (!products.length) return <p>No products found.</p>;

  const getProductImage = (product) => {
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0];
    }
    return null;
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const productImage = getProductImage(product);
        
        return (
          <Card key={product.id} className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden">
            {/* Product Image */}
            <div className="relative h-48 bg-muted">
              {productImage ? (
                <img
                  src={productImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <Package className="w-16 h-16 text-gray-300" />
                </div>
              )}
            </div>

            <CardContent className="p-4" onClick={() => navigate(`/product/${product.id}`)}>
              <h3 className="font-bold text-lg mb-2">{product.title}</h3>
              <p className="text-gray-700 font-semibold mb-1">₹{product.price_per_kg.toLocaleString()} / kg</p>
              <p className="text-gray-500 text-sm mb-3">Available: {product.available_quantity_kg} kg</p>

              <div className="flex gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                <Button size="sm" className="bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700" onClick={() => onEdit(product)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(product.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
