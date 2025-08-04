## md5 加密

<demo-model url="/pages/library/md5/index"></demo-model>


该`md5`加密方法，需要手动`import`库函数，调用`md5`方法即可使用，可以对字符串加密为32位的字符串结果，如需进一步了解，
详见[MD5百度百科](https://baike.baidu.com/item/MD5)  


使用方法：

```js
import md5Libs from "uview-ui/libs/function/md5";
export default{
	onLoad() {
		console.log(md5Libs.md5('uView'))
		// 结果为：55c859b4750225eb1cdbd9e0403ee274
	}
}
```