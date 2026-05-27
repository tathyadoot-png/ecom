import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";

import testRoutes from "./routes/test.routes";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.middleware";

import productRoutes from "./modules/products/product.routes";

import categoryRoutes from "./modules/products/category.routes";
import orderRoutes from "./modules/orders/order.routes";
import paymentRoutes from "./modules/orders/payment.routes";

import reviewRoutes from "./modules/reviews/review.routes";
import wishlistRoutes from "./modules/wishlist/wishlist.routes";
import cartRoutes from "./modules/cart/cart.routes";
import adminRoutes from "./modules/admin/admin.routes";
import userRoutes from "./modules/users/user.routes";

import storeRoutes from "./modules/store/store.routes";
const app = express();




app.use(
  cors({
  origin: [
      process.env.CLIENT_URL as string,
      process.env.ADMIN_URL as string,
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

app.use("/api/auth", authRoutes);

app.use("/api/test", testRoutes);
app.use(errorMiddleware);
app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/categories",
  categoryRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/reviews",
  reviewRoutes
);

app.use(
  "/api/wishlist",
  wishlistRoutes
);

app.use("/api/cart", cartRoutes);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/stores",
  storeRoutes
);

export default app;