import { Router } from "express";
import { createSubs, getUserSubs } from "../controllers/subs.controller.js";

import authorize from "../middleware/auth.middleware.js"

const subsRouter = Router()

subsRouter.get("/", (req, res) => {
    res.send({ title: "Get all subscriptions"})
})

subsRouter.get("/:id", (req, res) => {
    res.send({ title: "Get a subscription"})
})

subsRouter.get("/user/:id", authorize, getUserSubs)

subsRouter.get("/oncoming-renews", (req, res) => {
    res.send({ title: "Get oncoming renews"})
})

subsRouter.post("/", authorize, createSubs)

subsRouter.put("/:id", (req, res) => {
    res.send({ title: "Update a subscription"})
})

subsRouter.put("/:id/remove", (req, res) => {
    res.send({ title: "REmove a subscription"})
})

subsRouter.delete("/:id", (req, res) => {
    res.send({ title: "Delete a subscription"})
})

export default subsRouter