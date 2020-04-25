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
};

module.exports = Query;
