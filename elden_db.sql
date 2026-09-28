/*
 Navicat Premium Dump SQL

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80040 (8.0.40)
 Source Host           : localhost:3306
 Source Schema         : elden_db

 Target Server Type    : MySQL
 Target Server Version : 80040 (8.0.40)
 File Encoding         : 65001

 Date: 16/09/2026 15:09:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `img_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES (1, '流浪骑士', '曾经效忠于黄金树的骑士，故土在褪色者放逐的年代毁灭。身披厚重的钢铁盔甲，配备长剑与坚固盾牌，擅长防御反击。各项基础属性均衡，生存能力优秀。因为长期漂泊作战，对各类危险环境都有充足经验，是踏入交界地最稳妥的出身。', 'img/knight.jpg');
INSERT INTO `class` VALUES (2, '剑士', '来自远方自由部族的漂泊战士，精通双弯刀战斗技法。依靠高速连击与灵活走位压制敌人，爆发力出众，但护甲薄弱，无法承受重型攻击。擅长连续斩击与削韧，适合依靠身法寻找敌人破绽，属于高风险高回报的战斗流派。', 'img/swordsman.jpg');
INSERT INTO `class` VALUES (3, '勇者', '蛮荒高地的部落勇士，自幼挥舞巨斧征战野兽与外族。力量属性得天独厚，可以轻松驾驭重型武器。能够打出高额冲击伤害，强行打断敌人动作。心智坚韧，但是灵巧不足，笨重的攻击方式容易被敏捷敌人周旋牵制。', 'img/hero.jpg');
INSERT INTO `class` VALUES (4, '盗贼', '在荒野与废墟求生的盗猎者，精通潜行、短弓伏击与背刺战术。感应属性突出，可以发掘隐藏道具，识破敌人弱点。不擅长正面硬抗，依靠偷袭、毒箭与道具削弱对手。擅长利用地形制造优势，在暗处猎杀目标。', 'img/bandit.jpg');
INSERT INTO `class` VALUES (5, '占星师', '雷亚卢卡利亚学院的学徒，追随观星者的道路，研习辉石魔法。智力属性极高，手持辉石长杖，依靠远程辉石法术打击敌人。可以释放辉石箭矢、魔法光束在安全距离消灭对手，但肉身孱弱，一旦被敌人近身就会陷入险境。', 'img/astrologer.jpg');
INSERT INTO `class` VALUES (6, '预言家', '被教会驱逐的祷告行者，目睹虚假神迹之后遭到流放。信仰属性出众，掌握火焰祷告，能够释放火焰攻击与增益咒术。可以依靠祷告进行远程输出与自我恢复，防具轻薄，需要依靠祷告的力量弥补肉身的不足。', 'img/prophet.jpg');
INSERT INTO `class` VALUES (7, '武士', '来自遥远东方苇地的战士，恪守武士之道。配备打刀与长弓，擅长居合斩，瞬间爆发极强。敏捷与心智属性优秀，攻防节奏均衡，远近手段兼备。居合招式出手迅猛，可以瞬间撕裂敌人防御，是上手体验流畅的出身。', 'img/samurai.jpg');
INSERT INTO `class` VALUES (8, '密使（忏悔者）', '黄金树教会的隐秘密探，负责猎杀异端。同时精通短剑剑术与祷告，战斗体系全面。既能近战杀伤敌人，也能使用恢复祷告、圣属性咒术。各项属性分配均衡，战斗手段丰富，适配多种战斗风格。', 'img/confessor.jpg');
INSERT INTO `class` VALUES (9, '囚徒', '曾经触犯卡利亚律法的魔法师，被戴上铁面具囚禁。兼具智力与敏捷，可使用辉石魔法配合刺剑近战。擅长魔法与剑术结合的混合打法，依靠刺剑快速攻击衔接法术，远近兼顾，但是生命与耐力属性偏低。', 'img/asdx.jpg');
INSERT INTO `class` VALUES (10, '一无所有者', '一无所有的褪色者，赤手空拳踏入交界地，没有任何武器与防具。全部初始属性平均，没有任何偏向。没有先天优势，却也没有限制，能够自由塑造任何战斗流派，是自由度最高的出身，适合对交界地足够熟悉的褪色者。', 'img/wretch.jpg');

-- ----------------------------
-- Table structure for demigod
-- ----------------------------
DROP TABLE IF EXISTS `demigod`;
CREATE TABLE `demigod`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `img_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of demigod
-- ----------------------------
INSERT INTO `demigod` VALUES (1, '满月女王 蕾娜菈', '卡利亚王室最后的女王，观星者文明的领袖。早年与拉达冈缔结婚约，孕育多名半神子嗣。当拉达冈抛弃她返回王城，卡利亚王朝随之崩塌。蕾娜菈陷入永恒的梦境，不断重生子女，在大书库中循环着失去挚爱的悲剧。她手中的大卢恩早已破碎，仅留存重塑生命的力量，能够改写褪色者的属性。', 'img/rennala.jpg');
INSERT INTO `demigod` VALUES (2, '亵渎君王 拉卡德', '卡利亚王室的审判官，曾执掌律法与裁决。目睹黄金律法的虚伪之后，决心走上亵渎之路。他引诱弑神大蛇吞噬自身，人与巨蛇融为一体，化作永恒渴求献祭的怪物。拉卡德不再追求艾尔登之王的宝座，而是期盼源源不断的挑战者，以鲜血喂养大蛇，反抗无上意志定下的秩序。火山官邸便是他招揽刺客、猎杀半神的据点。', 'img/rykard.jpg');
INSERT INTO `demigod` VALUES (3, '恶兆王 蒙葛特', '玛莉卡与拉达冈之子，天生背负恶兆的诅咒，生来便被嫌弃、被藏匿。破碎战争中，其余半神互相攻伐、抛弃领地，唯有蒙葛特坚守王城罗德尔。他憎恨所有觊觎艾尔登王座的叛徒与褪色者，以恶兆之力守护黄金树大门。蒙葛特拥有半神大卢恩，却从未渴望称王，他所守护的仅仅是早已残破的黄金秩序。', 'img/morgott.jpg');
INSERT INTO `demigod` VALUES (4, '鲜血君王 蒙格', '蒙葛特孪生弟弟，同样身负恶兆，被囚禁于王城地底。接触到无形母神之后，蒙格领悟鲜血的力量，建立蒙格温王朝。他掳走神人米凯拉，想要将米凯拉奉为新神，开创鲜血时代。蒙格相信鲜血即是生命，一切生灵都应当在流血之中获得新生。潜伏在地下永恒等待神的苏醒，是交界地最疯狂的半神之一。', 'img/mohg.jpg');
INSERT INTO `demigod` VALUES (5, '米凯拉', '玛莲妮亚的孪生兄长，拥有无法长大的身体，是天生的纯洁神人。米凯拉看透黄金律法的缺陷，亲手打造圣树，试图创造不受无上意志束缚的全新神国。他的力量可以抵御猩红腐败，吸引无数受黄金树抛弃的人前往圣树避难。尚未完成计划时，被鲜血君王蒙格掳至地底，躯体沉睡在鲜血圣瓶之中，圣树也随之凋零。', 'img/miquella.jpg');
INSERT INTO `demigod` VALUES (6, '初代艾尔登王 葛孚雷', '玛莉卡女王的第一任丈夫，第一位艾尔登之王，战争之王。带领战士征服交界地，奠定黄金树时代的根基。在所有敌人被屠戮殆尽之后，葛孚雷失去战意，玛莉卡剥夺他的赐福，将他贬为褪色者。千年之后赐福重归，葛孚雷再度苏醒，等待着挑战王座，夺回属于王者的荣耀。战斗时会释放野兽瑟洛修，是极具压迫感的王者BOSS。', 'img/godfrey.jpg');
INSERT INTO `demigod` VALUES (7, '拉达冈', '黄金秩序的化身，玛莉卡的另一半躯体。拉达冈即是玛莉卡，玛莉卡即是拉达冈。他先是与蕾娜菈成婚，之后返回王城与自己结合，诞下一众半神。玛莉卡击碎艾尔登法环，拉达冈则想要修复法环，二者在同一个躯体中永恒对抗。作为最终BOSS守在艾尔登王座，代表黄金律法最后的顽固意志。', 'img/radagon.jpg');

-- ----------------------------
-- Table structure for dungeon
-- ----------------------------
DROP TABLE IF EXISTS `dungeon`;
CREATE TABLE `dungeon`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `region` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `boss` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `reward` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `img_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dungeon
-- ----------------------------
INSERT INTO `dungeon` VALUES (1, '灵庙原野洞窟', '宁姆格福西部的小型洞窟，洞窟内布满毒池，是新手最早接触的地下区域。洞窟深处栖息着亚人首领，大量亚人小怪埋伏在转角偷袭。', '宁姆格福', '亚人首领', '亚人套装、石剑钥匙', 'img/cave1.jpg');
INSERT INTO `dungeon` VALUES (2, '贤者的洞窟', '位于利耶尼亚北部的隐秘洞窟，大量辉石魔法师在此长眠。洞窟有大量隐形敌人，需要依靠火把与环境光影判断敌人位置。', '利耶尼亚', '结晶人', '结晶套装、辉石大魔砾', 'img/cave2.jpg');
INSERT INTO `dungeon` VALUES (3, '盖尔坑道', '盖利德的废弃采矿坑道，猩红腐败弥漫在空气之中。坑道内有锻造石矿脉，不少褪色者冒险前来采集强化素材。', '盖利德', '熔岩土龙', '土龙鳞剑、古锻造石', 'img/cave3.jpg');
INSERT INTO `dungeon` VALUES (4, '罗德尔地下墓地', '王城地下的巨大墓地，埋葬着罗德尔无数战士。机关繁多，大量的罗德尔士兵亡灵在此徘徊，复杂的升降台容易迷失方向。', '王城罗德尔', '腐烂树灵', '树灵套装、死亡咒痕', 'img/cave4.jpg');
INSERT INTO `dungeon` VALUES (5, '巨人山顶地下墓地', '巨人废墟之下的冰冷墓穴，寒风刺骨。这里留存着巨人最后的遗骸，火焰修士看守着墓地深处的秘密。', '巨人山顶', '火焰祭司', '火焰僧侣套装、巨人祷告书', 'img/cave5.jpg');
INSERT INTO `dungeon` VALUES (6, '黑夜神域', '永恒之城的核心区域，永恒之城居民的旧址。夜晚的神域遍布仿生泪滴与银色泪滴，是菈妮支线必经之地。', '永恒之城', '仿生泪滴', '仿生泪滴骨灰、黑夜套装', 'img/cave6.jpg');

-- ----------------------------
-- Table structure for geography
-- ----------------------------
DROP TABLE IF EXISTS `geography`;
CREATE TABLE `geography`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `img_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `link` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of geography
-- ----------------------------
INSERT INTO `geography` VALUES (1, '宁姆格福', '褪色者启程的起点，广阔草原与废墟遍布。史东薇尔城盘踞着接肢葛瑞克，黄金树的荣光在此日渐衰败，四处散落战争留下的残迹。', 'img/8.jpg', 'limgrave.html');
INSERT INTO `geography` VALUES (2, '啜泣半岛', '宁姆格福南方的半岛，阴雨连绵。死亡现象肆虐，亡灵四处游荡，留存大量玛莉卡时代的古老教堂与遗迹，充满死亡与信仰的悲剧色彩。', 'img/9.jpg', 'peninsula.html');
INSERT INTO `geography` VALUES (3, '盖利德', '被猩红腐败污染的荒芜大地，玛莲妮亚与拉塔恩决战之后，腐败瘴气吞噬整片土地。红狮子城、魔法城镇瑟利亚坐落于此，遍地变异魔物。', 'img/10.jpg', 'caelid.html');
INSERT INTO `geography` VALUES (4, '亚坛高原', '黄金秩序的核心高地，依靠大升降机抵达。遍布小黄金树，土地沐浴黄金光芒，通往王城罗德尔，见证黄金王朝鼎盛的余晖。', 'img/11.jpg', 'altus.html');
INSERT INTO `geography` VALUES (5, '王城罗德尔', '艾尔登之王的都城，宏伟城墙与宫殿依山而建。黄金树矗立城市中心，内部结构错综复杂，地下暗藏恶兆的隐秘地底区域。', 'img/12.jpg', 'leyndell.html');
INSERT INTO `geography` VALUES (6, '格密尔火山', '烈焰翻滚的火山山脉，火山官邸建立于火山体内。叛王拉卡德盘踞于此，狩猎英雄，反抗黄金律法，到处是熔岩洞窟与蛇形怪物。', 'img/13.jpg', 'volcano.html');
INSERT INTO `geography` VALUES (7, '巨人山顶', '北方冰封雪原，巨人灭亡之后的冻土。火焰大锅坐落于此，是点燃火焰烧毁黄金树的关键地点，风雪严寒，索尔城屹立雪原之上。', 'img/14.jpg', 'mountaintops.html');
INSERT INTO `geography` VALUES (8, '化圣雪原', '巨人山顶深处的隐秘雪原，需要秘密符节方可进入。暴雪遮蔽视野，藏有通往米凯拉圣树与蒙格温王朝的两条重要隐秘通路。', 'img/15.jpg', 'consecrated.html');
INSERT INTO `geography` VALUES (9, '米凯拉的圣树', '米凯拉打造的理想圣土，圣洁又带着忧伤。圣树内部繁花遍地，也是玛莲妮亚长眠之地，这里寄托米凯拉创造纯净新世界的愿望。', 'img/16.jpg', 'haligtree.html');
INSERT INTO `geography` VALUES (10, '蒙格温王朝', '鲜血君王蒙格建立的地下王朝，血色沼泽遍地。蒙格掳走米凯拉，在此建立属于鲜血的新王权，到处是鲜血祝福的异化信徒。', 'img/17.jpg', 'mohgwyn.html');
INSERT INTO `geography` VALUES (11, '地下永恒之城', '被无上意志打入地底的古老文明，希芙拉河、安瑟尔河贯穿地下。诺克朗、诺克史黛拉沉睡深渊，拥有群星时代遗留的古老秘密。', 'img/18.jpg', 'nokron.html');
INSERT INTO `geography` VALUES (12, '法姆·亚兹拉', '漂浮于风暴之中的崩坏天空之城，属于古龙的时代遗迹。律法崩坏之后现世，通往艾尔登兽最终决战，留存古龙文明最后的痕迹。', 'img/19.jpg', 'farumazula.html');

-- ----------------------------
-- Table structure for home
-- ----------------------------
DROP TABLE IF EXISTS `home`;
CREATE TABLE `home`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `desc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `img_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `link` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of home
-- ----------------------------
INSERT INTO `home` VALUES (1, '接肢葛瑞克', '史东薇尔城的领主，黄金家族后裔。将无数战士肢体接在自己身上，渴求力量，是褪色者遇到的第一位半神。', 'img/1.jpg', 'ge_greek.html');
INSERT INTO `home` VALUES (2, '魔女菈妮', '月之公主，抛弃双指赐予的命运，追寻属于自己的星辰时代。群星结局的核心人物，拥有大量动人支线剧情。', 'img/5.jpg', 'ranni.html');
INSERT INTO `home` VALUES (3, '利耶尼亚湖', '魔法学院所在地，湖水辽阔，卡利亚王室与辉石魔法师在此共存。遍布辉石魔法师、水晶生物与幽灵士兵。', 'img/2.jpg', 'liyenia.html');
INSERT INTO `home` VALUES (4, '玛莲妮亚', '腐败女神，米凯拉的义姐，身中猩红腐败。手持义手刀，战力强悍，在盖利德与拉塔恩展开惨烈大战。', 'img/6.jpg', 'malenia.html');
INSERT INTO `home` VALUES (5, '拉塔恩将军', '碎星将军，掌握重力魔法。封印群星运转，猩红腐败侵蚀之后，徘徊在盖利德红土之上，疯狂杀戮。', 'img/4.jpg', 'radahn.html');
INSERT INTO `home` VALUES (6, '雷亚卢卡利亚学院', '辉石魔法的最高学府，无数魔法师在此钻研星辰与水晶的奥秘。大门被魔法封印，内部埋藏大量秘密。', 'img/3.jpg', 'academy.html');

-- ----------------------------
-- Table structure for npc
-- ----------------------------
DROP TABLE IF EXISTS `npc`;
CREATE TABLE `npc`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `npc_key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `avatar` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `init_text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `init_options` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `reply_data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `npc_key`(`npc_key` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of npc
-- ----------------------------
INSERT INTO `npc` VALUES (1, 'melina', '梅琳娜', '指头女巫', 'img/npc_melina.jpg', '你好。\n穿越雾前来的人啊。\n我的名字是梅琳娜……\n想要和你谈个条件。\n你知道指头女巫吗？\n她们是侍奉双指，帮助、引导褪色者的人……\n但现在的你，没有女巫在身边。\n我可以代替她们的职务。\n我能够将卢恩碎片，化作你的力量。\n只要你渴望得到艾尔登法环，\n这件事肯定对你有帮助。\n所以，希望你能帮忙——\n带我到黄金树的树脚。', '[{\"label\":\"我同意与你合作\",\"key\":\"agree\"},{\"label\":\"容我再考虑考虑\",\"key\":\"refuse\"}]', '{\"agree\":{\"text\":\"……这样就算谈成了。\\n想让卢恩碎片化为自己的力量时，\\n请在赐福所在处呼唤我。\\n对了，还有一件事。\\n你身上应该有一枚灵马戒指。\\n需要长距离移动时，就用那枚戒指吧。\\n那能够呼唤名为托雷特的骏马灵魂。\\n托雷特选上了你，\\n希望你好好待它。\",\"options\":[{\"label\":\"关于托雷特\",\"key\":\"torrent\"},{\"label\":\"关于赐福\",\"key\":\"grace\"},{\"label\":\"结束对话\",\"key\":\"back\"}]}, \"refuse\":{\"text\":\"……这样啊。真遗憾。\\n如果你改变主意，就到赐福处来找我吧。\\n毕竟，没有女巫引导的褪色者，\\n在交界地寸步难行。\",\"options\":[{\"label\":\"等等，我同意合作\",\"key\":\"agree\"},{\"label\":\"还是算了\",\"key\":\"back\"}]}, \"torrent\":{\"text\":\"托雷特是前任主人托付给我的灵魂骏马。\\n它只会认可真正拥有资格的褪色者。\\n你能被它选中，是你的幸运。\\n在广阔的交界地旅行，它会是你最可靠的伙伴。\",\"options\":[{\"label\":\"我知道了\",\"key\":\"back\"}]}, \"grace\":{\"text\":\"这簇小巧的金光，是黄金树的赐福。\\n据说在过去，这赐福从你们褪色者的眼眸散失，\\n而如今，又转而出现、引导你们。\\n赐福的指引——引导使命所在的光芒。\\n顺着它走，你就能一步步接近艾尔登法环。\",\"options\":[{\"label\":\"我知道了\",\"key\":\"back\"}]}, \"back\":{\"text\":\"那么，再会了。\\n当你需要我的时候，就在赐福处呼唤。\",\"options\":[{\"label\":\"重新对话\",\"key\":\"init\"}]}}\r\n');
INSERT INTO `npc` VALUES (2, 'ranni', '魔女菈妮', '月之公主', 'img/npc_ranni.jpg', '我是菈妮，魔女菈妮。\n我曾盗走命定之死,\n如今在追寻黑暗之路。\n我要颠覆这由双指与黄金树掌控的秩序，\n让交界地步入星与月的长夜。\n你，愿意入我麾下吗？\n成为我的臣子，助我完成这条道路。', '[{\"label\":\"我愿意侍奉菈妮\",\"key\":\"agree\"},{\"label\":\"恕我不能从命\",\"key\":\"refuse\"}]', '{\"agree\":{\"text\":\"很好。你真是稀奇，\\n竟会接受玩偶魔女的邀请。\\n那我们即刻动身。\\n我的部下们还在等着，\\n布莱泽、伊吉、赛尔维斯……\\n他们都会成为你的同伴。\\n记住——\\n从今往后，你就是我菈妮的臣子。\\n我们要一同走向那黑暗的星夜。\",\"options\":[{\"label\":\"布莱泽是谁？\",\"key\":\"blaidd\"},{\"label\":\"接下来要做什么？\",\"key\":\"next\"},{\"label\":\"结束对话\",\"key\":\"back\"}]}, \"refuse\":{\"text\":\"……是吗，那也无妨。\\n若你改变心意，就再到蕾娜魔法师塔来。\\n不过我得提醒你——\\n留在黄金树的道路上，\\n你最终也只会成为双指的傀儡。\",\"options\":[{\"label\":\"等等，我改变主意了\",\"key\":\"agree\"},{\"label\":\"告辞\",\"key\":\"back\"}]}, \"blaidd\":{\"text\":\"布莱泽是我的半狼部下。\\n身经百战的战士，剑术高超。\\n他会作为你的前辈，带你熟悉一切。\\n虽然外表凶悍，但其实是个值得信赖的伙伴。\",\"options\":[{\"label\":\"原来如此\",\"key\":\"back\"}]}, \"next\":{\"text\":\"首先，你要去卡利亚城寨。\\n那里有我留下的线索。\\n顺着线索，你就能逐步接近真相,\\n接近我们真正的目标。\\n去吧，褪色者。\\n我在月之终点等你。\",\"options\":[{\"label\":\"我这就出发\",\"key\":\"back\"}]}, \"back\":{\"text\":\"那么，再会了。\\n记住，月之魔女菈妮的大门,\\n永远向有资格的人敞开。\",\"options\":[{\"label\":\"重新对话\",\"key\":\"init\"}]}}\r\n');
INSERT INTO `npc` VALUES (3, 'tanith', '塔妮丝', '火山官邸之主', 'img/npc_tanith.jpg', '褪色者啊，欢迎来到火山官邸。\n我名为塔妮丝，是这座官邸的主人。\n菈雅曾提过你，\n听说你是大有可为的人才。\n那么请容我一问，再次确认你的意愿：\n你愿意加入火山官邸，与我们并肩而战吗？\n赐福的指引，指头的傲慢空话——\n那强加的一切，我们不打算遵从……\n我们要对黄金树举剑相向。', '[{\"label\":\"我愿意加入火山官邸\",\"key\":\"agree\"},{\"label\":\"恕我拒绝\",\"key\":\"refuse\"}]', '{\"agree\":{\"text\":\"谢谢你给出肯定的回复。\\n如此一来，你就是火山官邸的一员。\\n走廊的尽头有间客房供你使用，\\n请当作自己家。\\n接下来，去领取你的第一份契约吧。\\n猎杀那些受黄金树赐福的褪色者，\\n用他们的卢恩，壮大我们的力量。\\n……接下来要请你多关照了。\",\"options\":[{\"label\":\"为什么要反抗黄金树？\",\"key\":\"reason\"},{\"label\":\"我去领取契约\",\"key\":\"back\"}]}, \"refuse\":{\"text\":\"这样啊，真遗憾。\\n菈雅听到肯定会很难受，\\n虽然这也是无可奈何。\\n请离开这座官邸吧。\\n我们彼此是走在平行线上的人。\",\"options\":[{\"label\":\"等等，我愿意加入\",\"key\":\"agree\"},{\"label\":\"告辞\",\"key\":\"back\"}]}, \"reason\":{\"text\":\"因为黄金树抛弃了我们。\\n拉卡德大人曾是尊贵的司法官,\\n却看清了黄金律法的虚伪。\\n既然神不眷顾我们，\\n那我们就亲手颠覆这腐朽的秩序。\\n哪怕要背负亵渎的罪名，也在所不惜。\",\"options\":[{\"label\":\"我明白了\",\"key\":\"back\"}]}, \"back\":{\"text\":\"愿亵渎的火焰指引你。\\n火山官邸的大门，永远为叛律者敞开。\",\"options\":[{\"label\":\"重新对话\",\"key\":\"init\"}]}}\r\n');
INSERT INTO `npc` VALUES (4, 'millicent', '米莉森', '义手剑士', 'img/npc_millicent.jpg', '……你来了啊。\n谢谢你，愿意帮我这个忙。\n你也看到了，我的右臂……\n是义手。\n之前被猩红腐败侵蚀，不得不截掉。\n我想找回完整的义手零件，\n重新挥舞那把刀。\n如果你愿意帮我，我会报答你的。', '[{\"label\":\"我会帮你寻找义手零件\",\"key\":\"agree\"},{\"label\":\"这太危险了，我做不到\",\"key\":\"refuse\"}]', '{\"agree\":{\"text\":\"真的很感谢你。\\n等我找回全部零件，\\n一定能重新挥舞那把刀。\\n我听说格密尔火山附近，\\n有工匠能修复义手。\\n我们先去那里吧。\\n你放心，我不会拖后腿的。\\n我可是玛莲妮亚的忠实信徒，\\n剑术绝不会输给普通褪色者。\",\"options\":[{\"label\":\"你认识玛莲妮亚？\",\"key\":\"malenia\"},{\"label\":\"我们出发吧\",\"key\":\"back\"}]}, \"refuse\":{\"text\":\"……是吗。\\n那也没办法，这本来就是我自己的事。\\n猩红腐败的诅咒，\\n本来就该由我自己承担。\\n你走吧，不用管我了。\",\"options\":[{\"label\":\"等等，我帮你\",\"key\":\"agree\"},{\"label\":\"多保重\",\"key\":\"back\"}]}, \"malenia\":{\"text\":\"她是米凯拉的刃，\\n也是我最崇敬的人。\\n同样背负着猩红腐败的诅咒，\\n她却能站在战场的最前线。\\n我也想成为那样的人。\\n哪怕只有一点点,\\n我也想追上她的背影。\",\"options\":[{\"label\":\"你一定可以的\",\"key\":\"back\"}]}, \"back\":{\"text\":\"那么，路上小心。\\n等我们找到义手,\\n就在格密尔火山再见吧。\",\"options\":[{\"label\":\"重新对话\",\"key\":\"init\"}]}}\r\n');

-- ----------------------------
-- Table structure for player_save
-- ----------------------------
DROP TABLE IF EXISTS `player_save`;
CREATE TABLE `player_save`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `runes` int NULL DEFAULT 15000,
  `equip_state` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `player_save_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of player_save
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------

-- ----------------------------
-- Table structure for worldview
-- ----------------------------
DROP TABLE IF EXISTS `worldview`;
CREATE TABLE `worldview`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '页面HTML内容',
  `img` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图片地址',
  `imgDesc` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图片说明',
  `sort` int NULL DEFAULT 0 COMMENT '排序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of worldview
-- ----------------------------
INSERT INTO `worldview` VALUES (1, '艾尔登法环', '<p>艾尔登法环是世界法则的具象化，由无上意志赐予交界地，由玛丽卡女王保管。法环由众多大卢恩组成，维系整个世界的秩序、生死与命运。它并非静止的圣物，而是流动的、有生命的规则网络，每一枚大卢恩都对应着一条基础法则——生、死、重力、因果、轮回……它们交织成黄金律法的根基。</p><p>然而，法环并非永恒不变。玛丽卡女王打碎艾尔登法环，秩序崩裂，大卢恩四散，交界地从此进入破碎时代。碎片散落在半神手中，也散落在被遗忘的角落，等待褪色者重新聚拢。</p>', 'img/eldenring.jpg', '艾尔登法环', 1);
INSERT INTO `worldview` VALUES (2, '黄金树时代', '<p>在黄金树降临之前，交界地属于巨人、原始生命与永恒之城的时代。外神“无上意志”派遣使者，扶持玛丽卡建立黄金律法，以黄金树为中心重构了世界的信仰与轮回。</p><p>黄金律法定下铁则：死者必须回归黄金树，灵魂循环不息。死亡被封印，命定之死交由黑剑玛利格斯看守。在漫长岁月里，黄金树繁荣昌盛，半神相继诞生，王城罗德尔成为交界地的权力与信仰中心。黄金树的根须深入大地，它的光芒照耀每一个角落，带来秩序，也带来束缚。</p><h4>黄金树的恩惠与阴影</h4><p>黄金树的赐福并非平等地洒向所有生灵。那些被认定为“褪色者”的人被剥夺赐福、驱逐出境，而贵族与半神则沐浴在永恒光辉中。黄金律法所承诺的完美循环，逐渐显露出裂痕：死亡的缺失导致生者疲惫，灵魂的堆积让黄金树不堪重负。这为后来的破碎埋下了伏笔。</p>', 'img/goldentree.jpg', '黄金树', 2);
INSERT INTO `worldview` VALUES (3, '破碎战争', '<p>玛丽卡击碎艾尔登法环，法环碎裂为多个大卢恩。她的子嗣半神们各自夺取大卢恩，彼此开战，这场大战被称为破碎战争。战争蔓延至交界地每一寸土地，盖利德化为废墟，宁姆格福血流成河，王城罗德尔陷入疯狂的内耗。</p><p>战争没有胜利者。半神大多重伤、失去力量，有的陷入疯狂，有的被吞噬。交界地大地溃烂，生灵涂炭，黄金树关闭大门，拒绝接纳任何褪色者。破碎战争不仅摧毁了大地，也摧毁了黄金律法不可动摇的神话。</p><h4>大卢恩的争夺</h4><p>“接肢”葛瑞克、“满月女王”蕾娜菈、“碎星”拉塔恩、“恶兆之子”蒙葛特……每一位半神都握有法环的碎片，也都困于自身的执念。破碎战争本质上是外神代理人的战争，也是半神们无法逃脱的悲剧。</p>', NULL, NULL, 3);
INSERT INTO `worldview` VALUES (4, '褪色者', '<p>褪色者，原本是居住在交界地的人类。因为背弃黄金律法，被剥夺赐福驱逐出境，在边境之地流浪、死亡、被遗忘。当法环破碎，赐福重新召唤褪色者，使他们从长眠中醒来，回到交界地。</p><p>褪色者的目标：收集半神的大卢恩，修复艾尔登法环，成为艾尔登之王。但结局不止一种——你可以选择维持黄金律法、毁灭秩序，或是开创全新的时代。每个选择都是对世界法则的重写。</p><h4>赐福的指引</h4><p>赐福的光芒会指引褪色者前往关键地点，但赐福并非全知全能，它也会将褪色者引向危险与真相。许多褪色者在旅途中逐渐发现，无上意志的意图远非仁慈，而自己的命运也许早已被设计。</p>', NULL, NULL, 4);
INSERT INTO `worldview` VALUES (5, '外神与诸律法', '<p>无上意志只是众多外神之一。除黄金律法外，世界还存在群星律法、腐败律法、血之律法、癫火等。各个外神互相博弈，通过代理人和律法影响交界地的命运。</p><p>玛丽卡、拉达冈、各个半神，本质都是外神博弈下的棋子。没有绝对的善与恶，所有角色都在追寻自己心中的法则。黄金律法不过是诸多可能性中被强行扶植的一种，而其他外神从未放弃过干涉。</p><h4>律法的冲突</h4><p>群星律法向往自由与命运自主，腐败律法崇拜生命本质的疯狂与轮回，血之律法尊崇原始欲望与力量。这些律法彼此排斥，却又在交界地共存，导致世界始终处于信仰的撕裂中。</p>', NULL, NULL, 5);
INSERT INTO `worldview` VALUES (6, '褪色者六大结局', '<div class=\"video-box\"><video src=\"video/endings.mp4\" controls poster=\"img/endings.jpg\" style=\"width:100%;border-radius:4px;display:block;\"></video></div><div class=\"ending-grid\"><div class=\"ending-card\"><h5>1. 艾尔登之王 · 律法时代</h5><p>修复艾尔登法环，维持黄金律法。你成为新的艾尔登之王，延续玛丽卡的秩序。世界依旧受无上意志管控，黄金树的循环继续运转，交界地重回稳定，但旧有的规则不会改变。</p></div><div class=\"ending-card\"><h5>2. 艾尔登之王 · 绝望时代</h5><p>使用食粪者的忌讳卢恩修复法环。将诅咒散播到整个交界地，所有人永远活在污秽与绝望之中。这是对黄金律法最恶毒的报复，众生背负永恒的诅咒。</p></div><div class=\"ending-card\"><h5>3. 艾尔登之王 · 秩序时代</h5><p>使用金面具的完美卢恩修复法环。剔除玛丽卡的人性，让黄金律法变成纯粹、冰冷的理性法则。世界不再有情绪与偏见，一切按照法理运转，代价是抹去人的情感。</p></div><div class=\"ending-card\"><h5>4. 艾尔登之王 · 衰颓时代</h5><p>使用拉达冈的腐烂卢恩修复法环。接受黄金树本身的衰败，秩序缓慢凋零。交界地不会立刻毁灭，但黄金律法会慢慢走向终点，一切归于沉寂。</p></div><div class=\"ending-card\"><h5>5. 群星时代（菈妮结局）</h5><p>协助菈妮，舍弃艾尔登之王的王位。菈妮带走法环，将交界地归于群星。无上意志的支配就此远去，人类拥有自由，命运不再被神明预先写好，开启群星的漫长旅途。</p></div><div class=\"ending-card\"><h5>6. 潜藏者时代（癫火结局）</h5><p>点燃黄金树，烧毁旧有的秩序。摧毁艾尔登兽，交界地摆脱无上意志的控制。旧世界化为灰烬，褪色者作为潜藏者，等待新世界从灰烬中诞生。</p></div></div><p style=\"margin-top: 20px; font-style: italic; color: #b8a48a;\">每一种结局都不仅仅是“通关”，而是对交界地命运的一次终极诠释。你选择的不仅是王座，更是世界的样子。</p>', NULL, NULL, 6);
INSERT INTO `worldview` VALUES (7, '交界地秘闻', '<p>• 黄金树的根部深处，隐藏着初始黄金树的模样，以及被黄金律法掩埋的远古信仰。</p><p>• 命定之死被封印前，死亡以各种形式存在，包括“死诞者”与“死根”，它们至今仍在交界地蔓延。</p><p>• 无上意志并非唯一的幕后存在，癫火、腐败、血之律法都在等待黄金律法衰落的时机。</p><p>• 褪色者的赐福实际上是双刃剑——它带来复活，也带来被操控的命运。</p>', NULL, NULL, 7);

SET FOREIGN_KEY_CHECKS = 1;
