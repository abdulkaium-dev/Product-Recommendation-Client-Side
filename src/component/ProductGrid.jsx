import React from "react";
import { motion } from "framer-motion";

const popularCategories = [
  {
    id: 1,
    name: "Organic Fruits",
    description: "Fresh and healthy organic fruits",
    imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Organic Vegetables",
    description: "Farm-fresh organic vegetables",
    imageUrl: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Organic Dairy",
    description: "Pure organic milk and dairy products",
    imageUrl: "data:image/jpeg;base64,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",
  },
  {
    id: 4,
    name: "Organic Grains",
    description: "Whole grains grown organically",
    imageUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=80",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: "spring", stiffness: 100 },
  }),
};

const ProductGrid = () => {
  return (
    <section
      style={{
        padding: "3rem 2rem",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#2c3e50",
          marginBottom: "0.5rem",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Popular Categories
      </h2>
      <p
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          color: "#7f8c8d",
          fontSize: "1.1rem",
          maxWidth: "450px",
          marginLeft: "auto",
          marginRight: "auto",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        Some of our popular categories include organic products.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {popularCategories.map((category, index) => (
          <motion.div
            key={category.id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 12px 25px rgba(0,0,0,0.15)" }}
            style={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                transition: "transform 0.3s ease",
              }}
            />
            <div style={{ padding: "1.5rem" }}>
              <h3
                style={{
                  margin: "0 0 0.6rem",
                  color: "#27ae60",
                  fontWeight: "700",
                  fontSize: "1.3rem",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {category.name}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "#555",
                  fontSize: "1rem",
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                {category.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
