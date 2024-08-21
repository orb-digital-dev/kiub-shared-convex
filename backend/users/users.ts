// @ts-nocheck
import { queryGeneric, mutationGeneric, DefaultFunctionArgs } from "convex/server";
import { v } from "convex/values";
import { NonDocumentUser } from "src/types/user.types";

export const getUsers = queryGeneric({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getUser = queryGeneric({
  args: {id: v.id("users")},
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateOrCreateUser = mutationGeneric({
  handler: async (ctx, args) => {
    const user = await ctx.db.query("users").filter(e => e.eq(e.field("primaryEmail"), args?.primaryEmail)).first();
    if(user){
      delete args?.primaryEmail;
      await ctx.db.patch(user?._id, args);
      return await ctx.db.get(user?._id);
    }
    return await ctx.db.insert("users", {
      storageUsed: 0,
      callMinuteUsed: 0,
      callMinuteOverAll: 0,
      lastCallTimeRefresh: (new Date()).toISOString(),
      lastBoardId: 'unsorted',
      accountType: 'Individual',
      accountCategory: [],
      accountDailyRoutine: [],
      connectedEmails: [],
      isAccountActive: true,
      subscription: {
        currentSubscription: 'free',
        nextSubscription: 'free',
        isCancelledRequest: false,
        billingCircle: 30
      },
      stripe: {
        hasAccount: false,
        customer: {}
      },
      notification: {
        device: false,
        deviceToken: "",
        email: true,
        updateFrequency: "instantly",
      },
      hasUserSeenUpcomingTasks: false,
      weekStartDay: "Sun",
      timeFormat: "12",
      lastTrayBoardDetails: {
        note: {
          title: "Unsorted",
          id: "unsorted",
        },
        task: {
          title: "Unsorted",
          id: "unsorted",
        },
      },
      hasSignedGoogle: false,
      hasSignedMicrosoft: false,
      ...args,
    });
  },
});