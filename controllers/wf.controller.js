import { createRequire } from 'module';
import Subs from '../models/subs.model.js';
import dayjs from 'dayjs';

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const REMINDERS = [3, 2, 1]

export const sendReminders = serve(async (context) => {
    const { subsId } = context.requestPayload

    const sub = await fetchSub(context, subsId)

    if (!sub || sub.status !== "active") return

    const renewDate = dayjs(sub.renewDate)
    if (renewDate.isBefore(dayjs())) {
        console.log(`Renew date has gone for subsription ${subsId}. Stopping WorkFlow.`)
        return
    }

    for (const remindDay of REMINDERS) {
        const reminderDate = renewDate.subtract(remindDay, "day")

        if (reminderDate.isAfter(dayjs())) {
            await haltUntilReminder(context, `Reminder ${remindDay} days before`, reminderDate)
        }
        await triggerReminder(context, `Reminder ${remindDay} days before`)
    }
})

const haltUntilReminder = async (context, label, date) => {
    console.log(`Halt until ${label} reminder at ${date}`)
    await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`)
    })
}

const fetchSub = async (context, subsId) => {
    return await context.run("get subsriptions...", async () => {
        return Subs.findById(subsId).populate("user", "name email")
    })
}