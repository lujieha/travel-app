<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="home-header">
          <div class="location-row">
            <div class="city">南宁</div>
            <div class="weather">周末晴好天气，适合出游</div>
          </div>

          <ion-searchbar
            v-model="keyword"
            class="home-search"
            placeholder="搜索活动、地点、攻略"
            show-clear-button="focus"
          />
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="home-content">
      <div class="page-container">
        <section class="hero-banner">
          <img
            src="https://images.pexels.com/photos/36304651/pexels-photo-36304651.jpeg"
            alt="南宁活动推荐"
          />
          <div class="hero-mask">
            <div class="hero-title">探索我的南宁</div>
            <div class="hero-subtitle">民俗节庆 / 音乐演出 / 私人定制，一站发现</div>
          </div>
        </section>

        <section class="quick-entry-section">
          <div class="section-title">发现活动</div>
          <div class="quick-grid">
            <button
              v-for="item in quickEntries"
              :key="item.key"
              type="button"
              class="quick-item"
              @click="handleQuickEntry(item.key)"
            >
              <div class="quick-icon" :class="item.colorClass">
                <ion-icon :icon="item.icon" />
              </div>
              <div class="quick-name">{{ item.name }}</div>
              <div class="quick-desc">{{ item.desc }}</div>
            </button>
          </div>
        </section>

        <section class="travel-calendar-section">
          <div class="section-header">
            <div>
              <div class="section-title">出行日期</div>
              <div class="section-subtitle">左右滑动选择未来可出行的组团、民俗、音乐会等活动</div>
            </div>
          </div>

          <div class="travel-calendar-scroll">
            <button
              v-for="date in travelDates"
              :key="date.key"
              type="button"
              class="travel-date-chip"
              :class="{ active: selectedDateKey === date.key }"
              @click="toggleDateFilter(date.key)"
            >
              <span class="travel-date-week">{{ date.weekday }}</span>
              <span class="travel-date-day">{{ date.day }}</span>
              <span class="travel-date-month">{{ date.label }}</span>
              <span class="travel-date-count">{{ date.count }} 个活动</span>
            </button>
          </div>
        </section>

        <section class="segment-section">
          <ion-segment v-model="activeCategory" scrollable>
            <ion-segment-button value="all">
              <ion-label>推荐</ion-label>
            </ion-segment-button>
            <ion-segment-button value="weekend">
              <ion-label>周边一日</ion-label>
            </ion-segment-button>
            <ion-segment-button value="festival">
              <ion-label>民俗节庆</ion-label>
            </ion-segment-button>
            <ion-segment-button value="music">
              <ion-label>音乐演出</ion-label>
            </ion-segment-button>
            <ion-segment-button value="family">
              <ion-label>私人定制</ion-label>
            </ion-segment-button>
          </ion-segment>
        </section>

        <section v-if="showGuideList" class="guide-section">
          <div class="section-header">
            <div>
              <div class="section-title">导游列表</div>
              <div class="section-subtitle">点击下拉可查看完整简介与操作入口</div>
            </div>
          </div>

          <div class="guide-list">
            <div v-for="guide in guides" :key="guide.id" class="guide-card">
              <div class="guide-top">
                <img :src="guide.avatar" :alt="guide.name" class="guide-avatar" />

                <div class="guide-main">
                  <div class="guide-name-row">
                    <div class="guide-name">{{ guide.name }}</div>
                    <button
                      type="button"
                      class="expand-button"
                      @click="toggleGuide(guide.id)"
                    >
                      <ion-icon
                        :icon="expandedGuideId === guide.id ? chevronUpOutline : chevronDownOutline"
                      />
                    </button>
                  </div>

                  <div class="guide-meta">
                    <span>{{ guide.age }}岁</span>
                    <span>{{ guide.gender }}</span>
                  </div>
                  <div class="guide-skill">技能：{{ guide.skills }}</div>
                  <div class="guide-route">擅长路线：{{ guide.routes }}</div>
                  <div class="guide-brief">{{ guide.brief }}</div>
                </div>
              </div>

              <div v-if="expandedGuideId === guide.id" class="guide-expand">
                <div class="guide-full">{{ guide.fullIntro }}</div>

                <div class="guide-actions">
                  <button type="button" class="guide-action">
                    <ion-icon :icon="chatbubbleEllipsesOutline" />
                    <span>对话</span>
                  </button>
                  <button type="button" class="guide-action">
                    <ion-icon :icon="callOutline" />
                    <span>电话</span>
                  </button>
                  <button type="button" class="guide-action route-action">
                    <ion-icon :icon="mapOutline" />
                    <span>推荐路线</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="feed-section">
          <div class="section-header">
            <div>
              <div class="section-title">活动推荐</div>
              <div class="section-subtitle">已按所选日期展示可出行项目</div>
            </div>
            <div class="section-more">查看全部</div>
          </div>

          <div v-if="filteredActivities.length" class="activity-list">
            <ion-card
              v-for="item in filteredActivities"
              :key="item.id"
              class="activity-card"
              button
              @click="goDetail(item.id)"
            >
              <img :src="item.cover" :alt="item.title" class="activity-cover" />

              <ion-card-content>
                <div class="activity-title">{{ item.title }}</div>

                <div class="activity-meta-row">
                  <ion-icon :icon="calendarOutline" />
                  <span>{{ item.time }}</span>
                </div>

                <div class="activity-meta-row">
                  <ion-icon :icon="locationOutline" />
                  <span>{{ item.location }}</span>
                </div>

                <div class="activity-bottom">
                  <div class="distance">{{ item.distance }}</div>
                  <div class="participants">{{ item.participants }} 人参与</div>
                </div>

                <div class="activity-tags">
                  <span v-for="tag in item.tags" :key="tag" class="tag">
                    {{ tag }}
                  </span>
                </div>
              </ion-card-content>
            </ion-card>
          </div>

          <div v-else class="empty-activities">
            <div class="empty-activities-title">当前日期暂无匹配活动</div>
            <div class="empty-activities-desc">试试左右滑动切换日期，或切换上方活动分类</div>
          </div>
        </section>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSearchbar,
  IonCard,
  IonCardContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
} from '@ionic/vue'
import {
  calendarOutline,
  callOutline,
  chatbubbleEllipsesOutline,
  chevronDownOutline,
  chevronUpOutline,
  extensionPuzzleOutline,
  flowerOutline,
  locationOutline,
  mapOutline,
  personAddOutline,
  carSportOutline,
} from 'ionicons/icons'

type Category = 'all' | 'weekend' | 'festival' | 'music' | 'family'

interface QuickEntry {
  key: Exclude<Category, 'all'>
  name: string
  desc: string
  icon: string
  colorClass: string
}

interface ActivityItem {
  id: number
  title: string
  time: string
  dateKey: string
  location: string
  distance: string
  participants: number
  category: Exclude<Category, 'all'>
  tags: string[]
  cover: string
}

interface GuideItem {
  id: number
  name: string
  age: number
  gender: string
  skills: string
  routes: string
  brief: string
  fullIntro: string
  avatar: string
}

interface TravelDateItem {
  key: string
  weekday: string
  day: string
  label: string
  count: number
}

const keyword = ref('')
const activeCategory = ref<Category>('all')
const expandedGuideId = ref<number | null>(null)
const selectedDateKey = ref<string | null>(formatDateKey(new Date()))

const quickEntries: QuickEntry[] = [
  {
    key: 'weekend',
    name: '找同伴',
    desc: '周边拼玩更轻松',
    icon: personAddOutline,
    colorClass: 'orange',
  },
  {
    key: 'festival',
    name: '找民俗',
    desc: '本地体验更深入',
    icon: flowerOutline,
    colorClass: 'red',
  },
  {
    key: 'music',
    name: '找演出',
    desc: '音乐现场更热闹',
    icon: carSportOutline,
    colorClass: 'purple',
  },
  {
    key: 'family',
    name: '私人定制',
    desc: '一对一出游方案',
    icon: extensionPuzzleOutline,
    colorClass: 'green',
  },
]

const guides: GuideItem[] = [
  {
    id: 1,
    name: '周岚',
    age: 32,
    gender: '女',
    skills: '行程定制、亲子陪玩、摄影点位规划',
    routes: '桂林阳朔、龙脊梯田、黄姚古镇',
    brief: '擅长做轻松不赶路的山水和古镇慢游路线。',
    fullIntro:
      '7 年广西地接经验，熟悉亲子家庭和女生结伴游的节奏安排，能根据天气和出片需求灵活调整行程，也可协助安排住宿、包车和用餐。',
    avatar: 'https://i.pravatar.cc/160?u=guide-1',
  },
  {
    id: 2,
    name: '梁川',
    age: 35,
    gender: '男',
    skills: '自驾领航、徒步带队、边关路线设计',
    routes: '崇左德天瀑布、明仕田园、通灵大峡谷',
    brief: '偏自然风景和边关路线，适合周末 2-3 天深度游。',
    fullIntro:
      '长期带自驾和小团出行，对崇左、靖西一带路况和景区节奏熟悉，适合想做瀑布、峡谷、边关公路摄影路线的用户，也支持小团队定制包车方案。',
    avatar: 'https://i.pravatar.cc/160?u=guide-2',
  },
  {
    id: 3,
    name: '苏禾',
    age: 29,
    gender: '女',
    skills: '海岛玩法规划、美食打卡、民宿筛选',
    routes: '北海银滩、涠洲岛、侨港风情街',
    brief: '擅长海边放松路线和情侣、闺蜜出游定制。',
    fullIntro:
      '主打轻松海边度假和美食路线，可根据预算安排海景民宿、海岛船票、赶海体验和拍照点位，适合不想自己做攻略的人群。',
    avatar: 'https://i.pravatar.cc/160?u=guide-3',
  },
]

const activities = ref<ActivityItem[]>([
  {
    id: 1,
    title: '南宁龙门水都泼水节',
    time: '4月22日 10:00 - 18:00',
    dateKey: '2026-04-22',
    location: '南宁市西乡塘区龙门水都景区',
    distance: '距你 12.6km',
    participants: 1268,
    category: 'festival',
    tags: ['泼水节', '民俗体验', '适合拍照'],
    cover:
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: '三江侗寨大歌夜场',
    time: '4月24日 19:30 - 21:30',
    dateKey: '2026-04-24',
    location: '柳州市三江侗族自治县',
    distance: '距你 186km',
    participants: 892,
    category: 'festival',
    tags: ['侗族大歌', '夜游', '文化体验'],
    cover:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: '青秀山亲子自然营',
    time: '4月25日 09:00 - 16:00',
    dateKey: '2026-04-25',
    location: '南宁青秀山北门营地',
    distance: '距你 8.4km',
    participants: 356,
    category: 'family',
    tags: ['亲子', '露营', '自然教育'],
    cover:
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    title: '邕江落日民谣夜',
    time: '4月26日 20:00 - 22:00',
    dateKey: '2026-04-26',
    location: '邕江河畔音乐草坪',
    distance: '距你 6.2km',
    participants: 520,
    category: 'music',
    tags: ['Live', '民谣', '约会氛围'],
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    title: '德天瀑布徒步一日线',
    time: '4月27日 07:30 出发',
    dateKey: '2026-04-27',
    location: '崇左大新县德天跨国瀑布景区',
    distance: '距你 210km',
    participants: 143,
    category: 'weekend',
    tags: ['徒步', '自然风光', '周边游'],
    cover:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    title: '青秀山草坪音乐会',
    time: '4月28日 19:00 - 21:00',
    dateKey: '2026-04-28',
    location: '青秀山东盟友谊园',
    distance: '距你 9.2km',
    participants: 407,
    category: 'music',
    tags: ['音乐会', '草坪', '夜场'],
    cover:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 7,
    title: '壮乡风情民俗组团',
    time: '4月29日 08:30 - 17:30',
    dateKey: '2026-04-29',
    location: '武鸣伊岭岩文化区',
    distance: '距你 41km',
    participants: 268,
    category: 'festival',
    tags: ['组团', '壮乡', '民俗体验'],
    cover:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
  },
])

const travelDates = computed<TravelDateItem[]>(() => {
  const formatter = new Intl.DateTimeFormat('zh-CN', { weekday: 'short' })

  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() + index)

    const key = formatDateKey(date)

    return {
      key,
      weekday: index === 0 ? '今天' : formatter.format(date),
      day: String(date.getDate()).padStart(2, '0'),
      label: `${date.getMonth() + 1}月`,
      count: activities.value.filter((item) => item.dateKey === key).length,
    }
  })
})

const filteredActivities = computed(() => {
  const text = keyword.value.trim().toLowerCase()

  return activities.value.filter((item) => {
    const matchCategory =
      activeCategory.value === 'all' || item.category === activeCategory.value

    const matchDate = !selectedDateKey.value || item.dateKey === selectedDateKey.value

    const matchKeyword =
      !text ||
      item.title.toLowerCase().includes(text) ||
      item.location.toLowerCase().includes(text) ||
      item.tags.some((tag) => tag.toLowerCase().includes(text))

    return matchCategory && matchDate && matchKeyword
  })
})

const showGuideList = computed(() => activeCategory.value === 'family')

const handleQuickEntry = (key: Exclude<Category, 'all'>) => {
  activeCategory.value = key
  if (key === 'family' && expandedGuideId.value === null) {
    expandedGuideId.value = guides[0]?.id ?? null
  }
}

const toggleGuide = (id: number) => {
  expandedGuideId.value = expandedGuideId.value === id ? null : id
}

const goDetail = (id: number) => {
  console.log('进入活动详情页，活动 ID:', id)
}

const toggleDateFilter = (dateKey: string) => {
  selectedDateKey.value = selectedDateKey.value === dateKey ? null : dateKey
}

function formatDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
</script>

<style scoped>
.home-header {
  padding: 8px 12px 12px;
  background: linear-gradient(180deg, #fff4df 0%, #ffffff 100%);
}

.location-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.city {
  font-size: 22px;
  font-weight: 700;
  color: #1f2329;
}

.weather {
  font-size: 12px;
  color: #b25b00;
  font-weight: 500;
}

.home-search {
  --background: #ffffff;
  --color: #1f2329;
  --placeholder-color: #667085;
  --icon-color: #667085;
  --clear-button-color: #667085;
  --border-radius: 16px;
  --box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
  border: 1px solid #e8e8e8;
  padding-inline-start: 0;
  padding-inline-end: 0;
}

.home-content {
  --background: #f5f7fb;
}

.page-container {
  padding: 12px;
}

.hero-banner {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  height: 180px;
  margin-bottom: 16px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.hero-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.56) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
}

.hero-title {
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
}

.hero-subtitle {
  margin-top: 6px;
  color: rgba(255, 255, 255, 0.95);
  font-size: 13px;
}

.quick-entry-section,
.travel-calendar-section,
.segment-section,
.guide-section,
.feed-section {
  margin-bottom: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2329;
  margin-bottom: 12px;
}

.section-subtitle {
  margin-top: -6px;
  font-size: 12px;
  color: #6b7785;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.section-more {
  font-size: 13px;
  color: #475467;
  font-weight: 500;
  flex-shrink: 0;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.quick-item {
  position: relative;
  background: linear-gradient(180deg, #ffffff 0%, #fff7ed 100%);
  border-radius: 18px;
  padding: 14px 8px 12px;
  border: 1px solid #f3dcc2;
  box-shadow: 0 2px 0 #f2d3ad, 0 8px 18px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.quick-item::before {
  content: '';
  position: absolute;
  left: 10px;
  right: 10px;
  top: 8px;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  filter: blur(2px);
  pointer-events: none;
}

.quick-item:active {
  transform: translateY(1px);
  box-shadow: 0 1px 0 #f2d3ad, 0 4px 10px rgba(15, 23, 42, 0.05);
}

.quick-icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 8px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7), 0 4px 10px rgba(15, 23, 42, 0.08);
}

.quick-icon.orange {
  background: linear-gradient(180deg, #fff2e2 0%, #ffe4c2 100%);
  color: #c96a10;
}

.quick-icon.red {
  background: linear-gradient(180deg, #ffe8e8 0%, #ffd2d2 100%);
  color: #cf2f25;
}

.quick-icon.purple {
  background: linear-gradient(180deg, #f2ecff 0%, #e2d6ff 100%);
  color: #6d4ad3;
}

.quick-icon.green {
  background: linear-gradient(180deg, #e8fff1 0%, #cbf5db 100%);
  color: #0d7a4c;
}

.quick-name {
  font-size: 12px;
  font-weight: 700;
  color: #1f2329;
  line-height: 1.35;
  position: relative;
  z-index: 1;
}

.quick-desc {
  margin-top: 3px;
  font-size: 10px;
  color: #475467;
  line-height: 1.3;
  position: relative;
  z-index: 1;
}

.travel-calendar-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
  margin: 0 -2px;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
}

.travel-calendar-scroll::-webkit-scrollbar {
  display: none;
}

.travel-date-chip {
  border: 1px solid #e8edf4;
  background: linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%);
  border-radius: 20px;
  min-width: 88px;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);
  scroll-snap-align: start;
  flex-shrink: 0;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.travel-date-chip.active {
  border-color: #f2b46d;
  background: linear-gradient(180deg, #fff7ea 0%, #ffedd8 100%);
  box-shadow: 0 10px 24px rgba(214, 125, 28, 0.16);
  transform: translateY(-1px);
}

.travel-date-week {
  font-size: 12px;
  font-weight: 700;
  color: #8a5a17;
}

.travel-date-day {
  font-size: 24px;
  line-height: 1;
  font-weight: 800;
  color: #1f2329;
}

.travel-date-month {
  font-size: 12px;
  color: #475467;
  font-weight: 600;
}

.travel-date-count {
  margin-top: 2px;
  font-size: 11px;
  color: #b25b00;
  font-weight: 700;
}

.segment-section ion-segment {
  --background: #ffffff;
  border: 1px solid #eceef2;
  padding: 6px;
  border-radius: 14px;
}

.segment-section ion-segment-button {
  --color: #475467;
  --color-checked: #b25b00;
  --indicator-color: #fff1e6;
  --indicator-box-shadow: none;
  min-height: 36px;
  font-weight: 600;
}

.guide-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.guide-card {
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #e6edf5;
  padding: 14px;
  box-shadow: 0 10px 22px rgba(15, 23, 42, 0.06);
}

.guide-top {
  display: flex;
  gap: 12px;
}

.guide-avatar {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.guide-main {
  flex: 1;
  min-width: 0;
}

.guide-name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.guide-name {
  font-size: 18px;
  font-weight: 700;
  color: #1f2329;
}

.expand-button {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 0;
  background: #f2f6fb;
  color: #226bb3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.expand-button ion-icon {
  font-size: 18px;
}

.guide-meta,
.guide-skill,
.guide-route,
.guide-brief,
.guide-full {
  font-size: 13px;
  line-height: 1.6;
  color: #556575;
}

.guide-meta {
  display: flex;
  gap: 10px;
  margin-top: 4px;
  font-weight: 600;
}

.guide-skill,
.guide-route,
.guide-brief {
  margin-top: 4px;
}

.guide-expand {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid #edf1f6;
}

.guide-actions {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 12px;
}

.guide-action {
  border: 0;
  min-height: 42px;
  border-radius: 14px;
  background: #f4f8fc;
  color: #226bb3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
}

.guide-action ion-icon {
  font-size: 18px;
}

.route-action {
  background: #eaf4ff;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.activity-card {
  margin: 0;
  border-radius: 18px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #eceef2;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.06);
}

.activity-cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.activity-title {
  font-size: 17px;
  font-weight: 700;
  color: #1f2329;
  line-height: 1.45;
  margin-bottom: 12px;
}

.activity-meta-row {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #344054;
  font-size: 13px;
  margin-bottom: 8px;
  line-height: 1.5;
}

.activity-meta-row ion-icon {
  font-size: 15px;
  color: #c56a12;
  flex-shrink: 0;
}

.activity-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 12px;
  font-size: 13px;
}

.distance {
  color: #b25b00;
  font-weight: 700;
}

.participants {
  color: #475467;
}

.activity-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: #fff4e8;
  color: #b25b00;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #ffe2c2;
}

.empty-activities {
  padding: 28px 18px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid #eceef2;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.04);
  text-align: center;
}

.empty-activities-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2329;
}

.empty-activities-desc {
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.6;
  color: #6b7785;
}

@media (max-width: 420px) {
  .quick-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .guide-actions {
    grid-template-columns: 1fr;
  }
}
</style>
