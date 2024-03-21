const Admin = require('../model/AdminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    userId: user.id
  }

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 * 24 });
  return token;
}

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Admin.findOne({where: {email}});
    // return res.status(200).json(user);
    if (!user) {
      return res.status(401).json({ message: 'このメールは存在しません。 もう一度メールアドレスを入力してください。' }); //'このメールは存在しません。 もう一度メールアドレスを入力してください。'
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'パスワードが間違っています。 パスワードを確認してください。' });//'パスワードが間違っています。 パスワードを確認してください。'
    }

    const token = generateToken(user);

    res.status(200).json({
      payload: {
        user,
        token
      },
      message: 'ログインに成功しました。'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.loginWithToken = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const user = await Admin.findByPk(userId);
    
    if (!user) {
      return res.status(401).json({ message: 'このメールは存在しません。 もう一度メールアドレスを入力してください。' });//'このメールは存在しません。 もう一度メールアドレスを入力してください。'
    }
    const token = generateToken(user);
    res.status(200).json({
      payload: {
        user,
        token
      },
      message: 'Login with token Successfully'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.signupAdmin = async (req, res) => {
  console.log(req.body);
  try {
    const user = await Admin.findOne({where: {email: req.body.email}})
    if (user) {
      return res.status(401).json({ message: 'This email already exist. Please enter another email address.' });
    }
    const newUser = await Admin.create(req.body);
    // return res.status(200).json(newAdmin);
    res.status(200).json({
      user: newUser,
      message: 'User created successfully'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { id: userId } = req.user;
  
  try {
    const user = await Admin.findByPk(userId);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'パスワードが間違っています。 パスワードを確認してください。' })//'パスワードが間違っています。 パスワードを確認してください。'
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
      user,
      message: 'Password was changed successfully.'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}