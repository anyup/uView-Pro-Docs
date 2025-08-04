<template>
  <div class="qq-group">
    <div class="qq-group__item" v-for="item in groupList" :key="item._id">
      {{ item.title }}：
      <a :href="item.joinLink" target="_blank">{{ item.groupNumber }}</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "qqGroup",
  data() {
    return {
      groupList: [
        {
          title: "uView Pro QQ 交流群",
          capacity: 2000,
          currentMembers: 2000,
          owner: "无",
          joinLink: "http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=98nSVDldWEbDdq4lxiP4aL7uATfMSlI6&authKey=G2yQJ5MQiKzMldaxBsIfKt17NuJuUw8Fr6zdKLggc6NZXgw4BVbqkU2U3EE994yd&noverify=0&group_code=811732166",
          groupNumber: "点击进入",
          isActive: true,
          isFull: false,
          sort: 16,
        },
      ],
    };
  },
  created() {
    // axios.get(`https://api.uviewui.com/client/qq-group`).then(({ data }) => {
    //   const { data: { list }, code } = data
    //   if (code === 0) {
    //     this.groupList = list
    //   }
    // })
  },
};
</script>

<style lang="scss" scoped>
.qq-group {
  &__item {
    margin-top: 12px;
    font-size: 14px;
    color: #5e6d82;
  }
}
</style>
