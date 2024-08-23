// @ts-nocheck
import { queryGeneric, mutationGeneric, DefaultFunctionArgs } from "convex/server";
import { v } from "convex/values";

export const getAllUserSubscriptions = queryGeneric({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("userSubscriptions").collect();
  },
});

export const getUserSubscription = queryGeneric({
  args: {id: v.id("userSubscriptions")},
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createUserSubscription = mutationGeneric({
  handler: async (ctx, args) => {
    return await ctx.db.insert("userSubscriptions", {
      updatedAt: (new Date()).toISOString(),
      ...args,
    });
  },
});