<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="mine-header">
          <div class="profile-card">
            <img class="profile-avatar" src="https://i.pravatar.cc/160?u=mine-user" alt="我的头像" />
            <div class="profile-main">
              <div class="profile-name-row">
                <h1>木木旅行家</h1>
                <span class="profile-badge">Lv.6</span>
              </div>
              <p class="profile-desc">爱音乐节、民俗活动和周末短途，一边看风景一边组队出发。</p>
              <div class="profile-stats">
                <div class="stat-item">
                  <strong>18</strong>
                  <span>已出行</span>
                </div>
                <div class="stat-item">
                  <strong>9</strong>
                  <span>收藏</span>
                </div>
                <div class="stat-item">
                  <strong>26</strong>
                  <span>消息</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="mine-content">
      <div class="page-container">
        <section class="menu-section">
          <button v-for="item in quickMenus" :key="item.title" type="button" class="menu-card">
            <div class="menu-icon" :class="item.colorClass">
              <ion-icon :icon="item.icon" />
            </div>
            <div class="menu-text">
              <div class="menu-title">{{ item.title }}</div>
              <div class="menu-desc">{{ item.desc }}</div>
            </div>
          </button>
        </section>

        <section class="message-section">
          <div class="section-header">
            <div>
              <div class="section-title">消息中心</div>
              <div class="section-subtitle">组团动态、报名反馈和系统提醒都集中在这里</div>
            </div>
            <button type="button" class="message-filter">全部已读</button>
          </div>

          <div class="message-list">
            <div class="message-card" v-for="item in messages" :key="item.id">
              <div class="message-dot" :class="{ unread: !item.read }"></div>
              <div class="message-main">
                <div class="message-topline">
                  <span class="message-title">{{ item.title }}</span>
                  <span class="message-time">{{ item.time }}</span>
                </div>
                <div class="message-body">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonContent, IonIcon } from '@ionic/vue'
import {
  bookmarkOutline,
  chatbubbleEllipsesOutline,
  documentTextOutline,
  heartOutline,
} from 'ionicons/icons'

const quickMenus = [
  {
    title: '我的行程',
    desc: '查看已报名和待出发活动',
    icon: documentTextOutline,
    colorClass: 'blue',
  },
  {
    title: '我的收藏',
    desc: '保存的路线、音乐会和民俗活动',
    icon: heartOutline,
    colorClass: 'red',
  },
  {
    title: '我的攻略',
    desc: '想去清单与已收藏笔记',
    icon: bookmarkOutline,
    colorClass: 'gold',
  },
  {
    title: '互动记录',
    desc: '查看聊天、评论和组队反馈',
    icon: chatbubbleEllipsesOutline,
    colorClass: 'green',
  },
]

const messages = [
  {
    id: 1,
    title: '组团申请已通过',
    time: '刚刚',
    content: '你申请加入的“崇左德天瀑布边关 2 日团”已通过，请尽快查看详细计划。',
    read: false,
  },
  {
    id: 2,
    title: '发起人有新留言',
    time: '12分钟前',
    content: '发起人更新了集合时间，出发调整为早上 8:00，请提前到达集合点。',
    read: false,
  },
  {
    id: 3,
    title: '导游精品有空位',
    time: '1小时前',
    content: '你收藏的“桂林漓江精华 2 日精品团”目前还有 2 个空位。',
    read: true,
  },
  {
    id: 4,
    title: '系统提醒',
    time: '昨天',
    content: '你的实名认证已通过，现在可以直接报名更多带队活动。',
    read: true,
  },
]
</script>

<style scoped>
.mine-header {
  padding: 14px;
  background:
    radial-gradient(circle at top right, rgba(255, 196, 130, 0.38), transparent 34%),
    linear-gradient(180deg, #fff7eb 0%, #ffffff 100%);
}

.profile-card {
  display: flex;
  gap: 14px;
  padding: 18px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #f0dfca;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.profile-avatar {
  width: 72px;
  height: 72px;
  border-radius: 22px;
  object-fit: cover;
  flex-shrink: 0;
}

.profile-main {
  min-width: 0;
  flex: 1;
}

.profile-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-name-row h1 {
  margin: 0;
  font-size: 24px;
  line-height: 1.2;
  color: #1f2329;
}

.profile-badge {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: #fff1dc;
  color: #b25b00;
  font-size: 12px;
  font-weight: 700;
}

.profile-desc {
  margin: 8px 0 12px;
  font-size: 13px;
  line-height: 1.6;
  color: #62707f;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.stat-item {
  padding: 10px 8px;
  border-radius: 16px;
  background: #f8fafc;
  text-align: center;
}

.stat-item strong {
  display: block;
  font-size: 18px;
  color: #1f2329;
}

.stat-item span {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #6b7785;
}

.mine-content {
  --background: #f5f7fb;
}

.page-container {
  padding: 14px;
}

.menu-section,
.message-section {
  margin-bottom: 16px;
}

.menu-section {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.menu-card {
  border: 1px solid #e7edf4;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.98);
  padding: 14px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  text-align: left;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
}

.menu-icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.menu-icon.blue {
  background: #e9f3ff;
  color: #226bb3;
}

.menu-icon.red {
  background: #ffecee;
  color: #cd3b4f;
}

.menu-icon.gold {
  background: #fff4dd;
  color: #bb7a00;
}

.menu-icon.green {
  background: #eafbf1;
  color: #1d8a57;
}

.menu-title {
  font-size: 15px;
  font-weight: 700;
  color: #1f2329;
}

.menu-desc {
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.5;
  color: #62707f;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2329;
}

.section-subtitle {
  margin-top: 4px;
  font-size: 12px;
  color: #6b7785;
}

.message-filter {
  border: 0;
  height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background: #eef4fb;
  color: #226bb3;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-card {
  display: flex;
  gap: 12px;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid #e7edf4;
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.message-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #d0d7e2;
  margin-top: 7px;
  flex-shrink: 0;
}

.message-dot.unread {
  background: #ff7a45;
  box-shadow: 0 0 0 4px rgba(255, 122, 69, 0.12);
}

.message-main {
  min-width: 0;
  flex: 1;
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
  flex-shrink: 0;
}

.message-body {
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.7;
  color: #556575;
}

@media (max-width: 420px) {
  .profile-card {
    flex-direction: column;
  }

  .menu-section {
    grid-template-columns: 1fr;
  }
}
</style>
