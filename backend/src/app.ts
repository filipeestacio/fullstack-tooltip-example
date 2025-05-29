import express, { Request, Response } from "express";
import productRouter from "./routes/ProductsRouter";
import { fakeAuth } from "./utils/fakeAuth";
import cors from "cors";

const app = express();
app.use(cors());

const router = express.Router();

router.use("/products", productRouter);

app.use(express.json());
app.use(fakeAuth);

// here we should also add middleware to sanitize input data. We can use third party libraries for this.
app.use(router);

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ message: "OK" });
});

export default app;