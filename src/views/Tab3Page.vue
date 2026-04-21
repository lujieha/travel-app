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
          <button
            v-if="activeTab === 'mine'"
            type="button"
            class="create-share-button"
            aria-label="发起分享"
          >
            <ion-icon :icon="addOutline" />
          </button>
        </section>

        <section v-if="currentList.length" class="share-list">
          <ion-card
            v-for="item in currentList"
            :key="item.id"
            class="share-card"
            button
            @click="openDetail(item.id)"
          >
            <img :src="item.image" :alt="item.route" class="share-cover" />

            <ion-card-content>
              <div class="share-topline">
                <span class="share-date">{{ item.dateRange }}</span>
                <span class="share-status" :class="{ full: item.status === 'full' }">
                  {{ item.status === 'full' ? '已满员' : `还差 ${item.slotsLeft} 人` }}
                </span>
              </div>

              <div class="share-route">{{ item.route }}</div>
              <p class="share-description">{{ item.description }}</p>

              <div class="share-meta-row">
                <div class="share-price">约 {{ item.price }} 元</div>
                <div class="share-distance">{{ item.distance }}</div>
              </div>

              <div class="share-tags">
                <span v-for="tag in item.tags" :key="tag" class="share-tag">{{ tag }}</span>
              </div>

              <div class="share-actions">
                <button type="button" class="icon-action" @click.stop>
                  <ion-icon :icon="heartOutline" />
                  <span>收藏</span>
                </button>
                <button
                  type="button"
                  class="icon-action join-action"
                  :disabled="item.status === 'full'"
                  @click.stop
                >
                  <ion-icon :icon="item.status === 'full' ? checkmarkCircle : addCircleOutline" />
                  <span>{{ item.status === 'full' ? '已满员' : '加入' }}</span>
                </button>
              </div>
            </ion-card-content>
          </ion-card>
        </section>

        <section v-else class="empty-state">
          <div class="empty-icon">
            <ion-icon :icon="addOutline" />
          </div>
          <div class="empty-title">还没有分享内容</div>
          <div class="empty-description">点击右上角的 +，发起你的第一条广西出游分享。</div>
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
  IonIcon,
} from '@ionic/vue'
import { useRouter } from 'vue-router'
import { addCircleOutline, addOutline, checkmarkCircle, heartOutline } from 'ionicons/icons'
import { guideShares, nearbyShares, type ShareItem, type ShareTab } from '@/data/shareData'

const router = useRouter()
const activeTab = ref<ShareTab>('nearby')
const myShares: ShareItem[] = []

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
    subtitle: '你还没有发起分享，现在可以创建一条新的出游计划',
  }
})

const openDetail = (id: number) => {
  router.push(`/tabs/tab3/${id}`)
}
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
  position: relative;
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

.share-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.share-price {
  color: #d95d1a;
  font-size: 14px;
  font-weight: 700;
}

.share-distance {
  color: #607080;
  font-size: 12px;
  font-weight: 600;
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

.icon-action {
  border: 0;
  background: #f4f8fc;
  border-radius: 14px;
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #226bb3;
  font-size: 14px;
  font-weight: 700;
}

.icon-action ion-icon {
  font-size: 20px;
}

.join-action {
  background: #eaf4ff;
}

.icon-action:disabled {
  background: #f3f4f6;
  color: #9aa4b2;
  opacity: 1;
}

.create-share-button {
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: #226bb3;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 22px rgba(34, 107, 179, 0.22);
}

.create-share-button ion-icon {
  font-size: 22px;
}

.empty-state {
  padding: 56px 20px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #e7edf4;
  text-align: center;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: #eaf4ff;
  color: #226bb3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon ion-icon {
  font-size: 30px;
}

.empty-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2329;
}

.empty-description {
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.6;
  color: #6b7785;
}

@media (max-width: 420px) {
  .share-cover {
    height: 170px;
  }
}
</style>
