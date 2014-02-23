ThreeSixty
==========

###使用方法

```
	$('#container').threeSixty({
		image: 'images/example-##.jpg', 
		frames: 26,
		startFrame: -28,
		reverse: true
	});
```

**image** 圖片路徑，##代表01~99數字編碼, #代表1~99數字編碼... ###則是三碼，依此類推
**frames** 總共影格數(起始為1)。如果數字不正確導致讀取失敗將不會運作
**startFrame** 起始的位移影格數(旋轉角度)
**reverse** 反向旋轉
