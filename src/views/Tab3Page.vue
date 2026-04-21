<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="share-header">
          <div class="share-eyebrow">结伴分享</div>
          <h1>看看附近谁也想出发</h1>
          <p>默认展示附近旅友，也可以切到导游精品或我的分享查看不同线路。</p>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="share-content">
      <div class="page-container">
        <section class="segment-section">
          <ion-segment v-model="activeTab" scrollable>
            <ion-segment-button value="nearby">
              <ion-label>附近旅友</ion-label>
            </ion-segment-button>
            <ion-segment-button value="guide">
              <ion-label>导游精品</ion-label>
            </ion-segment-button>
            <ion-segment-button value="mine">
              <ion-label>我的分享</ion-label>
            </ion-segment-button>
          </ion-segment>
        </section>

        <section class="summary-section">
          <div class="summary-title">{{ activeMeta.title }}</div>
          <div class="summary-subtitle">{{ activeMeta.subtitle }}</div>
        </section>

        <section class="share-list">
          <ion-card
            v-for="item in currentList"
            :key="item.id"
            class="share-card"
          >
            <img :src="item.image" :alt="item.route" class="share-cover" />

            <ion-card-content>
              <div class="share-topline">
                <span class="share-date">{{ item.dateRange }}</span>
                <span
                  class="share-status"
                  :class="{ full: item.status === 'full' }"
                >
                  {{ item.status === 'full' ? '已满员' : `还差 ${item.slotsLeft} 人` }}
                </span>
              </div>

              <div class="share-route">{{ item.route }}</div>
              <p class="share-description">{{ item.description }}</p>

              <div class="share-tags">
                <span v-for="tag in item.tags" :key="tag" class="share-tag">{{ tag }}</span>
              </div>

              <div class="share-actions">
                <ion-button
                  fill="outline"
                  size="default"
                  class="action-button favorite-button"
                >
                  收藏
                </ion-button>
                <ion-button
                  size="default"
                  class="action-button join-button"
                  :disabled="item.status === 'full'"
                >
                  {{ item.status === 'full' ? '已满员' : '加入' }}
                </ion-button>
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
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardContent,
  IonButton,
} from '@ionic/vue'

type ActiveTab = 'nearby' | 'guide' | 'mine'
type ShareStatus = 'open' | 'full'

interface ShareItem {
  id: number
  route: string
  dateRange: string
  description: string
  image: string
  slotsLeft: number
  status: ShareStatus
  tags: string[]
}

const activeTab = ref<ActiveTab>('nearby')

const nearbyShares: ShareItem[] = [
  {
    id: 1,
    route: '崇左边关 2 日游',
    dateRange: '5月1日 - 5月2日',
    description: '德天瀑布加明仕田园，节奏轻松，适合第一次去崇左的周末小团。',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    slotsLeft: 2,
    status: 'open',
    tags: ['德天瀑布', '明仕田园', '周末'],
  },
  {
    id: 2,
    route: '北海涠洲岛慢游 3 日',
    dateRange: '5月3日 - 5月5日',
    description: '主打日落、海鲜和环岛骑行，想找拍照搭子和吃饭搭子。',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    slotsLeft: 1,
    status: 'open',
    tags: ['涠洲岛', '海岛', '美食'],
  },
  {
    id: 3,
    route: '桂林阳朔山水 2 日游',
    dateRange: '5月10日 - 5月11日',
    description: '遇龙河骑行加西街夜逛，住宿和骑行路线已经定好。',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    slotsLeft: 4,
    status: 'open',
    tags: ['阳朔', '骑行', '山水'],
  },
  {
    id: 4,
    route: '龙脊梯田摄影 2 日行',
    dateRange: '5月18日 - 5月19日',
    description: '清晨上观景台拍云雾梯田，晚上住山间民宿，行程已经满员。',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
    slotsLeft: 0,
    status: 'full',
    tags: ['龙脊梯田', '摄影', '民宿'],
  },
  {
    id: 5,
    route: '黄姚古镇闲逛 2 日',
    dateRange: '5月24日 - 5月25日',
    description: '慢慢逛石板街和老宅，适合喜欢古镇和安静节奏的人。',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    slotsLeft: 3,
    status: 'open',
    tags: ['黄姚古镇', '古镇', '慢游'],
  },
  {
    id: 6,
    route: '三江风雨桥夜景行',
    dateRange: '6月1日 - 6月2日',
    description: '计划看程阳八寨和风雨桥夜景，住宿和晚餐都已订好，目前已满员。',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    slotsLeft: 0,
    status: 'full',
    tags: ['三江', '风雨桥', '侗寨'],
  },
]

const guideShares: ShareItem[] = [
  {
    id: 201,
    route: '桂林漓江精华 2 日精品团',
    dateRange: '5月6日 - 5月7日',
    description: '本地导游带队，串联象鼻山、漓江竹筏和阳朔西街，讲解更深入。',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    slotsLeft: 2,
    status: 'open',
    tags: ['导游带队', '漓江', '阳朔'],
  },
  {
    id: 202,
    route: '北海银滩海味 2 日游',
    dateRange: '5月12日 - 5月13日',
    description: '含银滩日落、老街美食和赶海体验，适合想轻松看海的游客。',
    image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80',
    slotsLeft: 4,
    status: 'open',
    tags: ['北海银滩', '赶海', '导览'],
  },
  {
    id: 203,
    route: '巴马养生秘境 3 日团',
    dateRange: '5月16日 - 5月18日',
    description: '走访百魔洞、盘阳河和长寿村，路线偏养生休闲，导游全程陪同。',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&q=80',
    slotsLeft: 1,
    status: 'open',
    tags: ['巴马', '养生', '长寿村'],
  },
  {
    id: 204,
    route: '通灵大峡谷探秘 2 日行',
    dateRange: '5月20日 - 5月21日',
    description: '靖西经典线路，含峡谷徒步与鹅泉打卡，小团带讲解，目前已满员。',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    slotsLeft: 0,
    status: 'full',
    tags: ['通灵大峡谷', '鹅泉', '精品团'],
  },
]

const myShares: ShareItem[] = [
  {
    id: 101,
    route: '南宁青秀山露营夜谈',
    dateRange: '4月27日 - 4月27日',
    description: '自己发起的轻松局，已经约好露营装备和晚餐分工。',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80',
    slotsLeft: 2,
    status: 'open',
    tags: ['青秀山', '露营', '本地'],
  },
  {
    id: 102,
    route: '柳州夜景美食打卡',
    dateRange: '5月2日 - 5月3日',
    description: '主要是看江景和吃夜宵，已经有 4 人确定同行。',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    slotsLeft: 0,
    status: 'full',
    tags: ['柳州', '夜景', '美食'],
  },
  {
    id: 103,
    route: '北海侨港风情街周末游',
    dateRange: '5月16日 - 5月17日',
    description: '想再补 1 个吃海鲜和拍街景的搭子，住宿位置已经定在侨港附近。',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    slotsLeft: 1,
    status: 'open',
    tags: ['北海', '侨港', '周末'],
  },
]

const currentList = computed(() => {
  if (activeTab.value === 'nearby') {
    return nearbyShares
  }

  if (activeTab.value === 'guide') {
    return guideShares
  }

  return myShares
})

const activeMeta = computed(() => {
  if (activeTab.value === 'nearby') {
    return {
      title: '附近旅友拼团中',
      subtitle: `当前有 ${nearbyShares.length} 条结伴分享，默认按附近展示`,
    }
  }

  if (activeTab.value === 'guide') {
    return {
      title: '导游精品路线',
      subtitle: `精选 ${guideShares.length} 条广西导游带队线路，适合省心出行`,
    }
  }

  return {
    title: '我的分享',
    subtitle: `你已发起 ${myShares.length} 条分享，可查看当前组队进度`,
  }
})
</script>

<style scoped>
.share-header {
  padding: 12px 14px 16px;
  background:
    radial-gradient(circle at top right, rgba(130, 205, 255, 0.45), transparent 38%),
    linear-gradient(180deg, #eef8ff 0%, #ffffff 100%);
}

.share-eyebrow {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(34, 107, 179, 0.1);
  color: #226bb3;
  font-size: 12px;
  font-weight: 700;
}

.share-header h1 {
  margin: 12px 0 6px;
  font-size: 28px;
  line-height: 1.2;
  color: #1f2329;
}

.share-header p {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #607080;
}

.share-content {
  --background: linear-gradient(180deg, #f8fbff 0%, #f1f5fb 100%);
}

.page-container {
  padding: 14px;
}

.segment-section {
  margin-bottom: 14px;
}

.segment-section ion-segment {
  --background: #ffffff;
  border: 1px solid #e6ebf2;
  border-radius: 16px;
  padding: 6px;
}

.segment-section ion-segment-button {
  --color: #607080;
  --color-checked: #226bb3;
  --indicator-color: #e8f3ff;
  --indicator-box-shadow: none;
  min-height: 38px;
  font-weight: 700;
}

.summary-section {
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
  color: #6b7785;
}

.share-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.share-card {
  margin: 0;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid #e7edf4;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.share-cover {
  display: block;
  width: 100%;
  height: 186px;
  object-fit: cover;
}

.share-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.share-date {
  font-size: 13px;
  font-weight: 600;
  color: #607080;
}

.share-status {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: #ebfff3;
  color: #157347;
  font-size: 12px;
  font-weight: 700;
}

.share-status.full {
  background: #fff0f0;
  color: #c43d3d;
}

.share-route {
  font-size: 19px;
  line-height: 1.4;
  font-weight: 700;
  color: #1f2329;
}

.share-description {
  margin: 8px 0 12px;
  font-size: 13px;
  line-height: 1.6;
  color: #526071;
}

.share-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.share-tag {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: #f1f6fc;
  color: #4d6176;
  font-size: 12px;
  font-weight: 600;
}

.share-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.action-button {
  margin: 0;
  --border-radius: 14px;
  min-height: 42px;
  font-weight: 700;
}

.favorite-button {
  --border-color: #cfe1f6;
  --color: #226bb3;
}

.join-button {
  --background: #226bb3;
  --background-hover: #1f62a3;
  --background-activated: #1b5a97;
  --box-shadow: none;
}

.join-button[disabled] {
  opacity: 0.65;
}

@media (max-width: 420px) {
  .share-cover {
    height: 170px;
  }
}
</style>
