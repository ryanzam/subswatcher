import Subs from "../models/subs.model.js"
import { workflowClient } from '../config/upstash.js'
import { SERVER_URL } from '../config/env.js'

export const createSubs = async (req, res, next) => {
    try {
        /* const subs = await Subs.create({
            ...req.body,
            user: req.user._id
        }) */

        const subs = {
            id: '67b32149aaf6817d03a3c1ea',
            name: 'Youtube patreon',
            category: 'others',
            currency: 'EUR',
            price: 4.99,
            periods: 'weekly',
            startDate: '2025-02-12T00:00:00.000Z',
            paymentType: 'Credit Card',
            status: 'active',
            user: { _id: '67b1a5c22b531dedf12f5dd9', email: 'admin1@admin.com' },
            createdAt: '2025-02-17T11:45:13.542Z',
            updatedAt: '2025-02-17T11:45:13.542Z',
            renewDate: '2025-02-19T00:00:00.000Z',
            __v: 0
        }

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/wf/subs/reminder`,
            body: {
                subsId: subs.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        })


        res.status(201).json({ success: true, data: { subs, workflowRunId } })
    } catch (error) {
        next(error)
    }
}

export const getUserSubs = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error("You cannot access this account.")
            res.status = 401
            throw error
        }

        const subs = await Subs.find({ user: req.params.id })

        res.status(200).json({ success: true, data: subs })
    } catch (error) {
        next(error)
    }
}