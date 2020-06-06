const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  items: forwardTo("db"),

  item: forwardTo("db"),

  itemsConnection: forwardTo("db"),

  me(parent, args, ctx, info) {
    const userId = ctx.request.userId
    // check if there is a current user id
    if(!userId) {
      return null;
    }
    return ctx.db.query.user({
      where: { id: userId }
    }, info);
  },

  async users(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if(!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    // 2. Check if user has permissions to query all users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    // 3. if they do, query all users
    return ctx.db.query.users({}, info)
  },

  async order(parent, args, ctx, info) {
    // 1. make sure they are logged in
    const userId = ctx.request.userId
    if(!userId) {
      throw new Error("You aren't logged in");
    }
    // 2. query the current order
    const order = await ctx.db.query.order({
      where: { id: args.id},
    }, info);
    // 3. check if they have the permissions to see this order
    const ownsOrder = order.user.id === userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes("ADMIN");
    if(!ownsOrder || !hasPermissionToSeeOrder) {
      throw new Error("You don't have permission to view this order");
    }
    // 4. return the order
    return order;
  },

  async orders(parent, args, ctx, info) {
    // 1. make sure they are logged in
    const userId = ctx.request.userId
    if(!userId) {
      throw new Error("You arnae logged in loon");
    }
    // 2. query for all orders they own
    const orders = await ctx.db.query.orders({
      where: { user: { id: userId }}
    }, info);
    // 3. return the orders
    return orders;
  }

};

module.exports = Query;
