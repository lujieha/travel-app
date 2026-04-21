export type ShareTab = 'nearby' | 'guide' | 'mine'
export type ShareStatus = 'open' | 'full'

export interface ShareMember {
  id: number
  name: string
  avatar: string
}

export interface ShareComment {
  id: number
  name: string
  avatar: string
  content: string
  time: string
}

export interface ShareItem {
  id: number
  tab: ShareTab
  route: string
  dateRange: string
  description: string
  image: string
  price: number
  distance: string
  slotsLeft: number
  status: ShareStatus
  tags: string[]
  hostName: string
  hostAvatar: string
  detail: string
  transport: string
  lodging: string
  meetingPoint: string
  members: ShareMember[]
  comments: ShareComment[]
}

const avatar = (seed: string) => `https://i.pravatar.cc/160?u=${seed}`

export const shareItems: ShareItem[] = [
  {
    id: 1,
    tab: 'nearby',
    route: '崇左边关 2 日游',
    dateRange: '5月1日 - 5月2日',
    description: '德天瀑布加明仕田园，节奏轻松，适合第一次去崇左的周末小团。',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    price: 680,
    distance: '距我 6.8 公里',
    slotsLeft: 2,
    status: 'open',
    tags: ['德天瀑布', '明仕田园', '周末'],
    hostName: '阿泽',
    hostAvatar: avatar('host-1'),
    detail:
      '第一天从南宁集合出发，先去明仕田园骑行和竹筏拍照，下午入住边关民宿。第二天一早去德天瀑布景区，行程以轻松观景和拍照为主，适合第一次结伴出游的人。',
    transport: '南宁集合包车往返，景区内部步行加短驳接驳。',
    lodging: '崇左边关精品民宿双床房，默认两人拼住。',
    meetingPoint: '南宁会展航洋城地铁口',
    members: [
      { id: 11, name: '小雨', avatar: avatar('m-11') },
      { id: 12, name: '林森', avatar: avatar('m-12') },
      { id: 13, name: 'Nina', avatar: avatar('m-13') },
    ],
    comments: [
      { id: 101, name: '南风', avatar: avatar('c-101'), content: '路线很顺，明仕田园拍照点多吗？', time: '刚刚' },
      { id: 102, name: '阿宁', avatar: avatar('c-102'), content: '我比较关心包车时间，能准点回南宁吗？', time: '12分钟前' },
    ],
  },
  {
    id: 2,
    tab: 'nearby',
    route: '北海涠洲岛慢游 3 日',
    dateRange: '5月3日 - 5月5日',
    description: '主打日落、海鲜和环岛骑行，想找拍照搭子和吃饭搭子。',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    price: 1280,
    distance: '距我 4.5 公里',
    slotsLeft: 1,
    status: 'open',
    tags: ['涠洲岛', '海岛', '美食'],
    hostName: '小满',
    hostAvatar: avatar('host-2'),
    detail:
      '三天两晚海岛慢行程，第一天到岛后入住民宿和南湾海鲜市场，第二天环岛骑行追日落，第三天自由拍照和返程。整体节奏松弛，适合喜欢海边氛围的人。',
    transport: '北海码头乘船登岛，岛上以租电驴和步行为主。',
    lodging: '滴水丹屏附近海景民宿，含两晚住宿。',
    meetingPoint: '北海国际客运港',
    members: [
      { id: 21, name: '阿禾', avatar: avatar('m-21') },
      { id: 22, name: 'Tina', avatar: avatar('m-22') },
      { id: 23, name: '方圆', avatar: avatar('m-23') },
      { id: 24, name: 'Jun', avatar: avatar('m-24') },
    ],
    comments: [
      { id: 201, name: '海盐', avatar: avatar('c-201'), content: '住的地方离海边近吗？', time: '5分钟前' },
    ],
  },
  {
    id: 3,
    tab: 'nearby',
    route: '桂林阳朔山水 2 日游',
    dateRange: '5月10日 - 5月11日',
    description: '遇龙河骑行加西街夜逛，住宿和骑行路线已经定好。',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    price: 760,
    distance: '距我 8.2 公里',
    slotsLeft: 4,
    status: 'open',
    tags: ['阳朔', '骑行', '山水'],
    hostName: '大鹏',
    hostAvatar: avatar('host-3'),
    detail:
      '两天一晚阳朔经典行程，白天遇龙河步道和骑行，晚上西街自由活动。适合不想赶太多景点，但又想把山水和夜生活都体验一下的人。',
    transport: '南宁东站高铁往返桂林，阳朔当地拼车。',
    lodging: '阳朔县城设计感民宿，近西街。',
    meetingPoint: '南宁东站 2F 进站口',
    members: [
      { id: 31, name: '可乐', avatar: avatar('m-31') },
      { id: 32, name: '阿莹', avatar: avatar('m-32') },
    ],
    comments: [
      { id: 301, name: '圆子', avatar: avatar('c-301'), content: '骑行强度大吗？我平时运动一般。', time: '22分钟前' },
    ],
  },
  {
    id: 4,
    tab: 'nearby',
    route: '龙脊梯田摄影 2 日行',
    dateRange: '5月18日 - 5月19日',
    description: '清晨上观景台拍云雾梯田，晚上住山间民宿，行程已经满员。',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
    price: 920,
    distance: '距我 5.7 公里',
    slotsLeft: 0,
    status: 'full',
    tags: ['龙脊梯田', '摄影', '民宿'],
    hostName: 'Rex',
    hostAvatar: avatar('host-4'),
    detail:
      '以拍摄云雾和日出梯田为主，住宿在观景平台附近，清晨步行上山。适合已经有基础拍摄设备、想专注出片的人。',
    transport: '南宁包车前往龙胜，山上步行为主。',
    lodging: '龙脊山景民宿观景房。',
    meetingPoint: '南宁民族广场',
    members: [
      { id: 41, name: 'Kiki', avatar: avatar('m-41') },
      { id: 42, name: '阿牧', avatar: avatar('m-42') },
      { id: 43, name: '石头', avatar: avatar('m-43') },
      { id: 44, name: 'Ming', avatar: avatar('m-44') },
      { id: 45, name: '鹿鸣', avatar: avatar('m-45') },
    ],
    comments: [
      { id: 401, name: '阿京', avatar: avatar('c-401'), content: '满员了可惜，下次类似摄影线还会开吗？', time: '1小时前' },
    ],
  },
  {
    id: 5,
    tab: 'nearby',
    route: '黄姚古镇闲逛 2 日',
    dateRange: '5月24日 - 5月25日',
    description: '慢慢逛石板街和老宅，适合喜欢古镇和安静节奏的人。',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    price: 560,
    distance: '距我 2.4 公里',
    slotsLeft: 3,
    status: 'open',
    tags: ['黄姚古镇', '古镇', '慢游'],
    hostName: '阿梨',
    hostAvatar: avatar('host-5'),
    detail:
      '主要是周末散心路线，下午进古镇喝茶拍照，第二天早起逛老街和周边小山径。整体活动量不大，适合想放松的人。',
    transport: '南宁自驾拼车往返。',
    lodging: '黄姚古镇内客栈标准间。',
    meetingPoint: '南宁青秀万达停车场',
    members: [
      { id: 51, name: '阿菜', avatar: avatar('m-51') },
      { id: 52, name: '禾禾', avatar: avatar('m-52') },
    ],
    comments: [],
  },
  {
    id: 6,
    tab: 'nearby',
    route: '三江风雨桥夜景行',
    dateRange: '6月1日 - 6月2日',
    description: '计划看程阳八寨和风雨桥夜景，住宿和晚餐都已订好，目前已满员。',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    price: 830,
    distance: '距我 42.9 公里',
    slotsLeft: 0,
    status: 'full',
    tags: ['三江', '风雨桥', '侗寨'],
    hostName: '阿岚',
    hostAvatar: avatar('host-6'),
    detail:
      '这条线重点是侗寨夜景和当地歌舞表演，住宿安排在程阳八寨附近，晚上可以步行看桥和夜灯。',
    transport: '高铁加当地包车。',
    lodging: '侗寨风格客栈。',
    meetingPoint: '南宁东站出发层',
    members: [
      { id: 61, name: '阿星', avatar: avatar('m-61') },
      { id: 62, name: 'Mia', avatar: avatar('m-62') },
      { id: 63, name: 'Lemon', avatar: avatar('m-63') },
      { id: 64, name: '阿沐', avatar: avatar('m-64') },
    ],
    comments: [],
  },
  {
    id: 201,
    tab: 'guide',
    route: '桂林漓江精华 2 日精品团',
    dateRange: '5月6日 - 5月7日',
    description: '本地导游带队，串联象鼻山、漓江竹筏和阳朔西街，讲解更深入。',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    price: 1180,
    distance: '距我 95.1 公里',
    slotsLeft: 2,
    status: 'open',
    tags: ['导游带队', '漓江', '阳朔'],
    hostName: '导游阿诚',
    hostAvatar: avatar('host-201'),
    detail:
      '导游精品小团，第一天桂林市区和象鼻山，第二天漓江竹筏加阳朔西街。适合第一次来广西想高效看精华景点的游客。',
    transport: '南宁高铁往返桂林，桂林当地专车接送。',
    lodging: '桂林市区高评分酒店。',
    meetingPoint: '南宁东站候车大厅',
    members: [
      { id: 2011, name: '安安', avatar: avatar('m-2011') },
      { id: 2012, name: 'Yoyo', avatar: avatar('m-2012') },
      { id: 2013, name: '阿汤', avatar: avatar('m-2013') },
    ],
    comments: [
      { id: 20101, name: '落落', avatar: avatar('c-20101'), content: '这种精品团节奏会不会太赶？', time: '9分钟前' },
    ],
  },
  {
    id: 202,
    tab: 'guide',
    route: '北海银滩海味 2 日游',
    dateRange: '5月12日 - 5月13日',
    description: '含银滩日落、老街美食和赶海体验，适合想轻松看海的游客。',
    image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80',
    price: 980,
    distance: '距我 6.3 公里',
    slotsLeft: 4,
    status: 'open',
    tags: ['北海银滩', '赶海', '导览'],
    hostName: '导游小溪',
    hostAvatar: avatar('host-202'),
    detail:
      '更偏休闲的海边路线，安排银滩日落、海鲜老街和赶海体验，导游会带着控制节奏，适合家庭或情侣。',
    transport: '动车加当地接驳车。',
    lodging: '北海银滩附近酒店标准间。',
    meetingPoint: '北海站出站口',
    members: [
      { id: 2021, name: '阿禾', avatar: avatar('m-2021') },
      { id: 2022, name: 'Mo', avatar: avatar('m-2022') },
    ],
    comments: [],
  },
  {
    id: 203,
    tab: 'guide',
    route: '巴马养生秘境 3 日团',
    dateRange: '5月16日 - 5月18日',
    description: '走访百魔洞、盘阳河和长寿村，路线偏养生休闲，导游全程陪同。',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
    price: 1580,
    distance: '距我 8.6 公里',
    slotsLeft: 1,
    status: 'open',
    tags: ['巴马', '养生', '长寿村'],
    hostName: '导游晓岚',
    hostAvatar: avatar('host-203'),
    detail:
      '适合喜欢疗愈感和慢节奏的人群，会安排巴马代表性的长寿村、洞天景观和溪河体验，讲解偏文化和养生。',
    transport: '南宁集合中巴出发。',
    lodging: '巴马县城舒适型酒店两晚。',
    meetingPoint: '南宁朝阳广场',
    members: [
      { id: 2031, name: '云朵', avatar: avatar('m-2031') },
      { id: 2032, name: '阿简', avatar: avatar('m-2032') },
      { id: 2033, name: 'Nico', avatar: avatar('m-2033') },
      { id: 2034, name: '小悠', avatar: avatar('m-2034') },
    ],
    comments: [],
  },
  {
    id: 204,
    tab: 'guide',
    route: '通灵大峡谷探秘 2 日行',
    dateRange: '5月20日 - 5月21日',
    description: '靖西经典线路，含峡谷徒步与鹅泉打卡，小团带讲解，目前已满员。',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    price: 1360,
    distance: '距我 8.4 公里',
    slotsLeft: 0,
    status: 'full',
    tags: ['通灵大峡谷', '鹅泉', '精品团'],
    hostName: '导游木子',
    hostAvatar: avatar('host-204'),
    detail:
      '主打靖西精华自然景观，包含峡谷徒步、鹅泉和当地特色餐。行程节奏适中，适合第一次去靖西的人。',
    transport: '南宁包车往返。',
    lodging: '靖西精品酒店一晚。',
    meetingPoint: '南宁航洋城南门',
    members: [
      { id: 2041, name: '阿蓉', avatar: avatar('m-2041') },
      { id: 2042, name: 'Sean', avatar: avatar('m-2042') },
      { id: 2043, name: '阿洛', avatar: avatar('m-2043') },
    ],
    comments: [],
  },
]

export const getShareItemById = (id: number) => shareItems.find((item) => item.id === id)

export const nearbyShares = shareItems.filter((item) => item.tab === 'nearby')
export const guideShares = shareItems.filter((item) => item.tab === 'guide')
