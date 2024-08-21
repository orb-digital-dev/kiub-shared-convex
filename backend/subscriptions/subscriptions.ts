// @ts-nocheck
import { queryGeneric, mutationGeneric, DefaultFunctionArgs } from "convex/server";
import { v } from "convex/values";

export const getAllSubscriptions = queryGeneric({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("subscriptions").collect();
  },
});

export const getSubscription = queryGeneric({
  args: {id: v.id("subscriptions")},
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createSubscription = mutationGeneric({
  handler: async (ctx, args) => {
    return await ctx.db.insert("subscriptions", {
      updatedAt: (new Date()).toISOString(),
      ...args,
    });
  },
});