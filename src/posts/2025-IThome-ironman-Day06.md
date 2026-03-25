---
title: 藍隊星星的數位鑑識筆記 Day.6 檔案識別（二）magic number
date: 2025-09-20
description: 本篇文章主要會介紹各種我所知道在做數位鑑識題目時可能會用到的工具，介紹完工具之後也會做一些題目。
tags: [IThome ironman, Blue Team]
categories: [Security]
draft: false
---

# 正文
## 前言

在上一篇文章中，我們介紹了三種查看檔案二進制編碼的方式，不知道大家有沒有自己玩玩看~那接下來我們終於要來知道編碼裡面究竟藏有甚麼有趣的資訊了。

## 透過 magic number 得知檔案類型

1. 先打開檔案的編碼，先看到 cat.jpg 的開頭是 `FF D8`
    ![https://ithelp.ithome.com.tw/upload/images/20250920/20162387mUAasw0uI5.png](https://ithelp.ithome.com.tw/upload/images/20250920/20162387mUAasw0uI5.png)
2. 用這個開頭去跟以下連結的表格做比對
    - https://gist.github.com/leommoore/f9e57ba2aa4bf197ebc5
    - https://asecuritysite.com/forensics/magic
3. 會注意到只要是 .jpg 格式的檔案都是 FFD8 開頭的
    ![https://ithelp.ithome.com.tw/upload/images/20250920/20162387SrXWIOpHOj.png](https://ithelp.ithome.com.tw/upload/images/20250920/20162387SrXWIOpHOj.png)
    

**補充**
像 file 這個指令其實他判斷檔案類型的方式，其實就是做以上的三個步驟。透過檔案開頭的 magic number 去看已知的資料庫做比對，就能知道檔案的類型！

## 常見檔案結構

除了 magic number 之外，其實不同的檔案類型在 magic number 後都會在藏一些資訊，那因為篇幅的關係就先列兩個有趣的結構。(有時這些資訊可能會遭到竄改或損毀而導致檔案無法正常開始)

- PNG
    - 8 位元組的開頭(89 50 4E 47 0D 0A 1A 0A)
    - 4 位元組的 IHDR 區塊長度
    - 4 位元組的 IHDR 資料塊類型碼
    - 4 位元組的寬度
    - 4 位元組的長度
    - 1 位元組的圖像深度
- ZIP
    - 4 位元組的開頭(50 4B 03 04)
    - 2 位元組的解壓縮版本
    - 2 位元組的標誌
    - 2 位元組的壓縮方式
    - 2 位元組的文件最後修改時間
    - 2 位元組的文件最後修改日期
    - 4 位元組的 CRC-32 校驗
    - 4 位元組的壓縮後大小
    - 4 位元組的壓縮前大小

## 其他小技巧

1. 技巧一：在使用 od 和 hexdump 查看 magic number 時，可以在指令後面加上 `| head`，這樣就只會顯示開頭的部分編碼，terminal 上才不會跳出一堆編碼。
2. 技巧二：在使用 od 和 hexdump 時，可以在指令後面加上 `| less` ，透過滾動的方式慢慢查看編碼裡面有沒有查甚麼資訊。
3. 技巧三：在尋找重要資訊時，`grep` 真的很有用，大家多用一點。

## 解題練習

歡迎來到快樂的解題練習，大家可以點開連結自己先去試試看，如果真的卡關了，再去看 writeup 喔！

1. [picoCTF Glory of the Garden](https://play.picoctf.org/practice/challenge/44?category=4&page=1&search=&solved=0)
    ![https://ithelp.ithome.com.tw/upload/images/20250920/20162387tpyC6Ng40e.png](https://ithelp.ithome.com.tw/upload/images/20250920/20162387tpyC6Ng40e.png)
    

## 總結

相信學會了這些技巧後，上面的練習題對大家來說一定小蛋糕的啦！

其實在這部分，我自己比較是抱持著打題目時遇到了再來煩惱的態度，所以或許可能在未來這篇文章還有更新的機會，假設我有遇到有趣的題目，然後有新的研究，再來我有想到要更新到這裡XD。

# 參考資料

- [**PNG**](https://zh.wikipedia.org/zh-tw/PNG)
- [PNG文件结构分析](https://blog.csdn.net/qq_60131542/article/details/123450382)
- [ZIP文件结构解析](https://goodapple.top/archives/700)