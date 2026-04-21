<template>
  <ion-page v-if="item">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab3" />
        </ion-buttons>
        <ion-title>旅友分享详情</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="detail-content">
      <div class="hero-image">
        <img :src="item.image" :alt="item.route" />
      </div>

      <div class="detail-container">
        <section class="title-section">
          <div class="date-badge">{{ item.dateRange }}</div>
          <h1>{{ item.route }}</h1>
          <div class="meta-row">
            <span class="price-tag">约 {{ item.price }} 元</span>
            <span class="distance-tag">{{ item.distance }}</span>
            <span class="status-tag" :class="{ full: item.status === 'full' }">
              {{ item.status === 'full' ? '已满员' : `还差 ${item.slotsLeft} 人` }}
            </span>
          </div>
        </section>

        <section class="host-section card-section">
          <div class="section-title">发起人</div>
          <div class="host-row">
            <img :src="item.hostAvatar" :alt="item.hostName" class="host-avatar" />
            <div class="host-info">
              <div class="host-name-row">
                <span class="host-name">{{ item.hostName }}</span>
                <button type="button" class="host-action">
                  <ion-icon :icon="chatbubbleEllipsesOutline" />
                </button>
                <button type="button" class="host-action">
                  <ion-icon :icon="callOutline" />
                </button>
              </div>
              <div class="host-desc">已发起 6 次广西结伴行程，回复速度快</div>
            </div>
          </div>
        </section>

        <section class="members-section card-section">
          <div class="section-title">已加入人员</div>
          <div class="members-row">
            <img
              v-for="member in item.members"
              :key="member.id"
              :src="member.avatar"
              :alt="member.name"
              class="member-avatar"
            />
          </div>
        </section>

        <section class="card-section">
          <div class="section-title">线路详细介绍</div>
          <p class="detail-text">{{ item.detail }}</p>
        </section>

        <section class="card-section info-grid">
          <div class="info-item">
            <div class="info-label">日期</div>
            <div class="info-value">{{ item.dateRange }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">集合点</div>
            <div class="info-value">{{ item.meetingPoint }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">交通方式</div>
            <div class="info-value">{{ item.transport }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">住宿方式</div>
            <div class="info-value">{{ item.lodging }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">费用说明</div>
            <div class="info-value">约 {{ item.price }} 元，实际以最终拼团和订房情况为准</div>
          </div>
        </section>

        <section class="card-section">
          <div class="section-title">申请加入</div>
          <ion-button expand="block" class="join-button" :disabled="item.status === 'full'">
            {{ item.status === 'full' ? '当前已满员' : '申请加入该线路' }}
          </ion-button>
        </section>

        <section class="card-section">
          <div class="section-title">留言</div>
          <div class="comment-list">
            <div v-for="comment in comments" :key="comment.id" class="comment-item">
              <img :src="comment.avatar" :alt="comment.name" class="comment-avatar" />
              <div class="comment-body">
                <div class="comment-topline">
                  <span class="comment-name">{{ comment.name }}</span>
                  <span class="comment-time">{{ comment.time }}</span>
                </div>
                <div class="comment-content">{{ comment.content }}</div>
              </div>
            </div>
          </div>

          <div class="leave-message">
            <ion-textarea
              v-model="message"
              auto-grow
              :rows="3"
              fill="outline"
              placeholder="说点什么，问问集合时间、住宿安排或交通细节"
            />
            <ion-button class="message-button" @click="submitMessage">留言</ion-button>
          </div>
        </section>
      </div>
    </ion-content>
  </ion-page>

  <ion-page v-else>
    <ion-content class="empty-detail">
      <div class="empty-detail-box">
        <div class="empty-detail-title">未找到该分享</div>
        <ion-button router-link="/tabs/tab3">返回列表</ion-button>
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
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton,
  IonTextarea,
} from '@ionic/vue'
import { callOutline, chatbubbleEllipsesOutline } from 'ionicons/icons'
import { useRoute } from 'vue-router'
import { getShareItemById } from '@/data/shareData'

const route = useRoute()
const shareId = computed(() => Number(route.params.id))
const item = computed(() => getShareItemById(shareId.value))
const message = ref('')
const comments = ref(item.value?.comments ? [...item.value.comments] : [])

const submitMessage = () => {
  if (!message.value.trim()) {
    return
  }

  comments.value.unshift({
    id: Date.now(),
    name: '我',
    avatar: `https://i.pravatar.cc/160?u=me-${Date.now()}`,
    content: message.value.trim(),
    time: '刚刚',
  })
  message.value = ''
}
</script>

<style scoped>
.detail-content {
  --background: #f4f7fb;
}

.hero-image {
  height: 240px;
  overflow: hidden;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.detail-container {
  margin-top: -28px;
  border-radius: 28px 28px 0 0;
  background: #f4f7fb;
  padding: 18px 14px 28px;
  position: relative;
}

.title-section,
.card-section {
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid #e7edf4;
  border-radius: 22px;
  padding: 16px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
  margin-bottom: 14px;
}

.date-badge {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: #eaf4ff;
  color: #226bb3;
  font-size: 12px;
  font-weight: 700;
}

.title-section h1 {
  margin: 12px 0 10px;
  font-size: 26px;
  line-height: 1.25;
  color: #1f2329;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.price-tag,
.distance-tag,
.status-tag {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.price-tag {
  background: #fff1e8;
  color: #d95d1a;
}

.distance-tag {
  background: #f1f6fc;
  color: #607080;
}

.status-tag {
  background: #ebfff3;
  color: #157347;
}

.status-tag.full {
  background: #fff0f0;
  color: #c43d3d;
}

.section-title {
  font-size: 17px;
  font-weight: 700;
  color: #1f2329;
  margin-bottom: 12px;
}

.host-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.host-avatar {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.host-info {
  min-width: 0;
  flex: 1;
}

.host-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.host-name {
  font-size: 18px;
  font-weight: 700;
  color: #1f2329;
}

.host-action {
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: #eef5ff;
  color: #226bb3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.host-action ion-icon {
  font-size: 18px;
}

.host-desc,
.detail-text {
  font-size: 13px;
  line-height: 1.7;
  color: #556575;
}

.host-desc {
  margin-top: 6px;
}

.members-row {
  display: flex;
  align-items: center;
}

.member-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
  margin-left: -8px;
}

.member-avatar:first-child {
  margin-left: 0;
}

.info-grid {
  display: grid;
  gap: 12px;
}

.info-item {
  border-radius: 16px;
  background: #f8fafc;
  padding: 12px;
}

.info-label {
  font-size: 12px;
  font-weight: 700;
  color: #607080;
  margin-bottom: 6px;
}

.info-value {
  font-size: 14px;
  line-height: 1.6;
  color: #1f2329;
}

.join-button {
  --background: #226bb3;
  --background-hover: #1d619f;
  --background-activated: #1d619f;
  --border-radius: 16px;
  min-height: 46px;
  font-weight: 700;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.comment-item {
  display: flex;
  gap: 10px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.comment-body {
  flex: 1;
  min-width: 0;
  padding: 10px 12px;
  border-radius: 16px;
  background: #f8fafc;
}

.comment-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.comment-name {
  font-size: 13px;
  font-weight: 700;
  color: #1f2329;
}

.comment-time {
  font-size: 11px;
  color: #7b8794;
}

.comment-content {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.6;
  color: #556575;
}

.leave-message {
  margin-top: 16px;
}

.message-button {
  margin-top: 12px;
  --background: #1f2329;
  --border-radius: 14px;
}

.empty-detail {
  --background: #f4f7fb;
}

.empty-detail-box {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.empty-detail-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2329;
}
</style>
