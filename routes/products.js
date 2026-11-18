
const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();

// 1. CREATE PRODUCT
router.post("/", async (req, res, next) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
});


// 2. GET ALL PRODUCTS
// Filtering, sorting and pagination
router.get("/", async (req, res, next) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            search,
            sort = "createdAt",
            order = "desc",
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (category) {
            filter.category = new RegExp(
                "^" + category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$",
                "i"
            );
        }

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};

            if (minPrice !== undefined) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice !== undefined) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        if (
            !Number.isInteger(Number(page)) ||
            !Number.isInteger(Number(limit)) ||
            Number(page) < 1 ||
            Number(limit) < 1 ||
            Number(limit) > 100
        ) {
            return res.status(400).json({
                message: "Invalid page or limit"
            });
        }

        const currentPage = Number(page);
        const pageLimit = Number(limit);

        const allowedSort = [
            "name",
            "price",
            "quantity",
            "createdAt"
        ];

        if (!allowedSort.includes(sort)) {
            return res.status(400).json({
                message: "Invalid sort field"
            });
        }

        const sortOrder = order === "asc" ? 1 : -1;

        const products = await Product.find(filter)
            .sort({ [sort]: sortOrder })
            .skip((currentPage - 1) * pageLimit)
            .limit(pageLimit);

        const total = await Product.countDocuments(filter);

        res.status(200).json({
            total,
            page: currentPage,
            totalPages: Math.ceil(total / pageLimit),
            count: products.length,
            products
        });

    } catch (error) {
        next(error);
    }
});


// 3. LOW STOCK REPORT
router.get("/low-stock", async (req, res, next) => {
    try {
        const lowStockItems = await Product.find({
            $expr: {
                $lte: ["$quantity", "$reorderLevel"]
            }
        });

        res.status(200).json({
            count: lowStockItems.length,
            lowStockItems
        });

    } catch (error) {
        next(error);
    }
});


// 4. CATEGORY-WISE INVENTORY SUMMARY
router.get("/summary", async (req, res, next) => {
    try {
        const summary = await Product.aggregate([
            {
                $group: {
                    _id: "$category",

                    totalItems: {
                        $sum: 1
                    },

                    totalQuantity: {
                        $sum: "$quantity"
                    },

                    totalStockValue: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    },

                    avgPrice: {
                        $avg: "$price"
                    }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);

        res.status(200).json({
            categories: summary.length,
            summary
        });

    } catch (error) {
        next(error);
    }
});


// 5. GET SINGLE PRODUCT BY ID
router.get("/:id", async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);

    } catch (error) {
        next(error);
    }
});


// 6. UPDATE PRODUCT DETAILS
router.put("/:id", async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);

    } catch (error) {
        next(error);
    }
});


// 7. UPDATE STOCK (INCREASE OR DECREASE)
router.patch("/:id/stock", async (req, res, next) => {
    try {
        const { change } = req.body;

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        if (!Number.isInteger(change) || change === 0) {
            return res.status(400).json({
                message: "Change must be a non-zero integer"
            });
        }

        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
                quantity: { $gte: Math.max(0, -change) }
            },
            {
                $inc: { quantity: change }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            const exists = await Product.exists({
                _id: req.params.id
            });

            if (!exists) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            return res.status(400).json({
                message: "Insufficient stock. Quantity cannot become negative."
            });
        }

        res.status(200).json({
            message: "Stock updated",
            product
        });

    } catch (error) {
        next(error);
    }
});


// 8. DELETE PRODUCT
router.delete("/:id", async (req, res, next) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const product = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted",
            id: product._id
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;
