import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  date: z.string().min(1, { message: "日付は必須です" }),
  amount: z
    .number()
    .min(1, { message: "金額は一円以上である必要があります。" }),
  content: z
    .string()
    .min(1, { message: "内容を入力してください" })
    .max(50, { message: "内容は50文字以内にしてください" }),
  category: z
    .union([
      z.enum([
        "食費",
        "日用品",
        "住居費",
        "娯楽",
        "医療費",
        "子供",
        "外食",
        "自己投資",
        "その他",
      ]),
      z.enum(["給与", "副収入"]),
      z.literal(""),
    ])
    .refine((val) => val !== "", { message: "カテゴリを選択してください" }),
});

export type Schema =z.infer<typeof transactionSchema>
