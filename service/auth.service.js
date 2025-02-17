import { createAccessToken } from '../libs/jwt.js';
import User from '../models/user.model.js'


export async function createOrUpdateUser(email, uid, name, provider) {
  let user = await User.findOne({ email });

  if (!user) {
    const newUser = new User({
      email,
      uid,
      name,
      authProvider: provider 
    });
    user = await newUser.save();
  }

  const payload = {
    id: user.id,
    uid: user.uid
  };

  return await createAccessToken(payload);

}


