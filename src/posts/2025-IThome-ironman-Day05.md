---
title: 藍隊星星的數位鑑識筆記 Day.5 檔案識別（一）Hex 
date: 2025-09-19
description: 本篇文章主要會介紹各種我所知道在做數位鑑識題目時可能會用到的工具，介紹完工具之後也會做一些題目。
tags: [IThome ironman, Blue Team]
categories: [Security]
draft: false
---

# 正文

## 前言

在上一篇文章中，我們介紹了 file 和 binwalk 可以協助我們識別檔案類別，其實這兩個工具他們都是從檔案背後的二進制編碼去判斷檔案類型的，那接下來我們一起來看看這些編碼有甚麼酷酷的資訊吧！

## 如何查看檔案編碼

首先，我們先隨意地準備一張圖片作為我們的範例：
![https://ithelp.ithome.com.tw/upload/images/20250919/20162387bPgHt7p7Yz.jpg](https://ithelp.ithome.com.tw/upload/images/20250919/20162387bPgHt7p7Yz.jpg)

### VS code

1. 安裝 [Visual Studio Code](https://code.visualstudio.com/)
2. 安裝 [Hex Editor](https://marketplace.visualstudio.com/items?itemName=ms-vscode.hexeditor)
    ![https://ithelp.ithome.com.tw/upload/images/20250919/20162387UCIF8I6Yov.png](https://ithelp.ithome.com.tw/upload/images/20250919/20162387UCIF8I6Yov.png)
3. 用 vs code 打開圖片
    ![https://ithelp.ithome.com.tw/upload/images/20250919/20162387PI291q4ulo.png](https://ithelp.ithome.com.tw/upload/images/20250919/20162387PI291q4ulo.png)
4. 對圖片的名字點擊右鍵，選擇 Reopen Editor With… 將檔案用其他方式打開
    ![https://ithelp.ithome.com.tw/upload/images/20250919/20162387pkj71g1q90.png](https://ithelp.ithome.com.tw/upload/images/20250919/20162387pkj71g1q90.png)
5. 選擇用剛剛安裝好的 Hex Editor 打開檔案
    ![https://ithelp.ithome.com.tw/upload/images/20250919/20162387cMbqhTpdoW.png](https://ithelp.ithome.com.tw/upload/images/20250919/20162387cMbqhTpdoW.png)
6. 就會顯示出檔案的十六編碼囉！
    ![https://ithelp.ithome.com.tw/upload/images/20250919/20162387JrVsOvtBUv.png](https://ithelp.ithome.com.tw/upload/images/20250919/20162387JrVsOvtBUv.png)
    

### od

可以透過不同參數顯示不同進制的檔案編碼。

- 基本指令格式：
    ```bash
    od -<參數> <檔案名稱>
    ```
- 參數：
    ```bash
    -d 十進制
    -o 八進制(預設)
    -x 十六進制
    ```
    

### hexdump

以十六進制的方式顯示檔案編碼。

- 基本指令格式：
    ```bash
    hexdump -<參數> <檔案名稱>
    ```
- 參數：
    ```bash
    -C 同時輸出十六進制以及 ASCII
    ```
- 其他參數：
    ```bash
    hexdump -n<輸出長度> <檔案名稱>
    hexdump -s<偏移量> <檔案名稱>
    ```

## 總結

這三種方式可以根據自己的需求使用，如果只是單純想要很快速的查看編碼(懶得開虛擬機之類的)，那就直接用 vs code，那在 Linux 環境下我比較常用 `hexdump -C` ，十六進制加上 ASCII 有時可以更快的看懂一些東西，所以推薦給大家~那今天的小練習就是讓大家自己去玩看看這兩個指令，不一定要用圖片也可以用其他類型的檔案玩看看喔！

# 參考資料

- [linux查看二进制文件的两种方法](https://blog.csdn.net/weixin_43455581/article/details/116669640)