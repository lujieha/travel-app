<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="together-header">
          <div class="header-eyebrow">同行中</div>
          <h1>我已加入的旅行组团</h1>
          <p>查看当前团的线路信息、成员联系和每日行程安排。</p>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="together-content">
      <div class="hero-banner">
        <img :src="trip.cover" :alt="trip.name" />
        <div class="hero-overlay">
          <div class="hero-date">{{ trip.dateRange }}</div>
          <div class="hero-title">{{ trip.name }}</div>
        </div>
      </div>

      <div class="page-container">
        <section class="segment-section">
          <ion-segment v-model="activeTab" scrollable>
            <ion-segment-button value="overview">
              <ion-label>线路概述</ion-label>
            </ion-segment-button>
            <ion-segment-button value="members">
              <ion-label>团队成员</ion-label>
            </ion-segment-button>
            <ion-segment-button
              v-for="day in trip.days"
              :key="day.day"
              :value="`day-${day.day}`"
            >
              <ion-label>第{{ day.day }}天</ion-label>
            </ion-segment-button>
          </ion-segment>
        </section>

        <section v-if="activeTab === 'overview'" class="content-card">
          <div class="section-title">线路概述</div>
          <div class="overview-grid">
            <div class="overview-item">
              <div class="item-label">名称</div>
              <div class="item-value">{{ trip.name }}</div>
            </div>
            <div class="overview-item">
              <div class="item-label">费用</div>
              <div class="item-value">约 {{ trip.price }} 元</div>
            </div>
            <div class="overview-item">
              <div class="item-label">当前状态</div>
              <div class="item-value">{{ trip.status }}</div>
            </div>
            <div class="overview-item">
              <div class="item-label">出行日期</div>
              <div class="item-value">{{ trip.dateRange }}</div>
            </div>
            <div class="overview-item">
              <div class="item-label">集合方式</div>
              <div class="item-value">{{ trip.meeting }}</div>
            </div>
            <div class="overview-item">
              <div class="item-label">住宿方式</div>
              <div class="item-value">{{ trip.stay }}</div>
            </div>
          </div>
          <div class="overview-desc">{{ trip.description }}</div>
        </section>

        <section v-else-if="activeTab === 'members'" class="content-card">
          <div class="section-title">团队成员</div>
          <div class="member-list">
            <div v-for="member in trip.members" :key="member.id" class="member-card">
              <div class="member-main">
                <img :src="member.avatar" :alt="member.name" class="member-avatar" />
                <div class="member-info">
                  <div class="member-name">{{ member.name }}</div>
                  <div class="member-role">{{ member.role }}</div>
                  <div class="member-distance">{{ member.distance }}</div>
                </div>
              </div>

              <div class="member-actions">
                <button type="button" class="member-action">
                  <ion-icon :icon="chatbubbleEllipsesOutline" />
                  <span>对话</span>
                </button>
                <button type="button" class="member-action">
                  <ion-icon :icon="callOutline" />
                  <span>电话</span>
                </button>
                <button type="button" class="member-action">
                  <ion-icon :icon="imagesOutline" />
                  <span>他的相册</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section v-else class="content-card">
          <div class="section-title">{{ currentDay?.title }}</div>
          <div v-if="currentDay" class="timeline">
            <div
              v-for="plan in currentDay.plans"
              :key="`${currentDay.day}-${plan.time}`"
              class="timeline-item"
            >
              <div class="timeline-time">{{ plan.time }}</div>
              <div class="timeline-content">{{ plan.content }}</div>
            </div>
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
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
} from '@ionic/vue'
import { callOutline, chatbubbleEllipsesOutline, imagesOutline } from 'ionicons/icons'

type SegmentTab = 'overview' | 'members' | `day-${number}`

interface Member {
  id: number
  name: string
  role: string
  avatar: string
  distance: string
}

interface DayPlan {
  time: string
  content: string
}

interface TripDay {
  day: number
  title: string
  plans: DayPlan[]
}

const avatar = (seed: string) => `https://i.pravatar.cc/160?u=${seed}`

const trip = {
  name: '崇左德天瀑布边关 2 日同行团',
  dateRange: '5月1日 - 5月2日',
  price: 680,
  status: '已成团，待出发',
  meeting: '南宁会展航洋城集合，自驾拼车出发',
  stay: '明仕田园精品民宿一晚，双人标间',
  description:
    '这是一条以崇左边关风景和轻松体验为主的两日线，包含德天瀑布、明仕田园、边关公路风景和夜宿民宿。整体节奏不赶，适合第一次参加结伴旅行的人。',
  cover:
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
  members: [
    { id: 1, name: '阿泽', role: '发起人', avatar: avatar('together-host'), distance: '200米' },
    { id: 2, name: '林森', role: '同行成员', avatar: avatar('together-2'), distance: '380米' },
    { id: 3, name: '小雨', role: '同行成员', avatar: avatar('together-3'), distance: '1.2公里' },
    { id: 4, name: 'Nina', role: '同行成员', avatar: avatar('together-4'), distance: '650米' },
  ] as Member[],
  days: [
    {
      day: 1,
      title: '第一天详细计划',
      plans: [
        { time: '08:00 - 09:00', content: '南宁集合，自驾拼车出发，确认行李和早餐补给。' },
        { time: '09:00 - 12:30', content: '沿高速前往崇左，途中服务区休息一次。' },
        { time: '12:30 - 13:30', content: '到达明仕田园附近用午餐，安排入住前行李寄存。' },
        { time: '13:30 - 16:30', content: '明仕田园骑行和竹筏拍照，自由活动与小组打卡。' },
        { time: '17:00 - 18:30', content: '前往边关公路观景点，看傍晚山水风光。' },
        { time: '19:00 - 20:30', content: '民宿晚餐，统一说明第二天瀑布行程注意事项。' },
        { time: '22:00', content: '入住明仕田园 XXX 民宿，休息。' },
      ],
    },
    {
      day: 2,
      title: '第二天详细计划',
      plans: [
        { time: '07:30 - 08:30', content: '民宿早餐，整理退房。' },
        { time: '08:30 - 11:30', content: '前往德天瀑布景区，观景、拍照和自由游览。' },
        { time: '11:30 - 12:30', content: '景区附近午餐。' },
        { time: '12:30 - 15:30', content: '返程途中可在观景台短暂停留补拍照片。' },
        { time: '15:30 - 18:30', content: '自驾返回南宁，途中服务区休整。' },
        { time: '18:30', content: '抵达南宁，行程结束。' },
      ],
    },
  ] as TripDay[],
}

const activeTab = ref<SegmentTab>('overview')

const currentDay = computed(() => {
  if (!activeTab.value.startsWith('day-')) {
    return null
  }

  const dayNumber = Number(activeTab.value.replace('day-', ''))
  return trip.days.find((day) => day.day === dayNumber) ?? null
})
</script>

<style scoped>
.together-header {
  padding: 12px 14px 16px;
  background:
    radial-gradient(circle at top right, rgba(255, 195, 92, 0.4), transparent 36%),
    linear-gradient(180deg, #fff7e8 0%, #ffffff 100%);
}

.header-eyebrow {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(196, 106, 18, 0.12);
  color: #b36310;
  font-size: 12px;
  font-weight: 700;
}

.together-header h1 {
  margin: 12px 0 6px;
  font-size: 28px;
  line-height: 1.2;
  color: #1f2329;
}

.together-header p {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #607080;
}

.together-content {
  --background: #f4f7fb;
}

.hero-banner {
  position: relative;
  height: 230px;
  overflow: hidden;
}

.hero-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.08) 18%, rgba(0, 0, 0, 0.56) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 18px 16px;
}

.hero-date {
  color: rgba(255, 255, 255, 0.92);
  font-size: 13px;
  font-weight: 600;
}

.hero-title {
  margin-top: 8px;
  color: #ffffff;
  font-size: 24px;
  line-height: 1.25;
  font-weight: 700;
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
  --color-checked: #b36310;
  --indicator-color: #fff1dd;
  --indicator-box-shadow: none;
  min-height: 38px;
  font-weight: 700;
}

.content-card {
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid #e7edf4;
  border-radius: 22px;
  padding: 16px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2329;
  margin-bottom: 14px;
}

.overview-grid {
  display: grid;
  gap: 12px;
}

.overview-item {
  border-radius: 16px;
  background: #f8fafc;
  padding: 12px;
}

.item-label {
  font-size: 12px;
  font-weight: 700;
  color: #607080;
  margin-bottom: 6px;
}

.item-value {
  font-size: 14px;
  line-height: 1.6;
  color: #1f2329;
}

.overview-desc {
  margin-top: 14px;
  font-size: 13px;
  line-height: 1.7;
  color: #556575;
}

.member-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.member-card {
  border-radius: 18px;
  background: #f8fafc;
  padding: 14px;
}

.member-main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.member-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.member-info {
  min-width: 0;
}

.member-name {
  font-size: 16px;
  font-weight: 700;
  color: #1f2329;
}

.member-role {
  margin-top: 4px;
  font-size: 12px;
  color: #607080;
}

.member-distance {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #d95d1a;
}

.member-actions {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 12px;
}

.member-action {
  border: 0;
  min-height: 42px;
  border-radius: 14px;
  background: #ffffff;
  color: #226bb3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
}

.member-action ion-icon {
  font-size: 18px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 108px 1fr;
  gap: 12px;
  align-items: start;
}

.timeline-time {
  font-size: 12px;
  font-weight: 700;
  color: #b36310;
  padding-top: 2px;
}

.timeline-content {
  border-radius: 16px;
  background: #f8fafc;
  padding: 12px;
  font-size: 13px;
  line-height: 1.6;
  color: #1f2329;
}

@media (max-width: 420px) {
  .hero-banner {
    height: 208px;
  }

  .timeline-item {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .member-actions {
    grid-template-columns: 1fr;
  }
}
</style>
