// @ts-nocheck
import { queryGeneric, mutationGeneric, DefaultFunctionArgs } from "convex/server";
import { v } from "convex/values";

export const getAllSavedCalendars = queryGeneric({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("savedCalendars").collect();
  },
});

export const getSavedCalendar = queryGeneric({
  args: {id: v.id("savedCalendars")},
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getSavedCalendarByAccountId = queryGeneric({
  args: {accountId: v.string()},
  handler: async (ctx, args) => {
    return await ctx.db.query("savedCalendars").filter(q => q.eq(q.field("accountId"), args.accountId)).collect();
  },
});

export const createSavedCalendar = mutationGeneric({
  handler: async (ctx, args) => {
    return await ctx.db.insert("savedCalendars", {
      updatedAt: (new Date()).toISOString(),
      ...args,
    });
  },
});

export const updateSavedCalendar = mutationGeneric({
  handler: async (ctx, args) => {
    delete args?._creationTime;
    return await ctx.db.patch(args._id, {
      updatedAt: (new Date()).toISOString(),
      ...args,
    });
  },
});

export const deleteSavedCalendar = mutationGeneric({
  handler: async (ctx, args) => {
    return await ctx.db.delete(args._id);
  },
});