// @ts-nocheck
import { queryGeneric, mutationGeneric, DefaultFunctionArgs } from "convex/server";
import { v } from "convex/values";

export const getAllWorkspaces = queryGeneric({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});

export const getWorkspace = queryGeneric({
  args: {id: v.id("workspaces")},
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createWorkspace = mutationGeneric({
  handler: async (ctx, args) => {
    return await ctx.db.insert("workspaces", {
      updatedAt: (new Date()).toISOString(),
      ...args,
    });
  },
});