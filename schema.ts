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
                id: v.optional(v.string()),
                user: v.optional(v.id("users")),
                inviterUser: v.optional(v.id("users")),
                email: v.optional(v.string()),
                requestAccess: v.optional(v.boolean()),
                board: v.optional(v.id("boards")),
                role: v.optional(v.string()),
                status: v.optional(v.optional(v.string())),
                createdAt: v.optional(v.string()),
                updatedAt: v.optional(v.string())
            }))),
            updatedAt: v.optional(v.string()),
        }),

        // Declaration for savedCalendar
        savedCalendars: defineTable({
            accountProvider: v.optional(v.string()),
            accountEmail: v.optional(v.string()),
            accountEmailId: v.optional(v.string()),
            accountId: v.optional(v.string()),
            accountCalendarAccess: v.optional(v.boolean()),
            updatedAt: v.optional(v.string()),
        }),

        // Declaration for note
        notes: defineTable({
            user: v.id("users"),
            exceededCredit: v.optional(v.boolean()),
            board: v.id("boards"),
            meetingRecord: v.optional(v.id('userMeetingRecords')),
            title: v.string(),
            isAutoGenerated: v.optional(v.boolean()),
            isNoteTitleSet: v.optional(v.boolean()),
            body: v.optional(v.object({
                json: v.string(),
                html: v.string(),
            })),
            archived: v.optional(v.boolean()),
            isWidget: v.optional(v.boolean()),
            pinned: v.optional(v.boolean()),
            pinnedTimeStamp: v.optional(v.string()),
            hidden: v.optional(v.boolean()),
            users: v.optional(v.array(v.object({
                id: v.string(),
                user: v.id("users"),
                createdAt: v.string(),
                updatedAt: v.string()
            }))),
            attachments: v.optional(v.array(v.object({
                id: v.string(),
                attachmentType: v.string(),
                attachmentValue: v.string(),
                data: v.string(),
                mime: v.string(),
                extension: v.string(),
                name: v.string(),
                url: v.string(),
                createdAt: v.string(),
                updatedAt: v.string()
            }))),
            noteAttachment: v.optional(v.array(v.id("notes"))),
            eventAttachment: v.optional(v.array(v.string())),
            taskAttachment: v.optional(v.array(v.object({
                id: v.string(),
                taskId: v.string(),
                listId: v.string(),
                createdAt: v.string(),
                updatedAt: v.string()
            }))),
            isDeleted: v.optional(v.boolean())
        }),

        // Declaration for list
        lists: defineTable({
            user: v.id("users"),
            meetingRecord: v.optional(v.id('userMeetingRecords')),
            board: v.id("boards"),
            title: v.string(),
            orderIndex: v.number(),
            dragColumnIndex: v.number(),
            hidden: v.optional(v.boolean()),
            archived: v.optional(v.boolean()),
            isDefaultySorted: v.optional(v.boolean()),
            last_sort_type: v.optional(v.string()),
            isWidget: v.optional(v.boolean()),
            pinned: v.optional(v.boolean()),
            pinnedTimeStamp: v.optional(v.string()),
            tasks: v.optional(v.array(v.object({
                id: v.string(),
                user: v.id("users"),
                title: v.string(),
                description: v.string(),
                orderIndex: v.number(),
                dragItemIndex: v.number(),
                mostRecentIndex: v.number(),
                autoArchiveFromList: v.boolean(),
                dueDateIndex: v.number(),
                oldestFirstIndex: v.number(),
                done: v.boolean(),
                isFilterable: v.boolean(),
                isIndexable: v.boolean(),
                startDate: v.string(),
                dueDate: v.string(),
                dueTime: v.string(),
                trelloId: v.string(),
                eventId: v.string(),
                eventProviderId: v.string(),
                users: v.optional(v.array(v.object({
                    id: v.string(),
                    user: v.id("users"),
                    assignedFromSubTask: v.boolean(),
                    createdAt: v.string(),
                    updatedAt: v.string()
                }))),
                attachments: v.optional(v.array(v.object({
                    id: v.string(),
                    attachmentType: v.string(),
                    attachmentValue: v.string(),
                    data: v.string(),
                    mime: v.string(),
                    extension: v.string(),
                    name: v.string(),
                    type: v.string(),
                    url: v.string(),
                    createdAt: v.string(),
                    updatedAt: v.string()
                }))),
                noteAttachment: v.optional(v.array(v.id("notes"))),
                eventAttachment: v.optional(v.array(v.string())),
                taskAttachment: v.optional(v.array(v.object({
                    id: v.string(),
                    taskId: v.string(),
                    listId: v.string(),
                    createdAt: v.string(),
                    updatedAt: v.string()
                }))),
                archived: v.boolean(),
                subtasks: v.optional(v.array(v.object({
                    id: v.string(),
                    title: v.string(),
                    orderIndex: v.number(),
                    archived: v.boolean(),
                    trelloId: v.string(),
                    done: v.boolean(),
                    dueDate: v.string(),
                    dueTime: v.string(),
                    users: v.optional(v.array(v.object({
                        id: v.string(),
                        user: v.id("users"),
                        createdAt: v.string(),
                        updatedAt: v.string()
                    }))),
                }))),
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
                createdAt: v.optional(v.string()),
                updatedAt: v.optional(v.string())
            }))),
        }),

        // Declaration for tempshared
        tempshareds: defineTable({
            email: v.optional(v.string()),
            workspace: v.optional(v.id("workspace")),
            inviterUser: v.optional(v.id("users")),
            role: v.optional(v.string()),
            board: v.optional(v.id("boards")),
            type: v.optional(v.string()),
        }),

        // Declaration for duplicatebook
        duplicatebooks: defineTable({
            user: v.id("users"),
            eventId: v.string(),
            eventData: v.any(),
            generatedMessage: v.string(),
            status: v.number(),
        }),

        // Declaration for userSubscriptions
        userSubscriptions: defineTable({
            uuid: v.optional(v.string()),
            subscription: v.optional(v.id("subscriptions")),
            user: v.optional(v.id("users")),
            status: v.optional(v.string()),
            durationCycle: v.optional(v.number()),
            amountPaid: v.optional(v.number()),
            payment: v.optional(v.id("payments")),
            updatedAt: v.optional(v.string()),
        }),

        // Declaration for payments
        payments: defineTable({
            uuid: v.string(),
            status: v.string(),
            payment_channel: v.string(),
            payment_purpose: v.string(),
            user: v.id("users"),
            event: v.id("events"),
            link: v.id("userLinks"),
            amountPaid: v.id("userSubscriptions"),
            amount_to_pay: v.number(),
            amount_paid: v.number(),
            date_finalized: v.string(),
            transaction_ref: v.string(),
            external_transaction_ref: v.string(),
            transaction_id: v.string(),
        }),

        // Declaration for unsplashes
        unsplashes: defineTable({
            uuid: v.string(),
            unsplash: v.any()
        }),

        // Declaration for timelineRecords
        timelineRecords: defineTable({
            eventId: v.string(),
            trackEventId: v.string(),
            user: v.id("users"),
        }),

        // Declaration for recordMts
        recordMts: defineTable({
            workspaceId: v.id("workspaces"),
            recordList: v.array(v.object({
                trelloId: v.string()
            })),
        }),

        // Declaration for userLinks
        userLinks: defineTable({
            uuid: v.string(),
            link: v.string(),
            time: v.number(),
            amount: v.number(),
            currency: v.string(),
            measure: v.string(),
            user: v.id("users"),
            isPaid: v.boolean(),
            isActive: v.boolean(),
            templateData: v.object({
                title: v.string(),
                description: v.string(),
                guestsCanInviteOthers: v.boolean(),
                meetingLocation: v.string(),
                meetingLocationPhone: v.string(),
                meetingPhoneNumber: v.string(),
                meetingLocationInPerson: v.string(),
                meetingLocationInviteSet: v.string(),
                meetingMedium: v.string(),
                recurringRRULE: v.string(),
                recurringRRULEText: v.string(),
                recurring: v.boolean(),
                recurringRepeatEndsType: v.string(),
                recurringRepeatCustomEndSetDate: v.string(),
                recurringRepeatCustomEndModeValue: v.number(),
                recurringRepeatCustomEndModeType: v.string(),
                recurringRepeatValue: v.number(),
                recurringRepeatsOn: v.any(),
                questions: v.optional(v.array(v.object({
                    question: v.string(),
                    required: v.boolean(),
                }))),
            })
        }),

        // Declaration for subscriptions
        subscriptions: defineTable({
            key: v.string(),
            name: v.string(),
            amount: v.number(),
            payment_plans: v.optional(v.array(v.object({
                plan_type: v.string(),
                durationInDays: v.number(),
                amountPerMonth: v.number(),
            }))),
            durationInDays: v.number(),
            durationType: v.string(),
            description: v.object({
                storage: v.string(),
                aiCredit: v.string(),
                recordingMinute: v.string(),
                calendarAccountMax: v.number(),
                gmailAccountMax: v.number(),
                trelloAccountMax: v.number(),
                githubAccountMax: v.number(),
                jiraAccountMax: v.number(),
                notionAccountMax: v.number(),
                slackAccountMax: v.number(),
                todoistAccountMax: v.number(),
                asanaAccountMax: v.number(),
                clickupAccountMax: v.number(),
            }),
            updatedAt: v.optional(v.string()),
        }),

        // Declaration for eventrecallrecord
        eventRecallRecords: defineTable({
            user: v.id("users"),
            eventId: v.optional(v.string()),
            exceededCredit: v.boolean(),
            eventHangoutUrl: v.string(),
            accountProviderId: v.optional(v.string()),
            accountProviderName: v.optional(v.string()),
            recallId: v.string(),
            status: v.string(),
            meansOfCreation: v.string(),
            dateToJoin: v.optional(v.string()),
            isCancelled: v.boolean(),
            dateJoined: v.optional(v.string()),
            dateEnded: v.optional(v.string()),
            hasProcessedTranscript: v.boolean(),
        }),

        // Declaration for meetingRecord
        meetingRecords: defineTable({
            uid: v.optional(v.string()),
            title: v.optional(v.string()),
            date: v.optional(v.string()),
            summary: v.optional(v.string()),
            summary_one: v.optional(v.string()),
            task: v.optional(v.string()),
            audio_url: v.optional(v.string()),
            outline: v.optional(v.array(v.string())),
            transcript: v.optional(v.array(v.object({
                text: v.string(),
                raw_text: v.string(),
                speaker_name: v.string(),
                start_time: v.string(),
                end_time: v.string(),
                speaker_id: v.string(),
            }))),
            talkTime: v.optional(v.array(v.object({
                name: v.string(),
                count: v.string(),
                percent: v.string(),
            }))),
            focus: v.string(),
            keyword: v.string(),
            totalDurationInMin: v.number(),
            participantsEmail: v.array(v.string()),
            organizer_email: v.string(),
            host_email: v.string(),
            has_processed_to_individual_user: v.boolean(),
        }),

        // Declaration for userMeetingRecord
        userMeetingRecords: defineTable({
            uid: v.optional(v.string()),
            eventId: v.optional(v.string()),
            exceededCredit: v.boolean(),
            user: v.id("users"),
            meetingRecord: v.id("meetingRecords"),
            eventRecallRecord: v.id("eventRecallRecords"),
            title: v.optional(v.string()),
            date: v.optional(v.string()),
            summary: v.optional(v.string()),
            summary_one: v.optional(v.string()),
            task: v.optional(v.string()),
            audio_url: v.optional(v.string()),
            outline: v.optional(v.array(v.string())),
            transcript: v.optional(v.array(v.object({
                text: v.string(),
                raw_text: v.string(),
                speaker_name: v.string(),
                start_time: v.string(),
                end_time: v.string(),
                speaker_id: v.string(),
            }))),
            talkTime: v.optional(v.array(v.object({
                name: v.string(),
                count: v.string(),
                percent: v.string(),
            }))),
            focus: v.string(),
            keyword: v.string(),
            totalDurationInMin: v.number(),
            participantsEmail: v.array(v.string()),
            organizer_email: v.string(),
            host_email: v.string(),
            has_processed_to_individual_user: v.boolean(),
            has_processed_note: v.boolean(),
            has_processed_task: v.boolean(),
            has_processed_eventId: v.boolean(),
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
            accountType: v.optional(v.string()),
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
            accountAccessedFrom: v.optional(v.any()),
            subscription: v.optional(v.object({
                currentSubscription: v.string(),
                nextSubscription: v.string(),
                payment_plan: v.optional(v.string()),
                isCancelledRequest: v.optional(v.boolean()),
                dateLastSubscribed: v.optional(v.string()),
                billingCircle: v.optional(v.number()),
                dateforAction: v.optional(v.string()),
                defaultPaymentMethodId: v.optional(v.string()),
            })),
            stripe: v.optional(v.object({
                hasAccount: v.boolean(), 
                customer: v.any()
            })),
            lastSyncedDate: v.optional(v.string()),
            notification: v.optional(v.object({
              email: v.boolean(),
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
                name: v.any(),
                code: v.any(),
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
                accountId: v.optional(v.string()),
                accountData: v.optional(v.any()),
                accountType: v.optional(v.string()),
                accountProvider: v.optional(v.string()),
                accountEmail: v.optional(v.string()),
                accountEmailId: v.optional(v.string()),
                accountToken: v.optional(v.string()),
                accountAccessToken: v.optional(v.string()),
                accountRefreshToken: v.optional(v.string()),
                accountScopes: v.optional(v.string()),
                accountTokenType: v.optional(v.string()),
                accountExpiryDate: v.optional(v.any()),
                accountFirstName: v.optional(v.string()),
                accountLastName: v.optional(v.string()),
                accountAvatar: v.optional(v.string()),
                accountCalendarAccess: v.optional(v.string()),
                accountAccessedFrom: v.optional(v.string()),
            }))),
            lastWorkspace: v.optional(v.id("workspaces")),
            updatedAt: v.optional(v.string())
        }),
    },
    {
        schemaValidation: true
    }
);