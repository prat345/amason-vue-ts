import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  Button,
  Card,
  Col,
  Row,
  Badge,
  Avatar,
  Form,
  Input,
  Alert,
  Space,
  Table
} from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import ToastPlugin from 'vue-toast-notification'

import 'vue-toast-notification/dist/theme-sugar.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(Button)
app.use(Card)
app.use(Col)
app.use(Row)
app.use(Badge)
app.use(Form)
app.use(Input)
app.use(Alert)
app.use(Space)
app.use(Table)
app.use(Avatar)
app.use(ToastPlugin)
app.use(router)

app.mount('#app')
