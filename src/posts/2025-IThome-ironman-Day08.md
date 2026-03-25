---
title: 藍隊星星的數位鑑識筆記 Day.8 OSINT（二）解題練習 
date: 2025-09-22
description: 本篇文章主要會介紹各種我所知道在做數位鑑識題目時可能會用到的工具，介紹完工具之後也會做一些題目。
tags: [IThome ironman, Blue Team, OSINT]
categories: [Security]
draft: false
---

# 正文
## 解題網站

![https://ithelp.ithome.com.tw/upload/images/20250922/20162387qVgkgvv5wI.jpg](https://ithelp.ithome.com.tw/upload/images/20250922/20162387qVgkgvv5wI.jpg)

**[GeoGuessr](**https://www.geoguessr.com/**)** 是一個有趣的網頁小遊戲，玩家要透過有限的線索來推測圖片中的位置。
- 免費版：單機遊戲，每天可以玩三題
- 付費版：支援多人聯機，可選擇多種出題類型

## 解題過程

1. 題目開始倒數兩分鐘，你可以像使用 google map 一樣隨意的察看周圍有甚麼特徵
    ![https://ithelp.ithome.com.tw/upload/images/20250922/20162387cFHGoarpBf.png](https://ithelp.ithome.com.tw/upload/images/20250922/20162387cFHGoarpBf.png)
2. 通常這種街道第一個要看的就是路牌，上面寫 McKillop St
    ![https://ithelp.ithome.com.tw/upload/images/20250922/20162387s0r4VOX63s.png](https://ithelp.ithome.com.tw/upload/images/20250922/20162387s0r4VOX63s.png)
3. 直接搜尋，大概落在兩個地方
    ![https://ithelp.ithome.com.tw/upload/images/20250922/20162387lTQJhXe8S0.png](https://ithelp.ithome.com.tw/upload/images/20250922/20162387lTQJhXe8S0.png)
4. 因為時間不夠直接盲猜下面的位置，結果猜錯了XD
    ![https://ithelp.ithome.com.tw/upload/images/20250922/20162387WAb5JjTs7x.png](https://ithelp.ithome.com.tw/upload/images/20250922/20162387WAb5JjTs7x.png)
5. 沒關係即使題目結束了我們還是可以自己繼續搜查，目前剩下這兩個地方要排查
    ![https://ithelp.ithome.com.tw/upload/images/20250922/20162387o1wcaC44ty.png](https://ithelp.ithome.com.tw/upload/images/20250922/20162387o1wcaC44ty.png)
6. 從我截的圖片裡面可以注意到裡面有一間很大間的麥當勞
    ![https://ithelp.ithome.com.tw/upload/images/20250922/20162387XPx1hOWw4Y.png](https://ithelp.ithome.com.tw/upload/images/20250922/20162387XPx1hOWw4Y.png)
7. 所以我們直接在這兩條路上搜尋麥當勞，在墨爾本的 McKillop St 看到了這樣一個畫面
    ![https://ithelp.ithome.com.tw/upload/images/20250922/201623874Z7WLlRyka.png](https://ithelp.ithome.com.tw/upload/images/20250922/201623874Z7WLlRyka.png)
8. 直接丟出我們可愛的小黃人，就會看到跟最一開始截圖上一模一樣的街景畫面了
    ![https://ithelp.ithome.com.tw/upload/images/20250922/20162387apTrgGt6KJ.png](https://ithelp.ithome.com.tw/upload/images/20250922/20162387apTrgGt6KJ.png)
9. 沒錯我們成功了！

## 總結

GeoGuessr 是個很有趣的遊戲化 OSINT 平台，但裡面的題目難度有些非常高(完全沒有任何街道名稱或建築物，只有路和山之類的)，有些像剛剛這題一樣輕鬆有趣，有興趣的人推薦可以玩玩看這個遊戲喔~

# 參考資料

- [GeoGuessr](https://en.wikipedia.org/wiki/GeoGuessr)