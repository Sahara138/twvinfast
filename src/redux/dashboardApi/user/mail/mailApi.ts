import {type MailboxThreadsResponse, type MailboxType, type Thread } from "../../../../types/User/Mail";
import { baseAPI } from "../../../baseAPI/baseApi";

const mailboxApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getMailboxInfo: build.query<MailboxType, void>({
      query: () => ({
        url: "/users/me/mailbox",
        method: "GET",
      }),
      providesTags: ["Mailbox"],
    }),
    getMailboxByMailboxId: build.query<MailboxThreadsResponse, { mailboxId: number; page: number }>({
      query: ({ mailboxId, page }) => ({
        url: "/threads",
        method: "GET",
        params: { mailbox_id: mailboxId, page }, // add page here
      }),
      providesTags: ["Mailbox"],
    }),
    getThreadByTreadId: build.query<Thread, { threadId: number | undefined }>({
      query: ({ threadId }) => ({
        url: `/threads/${threadId}`,
        method: "GET",
      }),
      providesTags: ["Thread"],
    }),


    //   toggleStar: build.mutation<void, { threadId: number }>({
    //   query: ({ threadId }) => ({
    //     url: `/threads/${threadId}/star`,
    //     method: "PATCH",
    //   }),
    //   invalidatesTags: ["Mailbox"],
    // }),
    composeEmail: build.mutation<any, any>({
      query: (body) => ({
        url: "/mail/smtp/send",
        method: "POST",
        body
      }),
      invalidatesTags: ["Thread"],
    }),
    replyEmail: build.mutation<any, any>({
      query: (body) => ({
        url: "/mail/smtp/send",
        method: "POST",
        body
      }),
      invalidatesTags: ["Thread"],
    }),
    forawrdEmail: build.mutation<any, any>({
      query: (body) => ({
        url: "/mail/smtp/send",
        method: "POST",
        body
      }),
      invalidatesTags: ["Thread"],
    }),
    saveDraft: build.mutation<any, any>({
      query: (body) => ({
        url: "/mail/smtp/draft", // or whatever endpoint
        method: "POST",
        body,
      }),
      invalidatesTags: ["Thread"],
    }),

    archiveMail: build.mutation<void, { threadId: number }>({
      query: ({ threadId }) => ({
        url: `/threads/${threadId}/archive`,
        method: "PATCH",
      }),
      invalidatesTags: ["Mailbox"],
    }),
    getArchivedMailByMailboxId: build.query<MailboxThreadsResponse, { mailboxId: number; page: number,folder:string }>({
      query: ({ mailboxId, page ,folder}) => ({
        url: "/threads",
        method: "GET",
        params: { mailbox_id: mailboxId, page ,folder: folder }, // add page here
      }),
      providesTags: ["Mailbox"],
    }),

    unArchiveMail: build.mutation<void, { threadId: number }>({
      query: ({ threadId }) => ({
        url: `/threads/${threadId}/unarchive`,
        method: "PATCH",
      }),
      invalidatesTags: ["Mailbox"],
    }),
    assignThreadLabel: build.mutation({
      query: ({ thread_id, label_id }: { thread_id: number; label_id: number }) => ({
        url: `/thread-labels/assign`,
        method: "POST",
        body: { thread_id, label_id },
      }),
    }),
    readMail: build.mutation<void, { threadId: number[] }>({
      query: ({ threadId }) => ({
        url: `/threads/${threadId}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Mailbox"],
    }),
    unReadMail: build.mutation<void, { threadId: number[] }>({
      query: ({ threadId }) => ({
        url: `/threads/${threadId}/unread`,
        method: "PATCH",
      }),
      invalidatesTags: ["Mailbox"],
    }),
    starredMail: build.mutation<void, { threadId: number[] }>({
      query: () => ({
        url: `/threads/bulk`,
        method: "PATCH",
      }),
      invalidatesTags: ["Mailbox"],
    }),
    unStarredMail: build.mutation<void, { threadId: number[] }>({
      query: ({ threadId }) => ({
        url: `/threads/${threadId}/unread`,
        method: "PATCH",
      }),
      invalidatesTags: ["Mailbox"],
    }),
  }),

});

export const { 
  useGetMailboxInfoQuery,
  useGetMailboxByMailboxIdQuery,
  useArchiveMailMutation,
  useUnArchiveMailMutation,
  useGetArchivedMailByMailboxIdQuery,
  useGetThreadByTreadIdQuery,
  useComposeEmailMutation,
  useReplyEmailMutation,
  useForawrdEmailMutation,
  useSaveDraftMutation,
  useReadMailMutation,
  useUnReadMailMutation,
  useStarredMailMutation,
  useUnStarredMailMutation,
  useAssignThreadLabelMutation
} = mailboxApi;
