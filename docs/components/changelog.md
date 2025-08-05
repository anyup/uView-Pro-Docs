## 更新日志

<!-- <div class="doc-update">
	<ul class="u-timeline u-timeline-pending">
    <li class="u-timeline-item">
			<div class="u-timeline-item-tail"></div>
			<div class="u-timeline-item-head u-timeline-item-head-blue"></div>
			<div class="u-timeline-item-content">
				<div class="anchor">
					<h2>{{ item.version }}</h2>
				</div>
				<p><code>{{ item.releaseDate }}</code></p>
				<ul>
					<li v-for="log in item.changes" :key="log._id">
						<span class="fix" v-if="log.type === 'fix'">修复</span>
						<span class="add" v-if="log.type === 'add'">添加</span>
						<span class="optimize" v-if="log.type === 'perf'">优化</span>
						{{ log.desc }}
						<git-link v-if="log.issueAnchor" :anchors="log.issueAnchor" />
					</li>
				</ul>
			</div>
		</li>
	</ul>
</div> -->

<div class="doc-update">
	<ul class="u-timeline u-timeline-pending">
    <li class="u-timeline-item" v-for="item in logList" :key="item._id">
			<div class="u-timeline-item-tail"></div>
			<div class="u-timeline-item-head u-timeline-item-head-blue"></div>
			<div class="u-timeline-item-content">
				<div class="anchor">
					<h2>{{ item.version }}</h2>
				</div>
				<p><code>{{ item.releaseDate }}</code></p>
				<ul>
					<li v-for="log in item.changes" :key="log._id">
						<span class="fix" v-if="log.type === 'fix'">修复</span>
						<span class="add" v-if="log.type === 'add'">添加</span>
						<span class="optimize" v-if="log.type === 'perf'">优化</span>
						{{ log.desc }}
						<git-link v-if="log.issueAnchor" :anchors="log.issueAnchor" />
					</li>
				</ul>
			</div>
		</li>
	</ul>
</div>

### 基础组件（8）

- Color 色彩
- Icon 图标
- Image 图片
- Button 按钮
- Layout 布局
- Cell 单元格
- Badge 徽标数
- Tag 标签

---

### 表单组件（15）

- Form 表单
- Calendar 日历
- Select 列选择器
- Keyboard 键盘
- Picker 选择器
- Rate 评分
- Search 搜索
- NumberBox 步进器
- Upload 上传
- VerificationCode 验证码倒计时
- Field 输入框
- Checkbox 复选框
- Radio 单选框
- Switch 开关选择器
- Slider 滑动选择器

---

### 数据组件（4）

- Progress 进度条
- Table 表格
- CountDown 倒计时
- CountTo 数字滚动

---

### 反馈组件（10）

- ActionSheet 操作菜单
- AlertTips 警告提示
- Toast 消息提示
- NoticeBar 滚动通知
- TopTips 顶部提示
- SwipeAction 滑动单元格
- Collapse 折叠面板
- Popup 弹出层
- Modal 模态框
- fullScreen 压窗屏

---

### 布局组件（11）

- Line 线条
- Card 卡片
- Mask 遮罩层
- NoNetwork 无网络提示
- Grid 宫格布局
- Swiper 轮播图
- TimeLine 时间轴
- Skeleton 骨架屏
- Sticky 吸顶
- Waterfall 瀑布流
- Divider 分割线

---

### 导航组件（11）

- Dropdown 下拉菜单
- Tabbar 底部导航栏
- BackTop 返回顶部
- Navbar 导航栏
- Tabs 标签
- TabsSwiper 全屏选项卡
- Subsection 分段器
- IndexList 索引列表
- Steps 步骤条
- Empty 内容为空
- Section 查看更多

---

### 其他组件（8）

- MessageInput 验证码输入
- Loadmore 加载更多
- ReadMore 展开阅读更多
- LazyLoad 懒加载
- Gap 间隔槽
- Avatar 头像
- Link 超链接
- Loading 加载动画

---

<script>
import axios from 'axios'

export default {
    data() {
        return {
            logList: [
				{
                "_id": "6797147e4736aefcf83a0787",
                "docs": "v1",
                "version": "0.0.2",
                "releaseDate": "2024-08-04",
                "changes": [
                    {
                        "type": "add",
                        "desc": "完成67个组件的重构",
                        "issueAnchor": "",
                        "issueUrl": ""
                    },
                ]
            },
			]
        }
    },
    created() {
        // axios.get(`https://api.uviewui.com/client/changelog?size=10000&docs=v1`).then(({ data }) => {
        //     const { data: { list }, code } = data
        //     if (code === 0) {
        //         this.logList = list
        //     }
        // })
    }
}
</script>

<style>
	.doc-update {
		padding: 10px 5px;
		position: relative;
		line-height: 1.5;
		color: #515a6e;
	}
	
	.u-timeline {
		padding-left: 0;
	}

	.u-timeline-item-tail {
		height: 100%;
		border-left: 1px solid #e8eaec;
		position: absolute;
		left: 7px;
		top: 0;
	}

	.u-timeline-item-head {
		width: 13px;
		height: 13px;
		background-color: #fff;
		border-radius: 50%;
		border: 1px solid transparent;
		position: absolute;
	}

	.u-timeline-item-head-blue {
		border-color: #2d8cf0;
		color: #2d8cf0;
	}

	.doc-update .u-timeline .u-timeline-item-content {
		top: -4px;
	}

	.u-timeline-item-content {
		padding: 1px 1px 10px 28px;
		font-size: 14px;
		position: relative;
		top: -3px;
	}

	.doc-update h2 {
		font-size: 18px;
		font-weight: 400;
		display: inline-block;
		margin: 0;
		border: none;
		color: #515a6e;
	}

	.page .doc-update p {
		margin: 5px 0!important;
		font-size: 14px;
	}

	.doc-update code {
		margin: 8px 0!important;
		font-size: 85%;
		background-color: #fff5f5!important;
		border-radius: 3px;
		font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
		color: #fa795e!important;
		padding: 2px 4px;
	}

	.doc-update ol ul:not([class^=u-]),
	.doc-update ul ul:not([class^=u-]) {
		list-style-type: circle;
	}

	.doc-update li:not([class^=u-]) {
		margin-bottom: 5px;
		font-size: 14px;
	}

	a {
		color: #2d8cf0;
		background: 0 0;
		text-decoration: none;
		outline: 0;
		cursor: pointer;
		transition: color .2s ease;
	}

	.u-timeline-item {
		margin: 0 !important;
		padding: 0 0 12px;
		list-style: none;
		position: relative;
	}
	
	.u-timeline-item span {
		display: inline-block;
		padding: 4px 8px;
		border-radius: 4px;
		color: #fff;
		font-size: 12px;
		border-width: 1px;
		border-style: solid;
		line-height: 1;
		margin-right: 5px;
	}
	
	.u-timeline-item span.fix {
		color: rgb(255, 153, 0);
		background-color: rgb(253, 246, 236);
		border-color: rgb(252, 189, 113);
	}
	
	.u-timeline-item span.add {
		color: rgb(25, 190, 107);
		background-color: rgb(219, 241, 225);
		border-color: rgb(113, 213, 161);
	}
	
	.u-timeline-item span.optimize {
		color: rgb(41, 121, 255);
		background-color: rgb(236, 245, 255);
		border-color: rgb(160, 207, 255);
	}
</style>
