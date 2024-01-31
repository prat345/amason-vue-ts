<script lang="ts" setup>
import { useRoute } from 'vue-router'
import SearchBox from './SearchBox.vue'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { computed, onMounted } from 'vue'
import { ShoppingCartOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { AlignRightOutlined } from '@ant-design/icons-vue'

const route = useRoute()
const cartStore = useCartStore()
const userStore = useUserStore()
const isActive = (currentPath: string) => {
  // console.log(route.path, currentPath)
  return route.path === currentPath ? 'active' : ''
}
const isExpand = ref(false)
const toggleHamburger = () => {
  isExpand.value = !isExpand.value
}
const profileColor = computed(
  () =>
    ['#f56a00', '#ffbf00', '#7265e6', '#00a2ae'][
      userStore.userData ? userStore.userData?.name?.length % 4 : 0
    ]
)
const isSmallScreen = ref(window.innerWidth < 768)
onMounted(() =>
  window.addEventListener('resize', () => {
    isSmallScreen.value = window.innerWidth < 768
  })
)
</script>

<template>
  <div class="absolute z-50 w-full bg-teal-900">
    <div class="container">
      <div v-if="isSmallScreen" class="flex h-16 items-center justify-between">
        <span>
          <RouterLink to="/" :class="['nav-item text-2xl font-semibold', isActive('/')]"
            >Amason</RouterLink
          >
        </span>
        <span @click="toggleHamburger" class="text-white"><AlignRightOutlined /></span>
      </div>
      <transition name="slide">
        <nav v-if="isExpand || !isSmallScreen" class="mx-auto flex flex-col py-0 md:flex-row">
          <span v-if="!isSmallScreen">
            <RouterLink to="/" :class="['nav-item  px-4 text-2xl font-semibold', isActive('/')]"
              >Amason</RouterLink
            >
          </span>
          <span class="flex grow items-center px-4">
            <search-box />
          </span>
          <span>
            <RouterLink to="/cart" :class="['nav-item', isActive('/cart')]">
              <a-badge
                :count="cartStore.countCartItems"
                :offset="[4, 16]"
                size="medium"
                class="pb-3"
              >
                <span class="text-4xl"><ShoppingCartOutlined class="text-white" /></span>
              </a-badge>
            </RouterLink>
          </span>

          <span v-if="!userStore.userData">
            <RouterLink to="/signin" :class="['nav-item', isActive('/signin')]">Sign In</RouterLink>
          </span>

          <span v-if="userStore.userData" class="">
            <RouterLink to="/profile" :class="['nav-item', isActive('/profile')]"
              ><a-avatar
                size="large"
                :style="{ backgroundColor: profileColor }"
                class="flex items-center text-xl capitalize"
              >
                {{ userStore.userData.name[0] }}
              </a-avatar></RouterLink
            >
          </span>
        </nav>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.active {
  @apply font-medium text-black;
}
nav > ul > li {
  @apply mb-0;
}
.nav-item {
  @apply flex h-16 cursor-pointer items-center justify-center px-6 text-white hover:border-b-4 hover:border-gray-300;
}
.slide-enter-from {
  transform: translateY(-20px);
}
.slide-enter-active {
  transition: all 0.4s cubic-bezier(0.28, 0.64, 0.83, 0.81);
}
</style>
