// @ts-nocheck
import { queryGeneric, mutationGeneric, DefaultFunctionArgs } from "convex/server";
import { v } from "convex/values";

export const getAllTempShareds = queryGeneric({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tempshareds").collect();
  },
});

export const getTempShared = queryGeneric({
  args: {id: v.id("tempshareds")},
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getTempSharedByOwnerId = queryGeneric({
  args: {owner: v.id("users")},
  handler: async (ctx, args) => {
    return await ctx.db.query("tempshareds").filter(q => q.eq(q.field("owner"), args.owner)).first();
  },
});

export const createTempShared = mutationGeneric({
  handler: async (ctx, args) => {
    return await ctx.db.insert("tempshareds", {
      updatedAt: (new Date()).toISOString(),
      ...args,
    });
  },
});

export const updateTempShared = mutationGeneric({
  handler: async (ctx, args) => {
    delete args?._creationTime;
    return await ctx.db.patch(args._id, {
      updatedAt: (new Date()).toISOString(),
      ...args,
    });
  },
});

export const deleteTempShared = mutationGeneric({
  handler: async (ctx, args) => {
    return await ctx.db.delete(args._id);
  },
});