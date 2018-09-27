import config from '../config'
import Account from '../models/Account'
import mongoose from 'mongoose';
import jwt from 'jwt-simple'
/**
 * Middleware for checking if we're logged in
 * @param ctx
 * @param next
 */
export default async (ctx, next) => {

  ctx.authorized = false
  if (!ctx.token || !ctx.account || !ctx.account.id) {
    ctx.status = 401
    ctx.redirect('/')
    throw new Exception('Token is invalid: ' + ctx.token)
  }
  const account = await Account.findOne({
    '_id': mongoose.Types.ObjectId(ctx.account.id),
    token: ctx.token
  }, 'token');
  if (!account) {
    ctx.cookies.set('token', null)
    ctx.token = null;
    ctx.status = 401;
    ctx.redirect('/');
    throw new Exception('Invalid token');
  }
  const decoded = jwt.decode(account.token, config.session.secret)
  if (Date.now() < decoded.expires) {
    ctx.authorized = true;
  } else {
      ctx.cookies.set('token', null)
      ctx.token = null;
      ctx.status = 401;
      ctx.redirect('/')
      throw new Exception('Token expired: ' + new Date(decoded.expires))
  }
  await next()
}
