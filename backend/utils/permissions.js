const AccessControl = require('accesscontrol');

const ac = new AccessControl();

const resources = ['categories', 'comments', 'posts', 'subscribers', 'users'];

ac.grant('user').readAny(resources);

ac.grant('admin')
  .extend('user')
  .createOwn(resources)
  .updateAny(resources)
  .deleteAny(resources);

module.exports = ac;
