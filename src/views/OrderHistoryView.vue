<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'
import { computed, onMounted } from 'vue'
import { formatDate } from '@/utils/formatDate'

const columns = [
  {
    title: 'Order ID',
    dataIndex: '_id',
    key: '_id'
  },
  {
    title: 'Subtotal',
    dataIndex: 'totalPrice',
    key: 'totalPrice'
  },
  {
    title: 'Status',
    dataIndex: 'isDelivered',
    key: 'isDelivered'
  },
  {
    title: 'Issued Date',
    dataIndex: 'createdAt',
    key: 'createdAt'
  },
  {
    key: 'action'
  }
]

const cartStore = useCartStore()
onMounted(() => cartStore.fetchOrderHistory())
const orderHistory = computed(() => cartStore.orderHistory)
</script>

<template>
  <main class="py-8">
    <h1 class="title">Order History</h1>

    <a-table :dataSource="orderHistory" :columns="columns" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'totalPrice'">
          <a>
            {{ record.totalPrice }}
          </a>
        </template>
        <template v-else-if="column.key === 'isDelivered'">
          <span>
            <a-tag>
              {{ record.isDelivered ? 'Delivered' : 'Pending' }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'createdAt'">
          <span>
            <a>{{ formatDate(new Date(record.createdAt)) }}</a>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a
              ><router-link :to="{ name: 'OrderSummary', params: { orderId: record._id } }"
                ><a-button>view</a-button></router-link
              ></a
            >
          </span>
        </template>
      </template>
    </a-table>
  </main>
</template>

<style scoped></style>
