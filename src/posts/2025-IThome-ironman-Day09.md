---
title: 藍隊星星的數位鑑識筆記 Day.9 隱寫術 Steganography（一）介紹
date: 2025-09-23
description: 本篇文章主要會介紹各種我所知道在做數位鑑識題目時可能會用到的工具，介紹完工具之後也會做一些題目。
tags: [IThome ironman, Blue Team]
categories: [Security]
draft: false
---

# 正文
## 前言

介紹完 OSINT 後，接著要來介紹在鑑識裡面很常遇到的一種類型——隱寫術！
~~本篇文章沒有任何吸血鬼受到傷害，請安心閱讀（？~~

## 隱寫術介紹

隱寫術（Steganography）：是一種將資料隱藏起來的技術。被隱寫以及寫入的檔案可以是圖片、音樂、影片等等的類型。

隱寫術的英文是 Steganography，源於 1499 年 Johannes Trithemius 用希臘語寫的書〈Steganographia〉，雖然原作內容好像是透過召喚天使來傳遞訊息的方法，並融合複雜的神秘符號和早期密碼學；但核心重點還是要隱密的（Steganos）書寫（graphia）。

## 隱寫術 vs 密碼學

有些人會認為隱寫術是密碼學的一種，但其實他們有一個很大的差別**是否改變訊息的結構**。
|  | 隱寫術 | 密碼學 |
| --- | --- | --- |
| 目的 | 隱藏訊息不被人知道 | 隱藏訊息不被人知道 |
| 訊息外觀 | 訊息的外觀看起來正常，但不容易被發現 | 訊息結構整個被改變，無法直接閱讀（需要解密） |
| 處理方式 | 訊息被隱藏在其他資料中 | 訊息被轉換成無法理解的密文 |

## 隱寫術分類

- 圖片隱寫（Image Steganography）
    - 工具：Steghide、OpenStego、OutGuess、Stegdetect
- 文件隱寫（Document Steganography）
    - 工具：StegoStick、StegJ
- 影片隱寫（Video Steganography）
    - 工具：OmniHide、StegoStick、OpenPuff
- 聲音隱寫（Audio Steganography）
    - 工具：Audacity、WavSteg、DeepSound、Steghide

## 總結

今天很簡單的介紹了一下隱寫術，之後幾天會針對隱寫術的分類來寫~剛好昨天看到了 3301 的故事，感覺很適合放在明天講，總之我會試試看的。

# 參考資料

- [隱寫術]([https://zh.wikipedia.org/zh-tw/隐写术](https://zh.wikipedia.org/zh-tw/%E9%9A%90%E5%86%99%E6%9C%AF))
- [Day 5 資安忍術之隱寫術 Steganography(一)](https://ithelp.ithome.com.tw/m/articles/10323318)
- [【Day21】隱寫技術 Steganography](https://ithelp.ithome.com.tw/articles/10278407)
- [Steganographia]([https://www.facebook.com/landofshaman/posts/隱寫術steganographia出自德國神秘學大師和神學家johannes-trithemius-他於1492年成為sponheim-abbey修道院的天主教/755341656611716/](https://www.facebook.com/landofshaman/posts/%E9%9A%B1%E5%AF%AB%E8%A1%93steganographia%E5%87%BA%E8%87%AA%E5%BE%B7%E5%9C%8B%E7%A5%9E%E7%A7%98%E5%AD%B8%E5%A4%A7%E5%B8%AB%E5%92%8C%E7%A5%9E%E5%AD%B8%E5%AE%B6johannes-trithemius-%E4%BB%96%E6%96%BC1492%E5%B9%B4%E6%88%90%E7%82%BAsponheim-abbey%E4%BF%AE%E9%81%93%E9%99%A2%E7%9A%84%E5%A4%A9%E4%B8%BB%E6%95%99/755341656611716/))