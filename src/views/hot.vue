<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="hot-header">
          <div class="header-copy">
            <div class="header-eyebrow">热门灵感</div>
            <h1>发现适合你的下一段旅程</h1>
            <p>支持关键词检索与分类筛选，快速找到靠谱路线。</p>
          </div>

          <ion-searchbar
            v-model="keyword"
            class="hot-search"
            placeholder="搜索目的地、玩法、关键词"
            show-clear-button="focus"
          />
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="hot-content">
      <div class="page-container">
        <section class="category-section">
          <button
            v-for="item in categories"
            :key="item.value"
            type="button"
            class="category-pill"
            :class="{ active: activeCategory === item.value }"
            @click="activeCategory = item.value"
          >
            <span class="category-name">{{ item.label }}</span>
            <span class="category-note">{{ item.note }}</span>
          </button>
        </section>

        <section class="summary-section">
          <div>
            <div class="summary-title">精选路线</div>
            <div class="summary-subtitle">共 {{ filteredTrips.length }} 条可选方案</div>
          </div>
          <div class="summary-badge">预算 ¥300 - ¥3000</div>
        </section>

        <section class="trip-list">
          <ion-card
            v-for="trip in filteredTrips"
            :key="trip.id"
            class="trip-card"
            button
          >
            <img :src="trip.image" :alt="trip.title" class="trip-cover" />

            <ion-card-content>
              <div class="trip-topline">
                <span class="trip-category">{{ trip.categoryLabel }}</span>
                <span class="trip-price">¥{{ trip.price }}/人起</span>
              </div>

              <div class="trip-title">{{ trip.title }}</div>
              <p class="trip-description">{{ trip.description }}</p>

              <div class="trip-meta">
                <div class="rating-row" :aria-label="`评分 ${trip.rating}`">
                  <ion-icon
                    v-for="star in 5"
                    :key="star"
                    :icon="starIcon(trip.rating, star)"
                    class="star-icon"
                  />
                  <span>{{ trip.rating.toFixed(1) }}</span>
                </div>
                <div class="trip-duration">{{ trip.duration }}</div>
              </div>

              <div class="trip-tags">
                <span v-for="tag in trip.tags" :key="tag" class="trip-tag">{{ tag }}</span>
              </div>
            </ion-card-content>
          </ion-card>
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
  IonIcon,
} from '@ionic/vue'
import { star, starHalf, starOutline } from 'ionicons/icons'

type Category = 'all' | 'friend' | 'custom' | 'boutique'

interface CategoryItem {
  label: string
  note: string
  value: Category
}

interface TripItem {
  id: number
  title: string
  description: string
  category: Exclude<Category, 'all'>
  categoryLabel: string
  rating: number
  price: number
  duration: string
  tags: string[]
  image: string
}

const keyword = ref('')
const activeCategory = ref<Category>('all')

const categories: CategoryItem[] = [
  { label: '全部', note: '10条灵感', value: 'all' },
  { label: '旅友推荐', note: '高口碑', value: 'friend' },
  { label: '私人定制', note: '灵活安排', value: 'custom' },
  { label: '精品小众', note: '避开人潮', value: 'boutique' },
]

const trips: TripItem[] = [
  {
    id: 1,
    title: '涠洲岛慢节奏海岛两日',
    description: '适合第一次上岛的轻松路线，打卡石螺口日落、南湾夜市和环岛骑行。',
    category: 'friend',
    categoryLabel: '旅友推荐',
    rating: 4.9,
    price: 899,
    duration: '2天1晚',
    tags: ['海岛', '日落', '轻旅行'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: '阳朔遇龙河骑行写意线',
    description: '从田园栈道到竹筏码头，行程松弛，适合情侣和朋友结伴短住。',
    category: 'friend',
    categoryLabel: '旅友推荐',
    rating: 4.8,
    price: 680,
    duration: '2天1晚',
    tags: ['骑行', '山水', '周末游'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: '厦门城市漫游美食局',
    description: '一半是鼓浪屿与海边散步，一半是沙茶面、海鲜排档和咖啡馆巡礼。',
    category: 'friend',
    categoryLabel: '旅友推荐',
    rating: 4.7,
    price: 1280,
    duration: '3天2晚',
    tags: ['美食', '海滨', '拍照出片'],
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    title: '大理洱海私享环线',
    description: '可按起床时间和拍摄偏好调整出发节奏，包含海西骑行和双廊观景位。',
    category: 'custom',
    categoryLabel: '私人定制',
    rating: 5.0,
    price: 2399,
    duration: '3天2晚',
    tags: ['定制包车', '洱海', '深度体验'],
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    title: '丽江雪山旅拍定制行',
    description: '结合轻徒步与旅拍需求，按天气窗口动态调整蓝月谷和玉龙雪山时段。',
    category: 'custom',
    categoryLabel: '私人定制',
    rating: 4.9,
    price: 2880,
    duration: '3天2晚',
    tags: ['旅拍', '雪山', '一对一'],
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    title: '敦煌亲子文化定制线',
    description: '加入莫高窟讲解、鸣沙山体验和沙漠星空营地，节奏更适合家庭出行。',
    category: 'custom',
    categoryLabel: '私人定制',
    rating: 4.8,
    price: 3000,
    duration: '4天3晚',
    tags: ['亲子', '文化体验', '沙漠星空'],
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 7,
    title: '霞浦滩涂日出摄影小团',
    description: '凌晨出发抢机位，兼顾渔排、海上晨雾和当地海鲜，适合摄影爱好者。',
    category: 'boutique',
    categoryLabel: '精品小众',
    rating: 4.8,
    price: 1560,
    duration: '2天1晚',
    tags: ['摄影', '日出', '小团'],
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 8,
    title: '阿那亚海边艺术周末',
    description: '住进设计感民宿，串联海边图书馆、艺术展和夜间酒吧，适合放空。',
    category: 'boutique',
    categoryLabel: '精品小众',
    rating: 4.6,
    price: 1980,
    duration: '2天1晚',
    tags: ['艺术感', '海边', '设计酒店'],
    image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 9,
    title: '婺源古村花事寻踪',
    description: '走进白墙黛瓦与山谷花田，路线偏安静，适合想避开热门城市的人群。',
    category: 'boutique',
    categoryLabel: '精品小众',
    rating: 4.7,
    price: 1180,
    duration: '2天1晚',
    tags: ['古村', '赏花', '慢游'],
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 10,
    title: '武夷山茶宿避世三日',
    description: '主打岩茶品鉴、溪谷徒步和山间茶宿，适合想找安静度假感的人。',
    category: 'boutique',
    categoryLabel: '精品小众',
    rating: 4.9,
    price: 1680,
    duration: '3天2晚',
    tags: ['茶文化', '山居', '疗愈感'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  },
]

const filteredTrips = computed(() => {
  const text = keyword.value.trim().toLowerCase()

  return trips.filter((trip) => {
    const matchesCategory =
      activeCategory.value === 'all' || trip.category === activeCategory.value

    const matchesKeyword =
      !text ||
      trip.title.toLowerCase().includes(text) ||
      trip.description.toLowerCase().includes(text) ||
      trip.tags.some((tag) => tag.toLowerCase().includes(text))

    return matchesCategory && matchesKeyword
  })
})

const starIcon = (rating: number, index: number) => {
  if (rating >= index) {
    return star
  }

  if (rating >= index - 0.5) {
    return starHalf
  }

  return starOutline
}
</script>

<style scoped>
.hot-header {
  padding: 12px 14px 16px;
  background:
    radial-gradient(circle at top right, rgba(255, 196, 116, 0.45), transparent 36%),
    linear-gradient(180deg, #fff8ee 0%, #ffffff 100%);
}

.header-copy {
  margin-bottom: 10px;
}

.header-eyebrow {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(196, 106, 18, 0.1);
  color: #aa5f12;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.header-copy h1 {
  margin: 12px 0 6px;
  font-size: 28px;
  line-height: 1.2;
  color: #1f2329;
}

.header-copy p {
  margin: 0;
  color: #5f6b7a;
  font-size: 13px;
  line-height: 1.5;
}

.hot-search {
  --background: #ffffff;
  --border-radius: 18px;
  --box-shadow: 0 8px 22px rgba(15, 23, 42, 0.08);
  --placeholder-color: #7b8794;
  --icon-color: #7b8794;
  --clear-button-color: #7b8794;
  padding-inline: 0;
}

.hot-content {
  --background: linear-gradient(180deg, #fffdf9 0%, #f4f7fb 42%, #eef3f9 100%);
}

.page-container {
  padding: 14px;
}

.category-section {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}

.category-pill {
  border: 0;
  border-radius: 20px;
  padding: 14px;
  text-align: left;
  background: #ffffff;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
  border: 1px solid #ebeff5;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.category-pill.active {
  border-color: #f0bf83;
  background: linear-gradient(180deg, #fff7eb 0%, #ffffff 100%);
  box-shadow: 0 10px 24px rgba(196, 106, 18, 0.12);
}

.category-pill:active {
  transform: scale(0.98);
}

.category-name {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #1f2329;
}

.category-note {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #697586;
}

.summary-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.summary-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2329;
}

.summary-subtitle {
  margin-top: 4px;
  font-size: 12px;
  color: #697586;
}

.summary-badge {
  flex-shrink: 0;
  height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  background: #1f2329;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}

.trip-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.trip-card {
  margin: 0;
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid #e9edf3;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.08);
}

.trip-cover {
  width: 100%;
  height: 190px;
  object-fit: cover;
  display: block;
}

.trip-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.trip-category {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: #fff2e3;
  color: #b56414;
  font-size: 12px;
  font-weight: 700;
}

.trip-price {
  color: #e05519;
  font-size: 16px;
  font-weight: 800;
}

.trip-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2329;
  line-height: 1.4;
}

.trip-description {
  margin: 8px 0 12px;
  font-size: 13px;
  line-height: 1.6;
  color: #526071;
}

.trip-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #7a4a0a;
  font-size: 13px;
  font-weight: 700;
}

.star-icon {
  color: #f2a93b;
  font-size: 15px;
}

.trip-duration {
  font-size: 12px;
  color: #697586;
  font-weight: 600;
}

.trip-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.trip-tag {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: #f4f7fb;
  color: #4f5f72;
  font-size: 12px;
  font-weight: 600;
}

@media (max-width: 420px) {
  .category-section {
    grid-template-columns: 1fr;
  }

  .summary-section {
    align-items: flex-start;
    flex-direction: column;
  }

  .trip-cover {
    height: 172px;
  }
}
</style>
