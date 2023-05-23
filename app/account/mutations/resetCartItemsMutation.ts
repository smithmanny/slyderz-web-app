export default async (input, ctx) => {
  return await ctx.session.$setPublicData({
    cart: {
      pendingCartItems: [],
      total: 0,
    },
  });
};
