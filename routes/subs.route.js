import { Router } from "express";

const subsRouter = Router()

subsRouter.get("/", (req, res) => {
    res.send({ title: "Get all subscriptions"})
})

subsRouter.get("/:id", (req, res) => {
    res.send({ title: "Get a subscription"})
})

subsRouter.get("/user/:id", (req, res) => {
    res.send({ title: "Get all users subscriptions"})
})

subsRouter.get("/oncoming-renews", (req, res) => {
    res.send({ title: "Get oncoming renews"})
})

subsRouter.post("/", (req, res) => {
    res.send({ title: "Create a subscription"})
})

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