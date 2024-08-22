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

export const getWorkspaceWithUserPopulated = queryGeneric({
  args: {id: v.id("workspaces")},
  handler: async (ctx, args) => {
    let workspaces = await ctx.db.get(args.id);
    // workspaces.users = workspace.users.map(object => {
    //     return {
    //         ...object,
    //         user: await ctx.db.get(object.user)
    //     };
    // });
    for (let i = 0; i < workspaces.users.length; i++) {
        const element = workspaces.users[i];
        
        workspaces.users[i] = {
            ...element,
            user: await ctx.db.get(element.user)
        };
    }

    return workspaces;
  },
});

export const getWorkspaceAssociatedWithMe = queryGeneric({
  args: {ownerId: v.optional(v.id("users")), email: v.optional(v.string())},
  handler: async (ctx, args) => {
      
    try {
        let workspaces =await ctx.db.query("workspaces").collect();
        workspaces = workspaces.filter(item => {
    
            if(item?.isDeleted){
                return false
            }
    
            if(item?.owner == args.ownerId){
                return true;
            }
            if(item?.users?.map(item => item?.email).includes(args.email)){
                return true;
            }
            return false;
        });
        
        for (let i = 0; i < workspaces.length; i++) {
            const workspace = workspaces[i];
            for (let j = 0; j < workspaces[i].users.length; j++) {
                const object = workspaces[i].users[j];
                workspaces[i].users[j] = {
                    ...object,
                    user: await ctx.db.get(object.user)
                };
            }
            
            workspaces[i].owner = await ctx.db.get(workspaces[i].owner);
            if(workspaces[i].defaultBoard){
                workspaces[i].defaultBoard = await ctx.db.get(workspaces[i].defaultBoard);
            }
            
        }
    
        return workspaces;
        
    } catch (error) {
        console.error(error);
    }
  },
});

export const getWorkspaceBySlugOrId = queryGeneric({
  args: {workspaceId: v.optional(v.string())},
  handler: async (ctx, args) => {
      
    try {
        let workspaces =await ctx.db.query("workspaces").collect();
        workspaces = workspaces.filter(item => {
    
            if(item?.isDeleted){
                return false
            }
    
            if(item?._id == args.workspaceId){
                return true;
            }
            if(item?.slug == args.workspaceId){
                return true;
            }
            return false;
        });
        
        for (let i = 0; i < workspaces.length; i++) {
            const workspace = workspaces[i];
            for (let j = 0; j < workspaces[i].users.length; j++) {
                const object = workspaces[i].users[j];
                workspaces[i].users[j] = {
                    ...object,
                    user: await ctx.db.get(object.user)
                };
            }
            
            workspaces[i].owner = await ctx.db.get(workspaces[i].owner);
            if(workspaces[i].defaultBoard){
                workspaces[i].defaultBoard = await ctx.db.get(workspaces[i].defaultBoard);
            }
            
        }
    
        return workspaces;
        
    } catch (error) {
        console.error(error);
    }
  },
});

export const getWorkspaceByOwnerId = queryGeneric({
  args: {owner: v.id("users")},
  handler: async (ctx, args) => {
    return await ctx.db.query("workspaces").filter(q => q.eq(q.field("owner"), args.owner)).first();
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
export const createWorkspaceFullResponse = mutationGeneric({
  handler: async (ctx, args) => {
    const _id = await ctx.db.insert("workspaces", {
      updatedAt: (new Date()).toISOString(),
      ...args,
    });

    return await ctx.db.get(_id);
  },
});

export const updateWorkspace = mutationGeneric({
  handler: async (ctx, args) => {
    delete args?._creationTime;
    return await ctx.db.patch(args._id, {
      updatedAt: (new Date()).toISOString(),
      ...args,
    });
  },
});