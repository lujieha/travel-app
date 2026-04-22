<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>首页</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="hot" href="/tabs/hot">
          <ion-icon aria-hidden="true" :icon="flame" />
          <ion-label>热点</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="share" href="/tabs/tab3">
          <ion-icon aria-hidden="true" :icon="share" />
          <ion-label>分享</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="together" href="/tabs/tab4">
          <ion-icon aria-hidden="true" :icon="personAdd" />
          <ion-label>同行</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="mine" href="/tabs/mine">
          <ion-icon aria-hidden="true" :icon="happy" />
          <ion-label>我的</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from '@ionic/vue'
import { flame, happy, home, personAdd, share } from 'ionicons/icons'
</script>
