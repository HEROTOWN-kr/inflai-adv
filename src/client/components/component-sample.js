import React from 'react';

function Sample() {
  return (
    <div>Sample</div>
  );
}

export default Sample;


/*
const bcrypt = require('bcryptjs');

tableName: 'TB_ADVERTISER',
    instanceMethods: {
  generateHash(password) {
    return bcrypt.hash(password, bcrypt.genSaltSync(8));
  },
  validPassword(password, hash, callback) {
    return bcrypt.compare(password, hash, (err, res) => {
      if (err) callback(err, null);
      else callback(null, res);
    });
  }
} */
