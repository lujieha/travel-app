<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="messages-header">
          <div class="header-eyebrow">消息中心</div>
          <h1>查看最新通知和互动</h1>
          <p>这里集中展示组团动态、申请回复和系统提醒。</p>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="messages-content">
      <div class="page-container">
        <div class="message-card" v-for="item in messages" :key="item.id">
          <div class="message-topline">
            <span class="message-title">{{ item.title }}</span>
            <span class="message-time">{{ item.time }}</span>
          </div>
          <div class="message-body">{{ item.content }}</div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonContent } from '@ionic/vue'

const messages = [
  {
    id: 1,
    title: '组团申请已通过',
    time: '刚刚',
    content: '你申请加入的“崇左德天瀑布边关 2 日团”已通过，请尽快查看详细计划。',
  },
  {
    id: 2,
    title: '发起人有新留言',
    time: '12分钟前',
    content: '发起人更新了集合时间，出发调整为早上 8:00，请提前到达集合点。',
  },
  {
    id: 3,
    title: '导游精品有空位',
    time: '1小时前',
    content: '你收藏的“桂林漓江精华 2 日精品团”目前还有 2 个空位。',
  },
]
</script>

<style scoped>
.messages-header {
  padding: 12px 14px 16px;
  background:
    radial-gradient(circle at top right, rgba(151, 190, 255, 0.35), transparent 36%),
    linear-gradient(180deg, #f4f8ff 0%, #ffffff 100%);
}

.header-eyebrow {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(34, 107, 179, 0.12);
  color: #226bb3;
  font-size: 12px;
  font-weight: 700;
}

.messages-header h1 {
  margin: 12px 0 6px;
  font-size: 28px;
  line-height: 1.2;
  color: #1f2329;
}

.messages-header p {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #607080;
}

.messages-content {
  --background: #f4f7fb;
}

.page-container {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-card {
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid #e7edf4;
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.message-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.message-title {
  font-size: 16px;
  font-weight: 700;
  color: #1f2329;
}

.message-time {
  font-size: 12px;
  color: #7b8794;
}

.message-body {
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.7;
  color: #556575;
}
</style>
