(function (root, factory) {
  'use strict';
  var packs = typeof module === 'object' && module.exports ? [require('./chapters-02-05.js'), require('./chapters-06-09.js'), require('./chapters-10-12.js')] : root.EldenAdventurePacks || [];
  var illustrations = typeof module === 'object' && module.exports ? require('./illustrations.js') : root.EldenAdventureIllustrations;
  var story = factory(packs, illustrations);
  if (typeof module === 'object' && module.exports) module.exports = story;
  else root.EldenAdventureStory = story;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (packs, illustrations) {
  'use strict';

  // Original fan fiction: the dialogue below is not quoted from the game.
  var story = {
    id: 'limgrave-grace',
    title: '交界地纪行 · 从赐福到世界的答案',
    start: 'awakening',
    expectedPages: 8,
    itemLabels: {
      flask: '绯红圣杯瓶',
      rowa: '罗亚果',
      map: '林间速写',
      charm: '旅人的铜哨',
      medallion: '无名铜章'
    },
    clueLabels: {
      grace: '金色光芒指向史东薇尔',
      patrol: '大树守卫的巡行间隙',
      forest: '林间小径通往破败礼拜堂',
      bridge: '桥下仍有可通行的石阶',
      kindness: '旅人说：风暴前先找一处赐福',
      chapel: '铜章背面刻着一棵没有落叶的树'
    },
    nodes: {
      awakening: {
        title: '从雾中醒来', kicker: '序页 · 初见交界地', scene: 0,
        text: [
          '你推开石门，潮湿的晨风掠过披风。草地在脚下铺开，远处的黄金树像一束永不熄灭的光。',
          '山丘上，一名身披金甲的骑士缓缓巡行。你握紧旧剑，没有急着靠近。石路旁，一缕细小的金光正等着你。'
        ],
        dialogue: [{ speaker: '褪色者', text: '先找到方向，再决定要往哪里去。' }],
        choices: [{ id: 'seek-grace', label: '走向路旁的赐福', hint: '在陌生的土地上，先安顿片刻。', next: 'grace' }]
      },
      grace: {
        title: '火光旁的约定', kicker: '第一幕 · 赐福', scene: 1,
        text: [
          '夜色落在断墙上。你在赐福旁坐下，金色的微光向北延伸。一个披着斗篷的身影在火光边停住脚步。',
          '梅琳娜将一只圣杯瓶放到你手边。她没有替你决定前路，只提醒你留意那条穿过风暴的光。'
        ],
        dialogue: [{ speaker: '梅琳娜', text: '路途会有许多岔口。愿你在做出选择时，仍记得自己为何出发。' }],
        choices: [{ id: 'accept-guidance', label: '收好圣杯瓶，记下金光的方向', hint: '获得圣杯瓶与第一条线索。', next: 'crossroads', effects: { items: ['flask'], clues: ['grace'] } }]
      },
      crossroads: {
        title: '风中的两条路', kicker: '第二幕 · 选择路线', scene: 0,
        text: [
          '清晨，一匹长着双角的灵马从薄雾里走来。托雷特在你身边停下，轻轻打了个响鼻。',
          '北面通往城堡。左侧林地树影深密，金甲骑士的马蹄声时远时近；右侧石桥暴露在风里，一名旅人正向你招手。'
        ],
        dialogue: [{ speaker: '褪色者', text: '托雷特，今天我们从哪边走？' }],
        choices: [
          { id: 'take-forest', label: '沿林地隐蔽前行', hint: '观察巡逻，寻找林间的小路。', next: 'forest', effects: { flags: { path: 'forest' } } },
          { id: 'take-bridge', label: '骑托雷特前往石桥', hint: '穿过风雨，也许能遇见同行的人。', next: 'bridge', effects: { flags: { path: 'bridge' } } }
        ]
      },
      forest: {
        title: '金甲的影子', kicker: '林地线 · 隐入树影', scene: 2,
        text: [
          '你牵着托雷特躲进矮树后。林外的骑士提着长戟，金色马铠掠过草尖，沉重的蹄声让枝叶轻轻发颤。',
          '前面有一道倒塌的石墙。等骑士走远再越过，或趁树影遮掩直接穿行，决定权在你。'
        ],
        choices: [
          { id: 'watch-patrol', label: '耐心观察，等巡逻转向', hint: '花一点时间，记下安全通过的时机。', next: 'forestCache', effects: { clues: ['patrol'], flags: { cautious: true } } },
          { id: 'slip-through', label: '伏低身子，迅速穿过树影', hint: '赶在风势变大前离开林地。', next: 'forestCache', effects: { flags: { bold: true } } }
        ]
      },
      forestCache: {
        title: '石墙后的发现', kicker: '林地线 · 小小的补给', scene: 2,
        text: [
          '马蹄声终于消失。石墙后没有敌人，只有一丛鲜红的罗亚果，和一块刻着道路记号的旧木板。',
          '记号指向山坡上的礼拜堂。你只想做短暂停留，挑一件最有帮助的东西带走。'
        ],
        choices: [
          { id: 'gather-rowa', label: '采下罗亚果，分给托雷特', hint: '将补给收入行囊，记住礼拜堂的方向。', next: 'chapel', effects: { items: ['rowa'], clues: ['forest'], flags: { provisioned: true } } },
          { id: 'draw-map', label: '把道路记号画进手册', hint: '保留一张速写，留待风暴中辨认方向。', next: 'chapel', effects: { items: ['map'], clues: ['forest'], flags: { mapped: true } } }
        ]
      },
      bridge: {
        title: '桥上的呼救', kicker: '石桥线 · 风雨将至', scene: 3,
        text: [
          '雨丝斜斜扫过石桥。托雷特在松动的石板前放慢脚步，你看见一名旅人的包裹卡在桥边的裂缝里。',
          '旅人已经站在安全的地方，却仍不愿丢下行李。桥下有一段旧石阶，能够绕开摇晃的桥面。'
        ],
        dialogue: [{ speaker: '旅人', text: '里面是我带给山坡上朋友的物件……你愿意搭把手吗？' }],
        choices: [
          { id: 'help-traveler', label: '先帮旅人取回包裹', hint: '绕到稳固的石阶，用绳子拉回行李。', next: 'bridgeChoice', effects: { items: ['charm'], clues: ['bridge', 'kindness'], flags: { helped: true } } },
          { id: 'guide-torrent', label: '提醒旅人绕行，先安抚托雷特', hint: '避开裂缝，带灵马安全通过。', next: 'bridgeChoice', effects: { clues: ['bridge'], flags: { cautious: true } } }
        ]
      },
      bridgeChoice: {
        title: '雨停以前', kicker: '石桥线 · 继续前行', scene: 3,
        text: [
          '你们终于离开石桥。回头望去，灰色雨幕把来时的道路藏了起来。前方一间没有屋顶的礼拜堂透出微光。',
          '托雷特抖去鬃毛上的水珠。你抬头辨认山势：可以沿高处留意道路，也可以先照料同行的伙伴。'
        ],
        choices: [
          { id: 'mark-bridge', label: '记下石阶与山路的位置', hint: '制作一张简图，准备接下来的路。', next: 'chapel', effects: { items: ['map'], flags: { mapped: true } } },
          { id: 'feed-torrent', label: '采些路边的果子喂托雷特', hint: '让伙伴休息，补充一点行路的体力。', next: 'chapel', effects: { items: ['rowa'], flags: { provisioned: true } } }
        ]
      },
      chapel: {
        title: '礼拜堂里的铜章', kicker: '第三幕 · 一枚旧物', scene: 4,
        text: [
          '阳光穿过礼拜堂残破的拱窗。石台上有一枚沾着泥的铜章，旁边的刻痕早已被岁月磨平。',
          '北方的风带来城堡钟声。你可以花一点时间察看这枚旧物，也可以继续追随赐福，趁天色尚明赶到山顶。'
        ],
        dialogue: [{ speaker: '褪色者', text: '交界地的每一件旧物，似乎都在等一个愿意停下的人。' }],
        choices: [
          { id: 'inspect-medallion', label: '擦去泥土，端详铜章', hint: '收集一枚纪念物与一条新的线索。', next: 'approach', effects: { items: ['medallion'], clues: ['chapel'], flags: { curious: true } } },
          { id: 'follow-light', label: '整理行囊，继续追随金光', hint: '把目光放回前方的城堡。', next: 'approach', effects: { flags: { focused: true } } }
        ]
      },
      approach: {
        title: '风暴前的山丘', kicker: '终幕 · 你的第一段旅程', scene: 5,
        text: [
          '山道尽头，史东薇尔城矗立在风里。托雷特停在草坡上，你翻开手册，看见一路留下的记号与选择。',
          '赐福在城堡方向闪烁。另一条细窄的小径绕向断墙后的高处，那里也许藏着还没有人告诉你的故事。'
        ],
        choices: [
          { id: 'rest-at-grace', label: '循着赐福，寻找下一处落脚点', hint: '由一路的选择，写下属于你的章节结局。', ending: 'journey' },
          { id: 'seek-secrets', label: '沿侧面小径，再看一眼这片土地', hint: '带着好奇，为下一次冒险留下一个问题。', next: 'endingSeeker', effects: { flags: { explorer: true } } }
        ]
      },
      endingGuided: {
        title: '结局 · 行路有光', kicker: '第一章完成', scene: 5, ending: true,
        text: [
          '你没有急着奔向城门，而是在山道旁找到了下一处赐福。金光照亮手册上细小的记号，也照亮接下来的路。',
          '风暴尚未平息，但你已经学会观察、准备与等待。今夜可以安心休息；明日，再向史东薇尔前进。'
        ],
        dialogue: [{ speaker: '褪色者', text: '路还很长。至少这一次，我知道自己走到了哪里。' }],
        summary: '你用观察或准备，为旅程找到了稳妥的方向。'
      },
      endingFriend: {
        title: '结局 · 风中的同行者', kicker: '第一章完成', scene: 5, ending: true,
        text: [
          '山道旁，获救的旅人已经点起一盏小灯。他认出你，向赐福边挪出一个位置。你把托雷特牵进避风处，听他讲山路上的见闻。',
          '那枚铜哨在行囊里轻轻作响。交界地依旧辽阔，今夜的火光旁却多了一位愿意分享方向的人。'
        ],
        dialogue: [{ speaker: '旅人', text: '这次换我替你看着路。等风小一点，我们一起出发。' }],
        summary: '你在石桥伸出援手，收获了信任与一位同行者。'
      },
      endingBold: {
        title: '结局 · 逐风而行', kicker: '第一章完成', scene: 5, ending: true,
        text: [
          '风掀起披风，你沿着金光踏上山道。林间的马蹄声已被抛在身后，新的路标正从雾里显现。',
          '你还不知道城门后有什么，但第一步已经由自己迈出。你在手册末尾写下：下一段路，记得多留意脚边的线索。'
        ],
        dialogue: [{ speaker: '褪色者', text: '把今天记下来。明天的我，会比现在更懂得这片土地。' }],
        summary: '你选择果断前进，带着第一段旅程的经验走向风暴。'
      },
      endingSeeker: {
        title: '结局 · 未写完的地图', kicker: '第一章完成', scene: 5, ending: true,
        text: [
          '侧面的小径通向一座能够俯瞰宁姆格福的断墙。林地、石桥与礼拜堂在远处连成了一条细线，你终于看清自己走过的地方。',
          '手册还剩许多空白。你没有替那些未知的地方写上答案，只画下一个小小的问号，等下一次出发。'
        ],
        dialogue: [{ speaker: '褪色者', text: '一张地图的尽头，也可以是另一个故事的开头。' }],
        summary: '你保留了探索的好奇，让这一章以一个新的发现收尾。'
      }
    }
  };

  story.chapters = [{ id: 'ch01', number: 1, title: '赐福的指引', region: '宁姆格福', subtitle: '第一缕光', start: 'awakening', summary: '从雾中醒来，与梅琳娜约定，在林地和石桥间选择自己的第一条路。', estimatedPages: 8 }];
  story.scenes = Array.from({ length: 18 }, function (_, index) {
    return { image: index < 6 ? 'adventure/atlas.png' : index < 12 ? 'adventure/atlas-middle.png' : 'adventure/atlas-late.png', panel: index % 6 };
  });
  Object.keys(story.nodes).forEach(function (id) { story.nodes[id].chapter = 'ch01'; });
  ['endingGuided', 'endingFriend', 'endingBold', 'endingSeeker'].forEach(function (id) {
    var node = story.nodes[id];
    delete node.ending;
    node.chapterEnd = true;
    node.title = node.title.replace('结局 · ', '章末 · ');
    node.choices = [{ id: 'enter-stormveil', label: '第二章 · 走进风暴', hint: '保留此刻的物品、线索和选择，向史东薇尔城前进。', next: 'ch02_arrival' }];
  });
  // Narrative additions do not change the snapshots written by the original edition.
  var additions = {
    awakening: ['你记不起自己离开故乡多久，只记得一次漫长的放逐，以及梦里不断响起的召唤。剑鞘的缝线已经磨白，手掌却仍记得握住剑柄的姿势。远方没有迎接你的军队，只有风吹过残垣，像有人翻动一本很久无人读过的书。', '石门旁倒着一面破盾，盾上的纹章被雨水洗得难以辨认。你没有把它当作胜利者留下的路标。这里的每条道路也许都有人走过，也许也有人没能回来。黄金树照着他们，也照着刚刚醒来的你。'],
    grace: ['她自称梅琳娜，左眼紧闭，开着的那只眼睛平静地映着火光。你问她为何找上自己，她没有许诺王冠，只提起一场交换：成为旅途中的同行者，让你借助卢恩的力量成长，而你在将来带她走到黄金树脚下。', '你把湿透的手套摊在石阶上。梅琳娜的身影时而像坐在身旁，时而又像只是夜色中的回音。你还不懂赐福为何重新召回褪色者，但她认真地等你回答。于是这段关系从一句约定开始，而非一道命令。'],
    crossroads: ['托雷特的缰绳没有重量，双角却真实地抵了抵你的掌心。梅琳娜留下的灵马哨笛贴在胸口；只要轻轻吹响，这位伙伴便会从微光中归来。它也许比你更了解这里，但依然等着你迈出第一步。', '路边废弃的营火旁散着半张地图。有人用炭笔圈出史东薇尔，又在旁边画了一道很重的叉。你抬头看向北方：不论那城里藏着答案还是危险，都必须先学会在它脚下活下去。'],
    forest: ['你把披风压进膝下，避免金属扣碰到石墙。战马每绕过一棵大树，长戟的刃口便在叶隙间亮一下。那并非专门等待你的敌人，却足以让一个毫无准备的旅人倒在出发的早晨。', '托雷特没有催促。它用蹄尖轻轻拨开树根，替你留出一块不会踩响枯枝的位置。你第一次意识到，冒险的本领也包括承认此刻不能取胜，以及愿意多等几个呼吸。'],
    forestCache: ['旧木板背面有一行褪色的小字：路塌了，往山上走。写字的人没有留下名字，也无法知道将来谁会读到它。你用指尖把字槽中的青苔拂开，仿佛接受了一名陌生人隔着岁月递来的帮助。', '果实和记号都很平凡，带走它们不会让剑变得锋利，却能改变接下来的几个时辰。你将选择记在册页边缘，留下一点空白，准备日后补上这一次决定带来的结果。'],
    bridge: ['包裹被水打得发沉，绳结嵌在裂石之间。旅人的手在发抖，却还是先提醒你不要踏上桥心那块灰白的石板。雨水顺着他的袖口滴落，你看见包裹内露出一本用油布包好的旧账簿。', '你们都清楚，从这里绕行会晚一些抵达赐福。远方城堡的轮廓在雷声里一闪即逝，眼前这点具体的困难却更近：该把时间花在谁身上，又该怎样不让两个人一起陷入危险。'],
    bridgeChoice: ['石阶最后一段长满湿滑的青苔，你用剑鞘试过每一级台阶，才牵着托雷特踏上实地。雨中的轰鸣渐渐落在身后，衣物贴着皮肤，寒意这时才慢慢显出来。', '你没有把安全通过当作理所当然。在这片土地上，一张简陋地图、一把能喂饱伙伴的果子，也值得郑重地收入手册。页角被雨洇开，字迹却还清楚。'],
    chapel: ['礼拜堂里没有人回答你的脚步。墙上的褪色壁画只剩一截树枝，树下的面孔全被潮气抹去。你在石台旁蹲下，看见许多旧蜡滴，像有人曾在这里等待一个始终没有到来的黎明。', '这座小小的废墟没有改变赐福的指向，却让那道金光不再只是远处的路标。沿途生活过的人究竟在信仰什么，又失去了什么？你把问题写下，知道自己现在还给不出答案。'],
    approach: ['回望来路，黄金树的光落在同一片草地上，村庄与断墙却各自保留着阴影。你已经明白，光能告诉你往何处去，却不会替你决定途中如何对待别人。', '风从城门方向带来铁器碰撞的响声。你检查剑刃、扎紧手册，再拍拍托雷特的颈侧。到目前为止，这只是一次很短的跋涉；前面等待你的，却将是整片交界地不肯愈合的伤口。']
  };
  Object.keys(additions).forEach(function (id) { story.nodes[id].text = story.nodes[id].text.concat(additions[id]); });
  packs.forEach(function (pack) {
    story.chapters = story.chapters.concat(pack.chapters);
    [ 'nodes', 'itemLabels', 'clueLabels' ].forEach(function (key) {
      Object.keys(pack[key] || {}).forEach(function (id) {
        if (Object.prototype.hasOwnProperty.call(story[key], id) && (key === 'nodes' || story[key][id] !== pack[key][id])) throw new Error('Conflicting adventure ' + key + ': ' + id);
        story[key][id] = pack[key][id];
      });
    });
  });
  story.chapters.sort(function (a, b) { return a.number - b.number; });
  // Artwork is independent of choices and snapshots, preserving existing saves.
  if (illustrations) {
    var sceneOffset = story.scenes.length;
    story.scenes = story.scenes.concat(illustrations.scenes);
    Object.keys(illustrations.legacy || {}).forEach(function (id) {
      var index = illustrations.legacy[id];
      if (!story.nodes[id] || !Number.isInteger(index) || index < 0 || index >= sceneOffset) throw new Error('Unknown legacy illustration: ' + id);
      story.nodes[id].scene = index;
    });
    Object.keys(illustrations.nodes).forEach(function (id) {
      var index = illustrations.nodes[id];
      if (!story.nodes[id] || !illustrations.scenes[index]) throw new Error('Unknown adventure illustration: ' + id);
      story.nodes[id].scene = sceneOffset + index;
    });
    Object.keys(illustrations.variants || {}).forEach(function (id) {
      if (!story.nodes[id]) throw new Error('Unknown adventure illustration variant: ' + id);
      story.nodes[id].sceneVariants = illustrations.variants[id].map(function (entry) {
        if (!illustrations.scenes[entry.scene]) throw new Error('Unknown variant scene: ' + id);
        return { when: entry.when, scene: sceneOffset + entry.scene };
      });
    });
  }
  return story;
});
