<template>
  <div>
    做一个UI框架是一项庞大的工作，尤其是要多端适配，并且迅速跟进uniapp官方的更新，uView
    Pro作者经常为此工作到深夜……
    <br />
    <br />
    uView Pro文档和源码全部开源免费，如果您认为uView
    Pro帮到了您的开发工作，您可以捐赠uView
    Pro的研发工作，捐赠无门槛，哪怕是一杯可乐也好(相信这比打赏主播更有意义)。
    <el-row :gutter="20">
      <el-col :md="8" :xs="24">
        <div class="sponsor-type">
          <img
            src="https://ik.imagekit.io/anyup/images/social/weixin-pay.png"
          />
        </div>
      </el-col>
      <el-col :md="8" :xs="24">
        <div class="sponsor-type">
          <img src="https://ik.imagekit.io/anyup/images/social/ali-pay.png" />
        </div>
      </el-col>
    </el-row>

    以下为历史捐赠者名单，无论金额多少，我们都铭记在心，感谢您的支持！
    <br />
    如有遗漏，请及时联系，我们将及时更新。

    <el-popover
      placement="top-start"
      title="扫码添加：anyupxing"
      :width="200"
      trigger="hover"
    >
      <img src="https://ik.imagekit.io/anyup/images/social/weixin-person.png" alt="" srcset="" />
      <template #reference>
        <a class="cursor follow-us">微信搜索或扫码添加：anyupxing</a>
      </template>
    </el-popover>

    <br />
    <br />

    <!-- <div class="table-header">
      <el-select
        v-model="order"
        placeholder="排序方式"
        size="small"
        @change="fetchDonationList"
      >
        <el-option label="按日期排序" value="donationDate"></el-option>
        <el-option label="按金额排序" value="amount"></el-option>
      </el-select>
    </div> -->

    <el-table :data="donationList" border size="small">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="avatar" label="头像">
        <template #default="scope">
          <el-avatar
            v-if="scope.row.avatar"
            :src="scope.row.avatar"
            :size="30"
          ></el-avatar>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="金额(元)" />
      <el-table-column prop="donationDate" label="日期" />
      <el-table-column prop="platform" label="平台">
        <template #default="scope">
          <span v-if="scope.row.platform === 'wechat'">微信</span>
          <span v-else-if="scope.row.platform === 'alipay'">支付宝</span>
          <span v-else-if="scope.row.platform === 'dcloud'">DCloud</span>
          <span v-else>其他</span>
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="留言">
        <template #default="scope">
          <span>{{ scope.row.comment || '--' }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
// 捐赠者名单展示组件，支持历史捐赠者列表展示
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 云端静态资源基础地址
// const baseUrl = '/json'
const baseUrl = 'https://env-00jxty5jnvo5-static.normal.cloudstatic.cn/api'
// 捐赠者列表数据
const donationList = ref<any[]>([])
// 排序方式（可扩展）
const order = ref('donationDate')

// 获取捐赠者列表
function fetchDonationList() {
  axios
    .get(`${baseUrl}/donation.json?updateAt=${Date.now()}`)
    .then(({ data }) => {
      const {
        data: { list },
        code
      } = data
      if (code === 0) {
        donationList.value = list
      }
    })
}

// 页面加载时获取数据
onMounted(() => {
  fetchDonationList()
})
</script>

<style scoped>
.sponsor-type {
  width: 100%;
  text-align: center;
  margin: 30px 0;
  display: inline-block;
}

.sponsor-type img {
  max-width: 200px;
  display: inline-block;
}

.table-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

:deep(td),
:deep(th),
:deep(tr) {
  border: none;
}

:deep(table) {
  margin: 0;
}
</style>
