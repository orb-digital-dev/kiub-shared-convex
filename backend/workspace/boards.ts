// @ts-nocheck
import { queryGeneric, mutationGeneric, DefaultFunctionArgs } from "convex/server";
import { v } from "convex/values";

export const getAllBoards = queryGeneric({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("boards").collect();
  },
});

export const getBoard = queryGeneric({
  args: {id: v.id("boards")},
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBoardsFromWorkspaceWithUserPopulated = queryGeneric({
    args: {workspaceId: v.id("workspaces")},
    handler: async (ctx, args) => {
      let boards = await ctx.db.query("boards").collect();

      for (let i = 0; i < boards.users.length; i++) {
          const element = boards.users[i];
          
          boards.users[i] = {
              ...element,
              user: await ctx.db.get(element.user)
          };
      }
  
      return boards;
    },
  });

// export const getBoardByOwnerId = queryGeneric({
//   args: {owner: v.id("users")},
//   handler: async (ctx, args) => {
//     return await ctx.db.query("boards").filter(q => q.eq(q.field("owner"), args.owner)).first();
//   },
// });

export const createBoard = mutationGeneric({
  handler: async (ctx, args) => {
    return await ctx.db.insert("boards", {
      updatedAt: (new Date()).toISOString(),
      ...args,
    });
  },
});

export const updateBoards = mutationGeneric({
  handler: async (ctx, args) => {
    delete args?._creationTime;
    return await ctx.db.patch(args._id, {
      updatedAt: (new Date()).toISOString(),
      ...args,
    });
  },
});