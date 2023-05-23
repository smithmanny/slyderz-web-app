import db from "db";

export default async (input, ctx) => {
  const userId = ctx.session.userId;
  return await db.user.delete({
    where: {
      id: userId,
    },
  });
};
