const express = require('express');//引入express框架，搭建HTTP服务器和路由
require('dotenv').config(); // 加载.env配置
const mysql = require('mysql2/promise');//引入MySQL2 的 Promise 版本
const bcrypt = require('bcryptjs');//引入加密库bcryptjs。用于对用户密码进行哈希加盐加密
const jwt = require('jsonwebtoken');//引入 JSON Web Token 库。用于生成和验证用户登录状态的无状态 Token，实现前后端分离的鉴权机制。
const cors = require('cors');//引入 CORS 中间件，用于解决前端跨域请求同源策略限制的问题。
const path = require('path');//Node.js 内置路径模块，用于安全、跨平台地处理文件路径。
const app = express();//创建一个 Express 应用实例。
const PORT = process.env.PORT;//从环境变量中读取服务监听端口 JWT 签名密钥。
const JWT_SECRET = process.env.JWT_SECRET;
app.use(cors());//全局启用 CORS，允许任何源的跨域请求访问该服务器。
app.use(express.json());//全局启用 JSON 解析中间件，使得服务器能够解析 Content-Type 为 application/json 的请求体。
//托管静态页面，public文件夹放你的全部网页、图片、视频
app.use(express.static(path.join(__dirname, "public")));

//  MySQL连接池（从.env读取）
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 初始化数据库，自动创建用户表、存档表
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MySQL数据库连接成功");
    // 创建用户表
    await conn.query(`
    CREATE TABLE IF NOT EXISTS \`user\` (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
    `);
    // 创建玩家存档表
    await conn.query(`
    CREATE TABLE IF NOT EXISTS player_save (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      runes INT DEFAULT 15000,
      equip_state TEXT,
      FOREIGN KEY(user_id) REFERENCES \`user\`(id)
    )
    `);
    conn.release();
    console.log("✅ 数据表初始化完成");
  } catch (err) {
    console.error("❌ 数据库连接失败：", err);
  }
})();

// token校验中间件
function authMiddleware(req, res, next){
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    return res.status(401).json({code:401, msg:"未登录，请先登录"});
  }
  const token = authHeader.split(" ")[1];
  if(!token){
    return res.status(401).json({code:401, msg:"未登录，请先登录"});
  }
  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  }catch(e){
    if(e.name === "TokenExpiredError"){
      return res.status(401).json({code:401, msg:"登录凭证已过期，请重新登录"});
    }else{
      return res.status(401).json({code:401, msg:"无效的登录凭证"});
    }
  }
}

// 注册接口
app.post("/api/register", async (req,res)=>{
  const {username, password} = req.body;
  if(!username || !password) return res.status(400).json({msg:"账号和密码不能为空"});
  try {
    // bcrypt加密密码
    const hashPwd = bcrypt.hashSync(password, 10);
    // 插入用户
    const [result] = await pool.query(`INSERT INTO \`user\`(username,password) VALUES(?,?)`, [username, hashPwd]);
    const userId = result.insertId;
    // 注册同时新建一条空存档记录
    await pool.query(`INSERT INTO player_save(user_id,runes,equip_state) VALUES(?,?,?)`,
      [userId, 15000, JSON.stringify({})]);
    res.json({msg:"🎉 注册成功！"});
  } catch(err) {
    if(err.code === 'ER_DUP_ENTRY'){
      return res.status(400).json({msg:"用户名已经被占用"});
    }
    console.error(err);
    return res.status(500).json({msg:"注册失败"});
  }
})

// 登录接口，JWT设置24小时过期
app.post("/api/login", async (req,res)=>{
  const {username,password} = req.body;
  try {
    const [rows] = await pool.query(`SELECT * FROM \`user\` WHERE username=?`, [username]);
    const row = rows[0];
    if(!row) return res.status(400).json({msg:"账号不存在"});
    // bcrypt校验密码
    if(!bcrypt.compareSync(password, row.password)){
      return res.status(400).json({msg:"密码错误"});
    }
    // 签发token，有效期24小时
    const token = jwt.sign({userId:row.id}, JWT_SECRET, {expiresIn:"24h"});
    res.json({token, msg:"✅ 登录成功"});
  } catch(err) {
    console.error(err);
    return res.status(500).json({msg:"服务器错误"});
  }
})

// 获取存档数据（需要鉴权）
app.get("/api/load", authMiddleware, async (req,res)=>{
  try {
    const [rows] = await pool.query(`SELECT runes,equip_state FROM player_save WHERE user_id=?`, [req.userId]);
    const row = rows[0];
    if(!row || !row.equip_state){
      return res.json({msg:"读取成功", runes:15000, equip_state:{}});
    }
    const equipState = JSON.parse(row.equip_state);
    res.json({msg:"读取成功", runes: row.runes, equip_state: equipState});
  } catch(err) {
    console.error(err);
    return res.status(500).json({msg:"读取存档失败"});
  }
})

// 保存存档数据（需要鉴权）
app.post("/api/save", authMiddleware, async (req,res)=>{
  try {
    const {runes, equip_state} = req.body;
    const equipJson = JSON.stringify(equip_state);
    await pool.query(`UPDATE player_save SET runes=?, equip_state=? WHERE user_id=?`,
      [runes, equipJson, req.userId]);
    res.json({msg:"存档保存成功", runes, equip_state});
  } catch(err) {
    console.error(err);
    return res.status(500).json({msg:"保存存档失败"});
  }
})

// 首页推荐卡片接口
app.get('/api/home', async (req,res)=>{
  try{
    const [rows] = await pool.query("SELECT * FROM home");
    res.json({code:200, data:rows});
  }catch(err){
    console.error(err);
    res.json({code:500, msg:"读取失败"});
  }
})

// 交界地地理页面接口
app.get('/api/geography', async (req,res)=>{
  try{
    const [rows] = await pool.query("SELECT * FROM geography");
    res.json({code:200, data:rows});
  }catch(err){
    console.error(err);
    res.json({code:500, msg:"读取地理数据失败"});
  }
})

//半神角色接口
app.get('/api/demigod', async (req,res)=>{
  try{
    const [godList] = await pool.query("SELECT * FROM demigod");
    res.json({code:200, godList});
  }catch(err){
    console.error(err);
    res.json({code:500, msg:"读取半神数据失败"});
  }
})

//褪色者出身接口
app.get('/api/class', async (req,res)=>{
  try{
    const [classList] = await pool.query("SELECT * FROM class");
    res.json({code:200, classList});
  }catch(err){
    console.error(err);
    res.json({code:500, msg:"读取出身数据失败"});
  }
})

// 获取地下城列表接口
app.get('/api/dungeon-list', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM dungeon');
    res.json({ code: 200, data: rows });
  } catch (err) {
    console.error(err);
    res.json({ code: 500, msg: '读取地下城数据失败' });
  }
});

// 获取NPC全部数据接口
app.get('/api/npc-list', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM npc');
    // JSON字符串转对象，增加容错
    const list = rows.map(item => {
      try {
        return {
          npc_key: item.npc_key,
          name: item.name,
          title: item.title,
          avatar: item.avatar,
          init: {
            text: item.init_text,
            options: JSON.parse(item.init_options)
          },
          reply: JSON.parse(item.reply_data)
        }
      } catch(parseErr) {
        console.error(`NPC【${item.name}】JSON解析失败：`, parseErr.message);
        // 解析失败返回空对象，不中断整体加载
        return {
          npc_key: item.npc_key,
          name: item.name + "(数据损坏)",
          title: item.title,
          avatar: item.avatar,
          init: {
            text: "数据加载异常",
            options: []
          },
          reply: {}
        }
      }
    })
    res.json({ code: 200, data: list });
  } catch (err) {
    console.error(err);
    res.json({ code: 500, msg: '读取NPC数据失败' });
  }
});

// 获取世界观列表接口
app.get('/api/worldview', async (req, res) => {
  try {
    // 校验token，复用你现有的jwt验证中间件
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({msg:"未登录"});
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const [rows] = await pool.query('SELECT * FROM worldview ORDER BY sort ASC');
    res.json({
      list: rows
    })
  } catch(err){
    console.error(err);
    return res.status(401).json({msg:"身份验证失败"})
  }
})

// 启动服务，监听0.0.0.0，支持局域网其他设备访问
const os = require('os');

// 获取本机局域网IP的辅助函数
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // 排除 IPv6 和内部回环地址
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

app.listen(3000, '0.0.0.0', () => {
  console.log('后端服务启动成功！')
  console.log('本机访问：http://localhost:3000')
  console.log('公网访问：http://124.221.25.87:3000')
})

