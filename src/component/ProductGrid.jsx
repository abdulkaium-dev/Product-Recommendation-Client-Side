import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Winter And Wind Resistant Instant Juicer",
    price: "$11.50",
    image: "/path/to/image1.png",
    rating: 4.5,
  },
  {
    id: 2,
    name: "New Luxury Man's Slim Fit Shirt",
    price: "$29.00",
    image: "/path/to/image2.png",
    rating: 4,
  },
  // ... baki products
];

export default function ProductGrid() {
  return (
    <section className="py-12 bg-white max-w-7xl mx-auto px-6">
      <h2 className="text-center text-3xl font-semibold mb-6">Our Products</h2>
      <div className="flex justify-center space-x-4 mb-6">
        <button className="btn-outline">Fresh Fruit</button>
        <button className="btn-outline">Fresh Vegetables</button>
        <button className="btn-outline">Fresh Salads & Dips</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-36 object-contain mb-3 rounded-md"
              />
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                New
              </span>
            </div>
            <h3 className="text-sm font-medium mb-1">{product.name}</h3>
            <p className="text-indigo-600 font-semibold mb-2">{product.price}</p>
            <div className="flex items-center space-x-1 text-yellow-400 text-sm">
              {Array.from({ length: 5 }, (_, idx) => (
                <svg
                  key={idx}
                  className={`w-4 h-4 fill-current ${
                    idx < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.49 7.91l6.562-.955L10 1l2.948 5.955 6.562.955-4.755 4.635 1.123 6.545z" />
                </svg>
              ))}
              <span className="text-gray-500 ml-2">{product.rating.toFixed(1)}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
