import type {
  LabelFormData,
  LabelType,
} from "../../../../types/User/Label";
import { baseAPI } from "../../../baseAPI/baseApi";

const labelApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    // GET labels by mailbox
    getLabelByMailbox: build.query<LabelType[], number>({
      query: (mailboxId) => ({
        url: "/thread-labels",
        method: "GET",
        params: {
          mailbox_id: mailboxId,
        },
      }),
      providesTags: ["Label"],
    }),

    // CREATE label
    createLabelByMailbox: build.mutation<
      LabelType,
      { mailboxId: number; data: LabelFormData }
    >({
      query: ({ mailboxId, data }) => ({
        url: "/thread-labels",
        method: "POST",
        params: {
          mailbox_id: mailboxId,
        },
        body: data,
      }),
      invalidatesTags: ["Label"],
    }),

    // UPDATE label
    updateLabel: build.mutation<
      LabelType,
      { labelId: number; data: LabelFormData }
    >({
      query: ({ labelId, data }) => ({
        url: `/thread-labels/${labelId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Label"],
    }),

    // DELETE label
    deleteLabel: build.mutation<
      { success: boolean },
      number
    >({
      query: (labelId) => ({
        url: `/thread-labels/${labelId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Label"],
    }),
  }),
});

export const {
  useGetLabelByMailboxQuery,
  useCreateLabelByMailboxMutation,
  useUpdateLabelMutation,
  useDeleteLabelMutation,
} = labelApi;
