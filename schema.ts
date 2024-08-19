import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
    {
        // Declaration for workspace
        workspaces: defineTable({
            title: v.string(),
            logo: v.optional(v.string()),
            owner: v.id("users"),
            defaultBoard: v.optional(v.id("boards")),
            status: v.optional(v.string()),
            slug: v.optional(v.string()),
            users: v.optional(v.array(v.object({
                id: v.string(),
                user: v.id("users"),
                inviterUser: v.id("users"),
                email: v.string(),
                requestAccess: v.boolean(),
                board: v.id("boards"),
                status: v.optional(v.string()),
                createdAt: v.string(),
                updatedAt: v.string()
            }))),
        }),

        // Declaration for board
        boards: defineTable({
            user: v.id("users"),
            workspace: v.id("workspace"),
            title: v.string(),
            restricted: v.boolean(),
            archived: v.boolean(),
            isDefaultySorted: v.boolean(),
            sharableTitle: v.string(),
            isDeleted: v.boolean(),
            deletedAt: v.string(),
            users: v.optional(v.array(v.object({
                id: v.string(),
                user: v.id("users"),
                email: v.string(),
                role: v.string(),
                status: v.string(),
                requestAccess: v.boolean(),
                createdAt: v.string(),
                updatedAt: v.string()
            }))),
        }),

        // Declaration for user
        users: defineTable({
            firstName: v.string(),
            lastName: v.string(),
            primaryEmail: v.string(),
            storageUsed: v.optional(v.number()),
            callMinuteUsed: v.optional(v.number()),
            callMinuteOverAll: v.optional(v.number()),
            lastCallTimeRefresh: v.optional(v.string()),
            phone: v.optional(v.string()),
            countryCode: v.optional(v.string()),
            bio: v.optional(v.string()),
            lastBoardId: v.optional(v.string()),
            accountType: v.optional(v.array(v.string())),
            accountCategory: v.optional(v.array(v.string())),
            accountDailyRoutine: v.optional(v.array(v.string())),
            showPhonePublicly: v.optional(v.boolean()),
            dateOfBirth: v.optional(v.string()),
            nextAvailableDate: v.optional(v.string()),
            gender: v.optional(v.string()),
            connectedEmails: v.optional(v.array(v.string())),
            payments: v.optional(v.object(
                {
                    paypal: v.object({
                        clientId: v.string(),
                        secret: v.string(),
                        metadata: v.any(),
                    })
                }
            )),
            cryptedPassword: v.optional(v.string()),
            lastOtp: v.optional(v.string()),
            isAccountActive: v.optional(v.boolean()),
            userOnboarded: v.optional(v.boolean()),
            timezone: v.optional(v.string()),
            description: v.optional(v.string()),
            websiteLink: v.optional(v.string()),
            instagramLink: v.optional(v.string()),
            twitterLink: v.optional(v.string()),
            facebookLink: v.optional(v.string()),
            youtubeLink: v.optional(v.string()),
            linkedinLink: v.optional(v.string()),
            mediumLink: v.optional(v.string()),
            dribbleLink: v.optional(v.string()),
            workingHoursStart: v.optional(v.string()),
            workingHoursEnd: v.optional(v.string()),
            preferredMeetingDays: v.optional(v.array(v.string())),
            nextAvailableDay: v.optional(v.string()),
            originalPersonalLink: v.optional(v.string()),
            personalLink: v.optional(v.string()),
            personalLinkCount: v.optional(v.number()),
            availability: v.optional(v.boolean()),
            manuallyAltered: v.optional(v.boolean()),
            avatar: v.optional(v.string()),
            coverImage: v.optional(v.string()),
            defaultMeetingsCreated: v.optional(v.boolean()),
            accountAccessedFrom: v.optional(v.string()),
            subscription: v.optional(v.object({
                currentSubscription: v.string(),
                nextSubscription: v.string(),
                payment_plan: v.string(),
                isCancelledRequest: v.boolean(),
                dateLastSubscribed: v.string(),
                billingCircle: v.number(),
                dateforAction: v.string(),
            })),
            stripe: v.optional(v.object({
                hasAccount: v.boolean(), 
                customer: v.any()
            })),
            lastSyncedDate: v.optional(v.string()),
            notification: v.optional(v.object({
              device: v.boolean(),
              deviceToken: v.string(),
              updateFrequency: v.string(),
            })),
            cache: v.optional(v.object({
              event: v.any(),
            })),
            notion: v.optional(v.any()),
            hasUserSeenUpcomingTasks: v.optional(v.boolean()),
            actionOtp: v.optional(v.string()),
            weekStartDay: v.optional(v.string()),
            country: v.optional(v.object({
                name: v.string(),
                code: v.string(),
            })),
            autoUpdateTimezone: v.optional(v.boolean()),
            timeFormat: v.optional(v.string()),
            trello_token: v.optional(v.string()),
            trelloTokenCollections: v.optional(v.array(v.object({
                token: v.string(),
                user: v.any(),
                isDefault: v.boolean()
            }))),
            github_token: v.optional(v.string()),
            jira_cred: v.optional(v.object({
                access_token: v.string(),
                refresh_token: v.string(),
                cloudid: v.string(),
                expire_in: v.string(),
            })),
            gmailToken: v.optional(v.any()),
            gmailTokenCollections: v.optional(v.array(v.object({
                tokens: v.any(),
                user: v.any(),
                isDefault: v.boolean()
            }))),
            hasPlannedToday: v.optional(v.boolean()),
            activeCalendarAccount: v.optional(v.array(v.object({
                providerId: v.string(),
                providerName: v.string(),
            }))),
            lastTrayBoardDetails: v.optional(v.object({
                note: v.object({
                    title: v.string(),
                    id: v.string()
                }),
                task: v.object({
                    title: v.string(),
                    id: v.string()
                }),
            })),
            hasSignedGoogle: v.optional(v.boolean()),
            hasSignedMicrosoft: v.optional(v.boolean()),
            todoist_token: v.optional(v.string()),
            links: v.optional(v.array(v.object({
                id: v.string(),
                title: v.string(),
                link: v.string(),
                coverImage: v.string(),
                logo: v.string(),
                emoji: v.string(),
                isActive: v.boolean(),
                isAchieved: v.boolean(),
                createdAt: v.string(),
                updatedAt: v.string()
            }))),
            files: v.optional(v.array(v.object({
                id: v.string(),
                public_id: v.string(),
                public_link: v.string(),
                name: v.string(),
                size: v.string(),
                extension: v.string(),
                mime: v.string(),
                isActive: v.boolean(),
                isAchieved: v.boolean(),
            }))),
            accounts: v.optional(v.array(v.object({
                id: v.string(),
                accountId: v.string(),
                accountData: v.any(),
                accountType: v.string(),
                accountProvider: v.string(),
                accountEmail: v.string(),
                accountEmailId: v.string(),
                accountToken: v.string(),
                accountAccessToken: v.string(),
                accountRefreshToken: v.string(),
                accountScopes: v.string(),
                accountTokenType: v.string(),
                accountExpiryDate: v.string(),
                accountFirstName: v.string(),
                accountLastName: v.string(),
                accountAvatar: v.string(),
                accountCalendarAccess: v.string(),
                accountAccessedFrom: v.string(),
            }))),
            lastWorkspace: v.optional(v.id("workspaces"))
        }),
    },
    {
        schemaValidation: true
    }
);