import { queryGeneric, mutationGeneric } from "convex/server";
import { v } from "convex/values";

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

export const createUser = mutationGeneric({
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", args);
  },
});