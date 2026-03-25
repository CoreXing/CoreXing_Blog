---
title: 藍隊星星的數位鑑識筆記 Day.4 新手套包之超萬用工具和技巧 
date: 2025-09-18
description: 本篇文章主要會介紹各種我所知道在做數位鑑識題目時可能會用到的工具，介紹完工具之後也會做一些題目。
tags: [IThome ironman, Blue Team]
categories: [Security]
draft: false
---

# 正文

## 前言

本篇文章會先帶一些剛入門數位鑑識最常會用到的一些工具、指令，最後也會帶著大家做題目。我的作業系統環境是 Kali linux 2025.1，基本上一般的 Kali 都已經安裝好下面會使用到的指令，但如果大家想要用其他的環境也可以，只是指令可能要自己去安裝。

## file

依靠檔案二進制編碼的開頭(magic number)來判別檔案類型。(使用這個工具能夠很基本的得知檔案類型，但有些檔案可能有損毀或是被處理過，所以用 file 判別會不夠嚴謹，會建議用 binwalk)

- 識別檔案：
    ```bash
    file <檔案名稱>
    ```
    

## binwalk

一種用於分析二進制檔案的工具。它可以識別、提取和分析二進制文件中的內容，包括嵌入在韌體、映像檔、壓縮檔案等中的數據。常用於滲透測試、數位鑑識、韌體分析和反向工程等領域。

- 識別檔案：通常直接輸入 ，就可以看看檔案裡面有沒有甚麼酷東西了
    ```bash
    binwalk <檔案名稱>
    ```
    
- 提取檔案：
    ```bash
    binwalk -e <檔案名稱>
    ```
    

## exiftool

一種開源工具，用來讀寫檔案的 metadata。

- 讀取檔案的 metadata：
    ```bash
    exiftool <檔案名稱>
    ```
    
- 修改檔案的 metadata：
    ```bash
    exiftool -<name>=<value> <檔案名稱>
    ```
    
**補充：**
- metadata：提供關於這個資料更詳細的資料內容(屬性或特徵等等)
- Exif：可交換圖檔格式(Exchangeable Image File Format)，是一種數位相機所儲存的影像中繼資料格式。EXIF 資料可以被儲存在各種影像檔案格式中，它可以幫助使用者更好地管理和整理照片。

## 解題練習

歡迎來到快樂的解題練習，大家可以點開連結自己先去試試看，如果真的卡關了，再去看 writeup 喔！

1. [picoCTF Matryoshka doll](https://play.picoctf.org/practice/challenge/129?category=4&page=1&search=doll&solved=0)
    ![https://ithelp.ithome.com.tw/upload/images/20250918/20162387tZYlgS0mMx.png](https://ithelp.ithome.com.tw/upload/images/20250918/20162387tZYlgS0mMx.png)
2. [picoCTF CanYouSee](https://play.picoctf.org/practice/challenge/408?category=4&page=1&solved=0)
    ![https://ithelp.ithome.com.tw/upload/images/20250918/20162387alNmJ2PZAM.png](https://ithelp.ithome.com.tw/upload/images/20250918/20162387alNmJ2PZAM.png)
    

## 總結

今天介紹了一些常用的工具們，相信只要有在打 CTF 的人，應該或多或少都用過這些指令，因為真的太好用了！只要會這三個指令，最最基礎的數位鑑識都可以直接秒殺掉~
下一篇會介紹其他也是相當常用到的鑑識技巧~

# 參考資料

- [Linux file命令](https://www.runoob.com/linux/linux-comm-file.html)
- [手動修改相片EXIF資訊的好幫手：ExifTool簡易教學](https://www.glynliu.com/2015/07/simple-instruction-of-exiftool.html)
- [ExifTool完全入门指南](https://www.rmnof.com/article/exiftool-introduction/)