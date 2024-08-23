// @ts-nocheck
import { queryGeneric, mutationGeneric, DefaultFunctionArgs } from "convex/server";
import { v } from "convex/values";

export const getAllLists = queryGeneric({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("lists").collect();
  },
});

export const getList = queryGeneric({
  args: {id: v.id("lists")},
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getListsByUserId = queryGeneric({
  args: {userId: v.id("users")},
  handler: async (ctx, args) => {
    return await ctx.db.query("lists").filter(q => q.eq(q.field("user"), args.userId)).collect();
  },
});

export const getListsByBoardId = queryGeneric({
  args: {boardId: v.id("users")},
  handler: async (ctx, args) => {
    return await ctx.db.query("lists").filter(q => q.eq(q.field("board"), args.boardId)).collect();
  },
});

export const createLists = mutationGeneric({
  handler: async (ctx, args) => {
    return await ctx.db.insert("lists", {
      updatedAt: (new Date()).toISOString(),
      ...args,
    });
  },
});

// export const updateLists = mutationGeneric({
//   handler: async (ctx, args) => {
//     delete args?._creationTime;
//     return await ctx.db.patch(args._id, {
//       updatedAt: (new Date()).toISOString(),
//       ...args,
//     });
//   },
// });

// export const deleteTempShared = mutationGeneric({
//   handler: async (ctx, args) => {
//     return await ctx.db.delete(args._id);
//   },
// });