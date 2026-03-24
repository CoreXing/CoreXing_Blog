---
title: 2023 AIS3 Pre-Exam Writeup
date: 2023-06-02
description: 這是一篇臨時趕出來的 Writeup，內容可能非常的不詳細。
tags: [AIS3, Writeup]
categories: [Security]
draft: false
---

## Intro
哈囉~我是星星，因為是在繳交 Writeup 的截止日當天寫的，所以寫得很趕而且沒有很詳細！我會努力把明年 2024 Writeup 寫的更好，敬請期待OuO。

這邊附上[AIS3網址](https://ais3.org/)，歡迎大家一起來玩！

PS.雖然只解了四題，但還是意外正取「2023 AIS3 新型態資安實務暑期課程」，另外也感謝我的隊友讓我拿到今年 Web 組的最佳專題獎
## Misc
### Welcome
* 下載welcome.pdf
* 可以發現檔案有45頁
![](https://hackmd.io/_uploads/HJjgBInSn.png)
* 一直往下滑就可以字母和符號，組起來就是Flag
### Robot
* 連線後，會看到很多數學題
* 寫一個python程式計算答案
* 所有數學題解答後，就會拿到Flag

## Web
### Login Panel
![](https://hackmd.io/_uploads/HkF8KUnSh.png)
* SQL injection進入第二個頁面
* 用guest登入取得第三個頁面的網址
* 用admin登入並直接貼上網址繞過第二頁的2FACode，就會拿到Flag
### E-Portfolio baby
![](https://hackmd.io/_uploads/rJnmF82rn.png)
* XSS取得整包使用者資料
* 丟到webhook上取出資料