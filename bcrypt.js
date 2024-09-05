const bcrypt = require('bcrypt');
const pool = require('./config/db'); // 根据你的配置路径调整

(async () => {
    try {
        const [users] = await pool.query('SELECT id, password FROM users');

        for (const user of users) {
            // 如果密码还没有被加密，进行加密
            if (!user.password.startsWith('$2b$')) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id]);
            }
        }

        console.log('Passwords successfully hashed and updated.');
    } catch (error) {
        console.error('Error updating passwords:', error);
    } finally {
        pool.end(); // 结束数据库连接
    }
})();
