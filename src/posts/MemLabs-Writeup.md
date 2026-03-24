---
title: MemLabs Writeup
date: 2025-02-23
description: 這是一個開源的 Memory Forensics 練習挑戰。
tags: [Writeup, Memory Forensics]
categories: [Security]
draft: false
---

## About CTF
- 題目來源：[Github - MemLabs](https://github.com/stuxnet999/MemLabs/tree/master)
- 題目類型：記憶體鑑識(Memory Forensics)

## About Memory Forensics
- 說明：一種數位鑑識技術，主要針對揮發性記憶體(Volatile Memory)做證據擷取
- 用途：
    - 駭客攻擊調查
    - 惡意軟體偵測
    - 還原特定類型的資料
- 工具：
    - Volatility (免費使用)
    - AccessData FTK Imager (免費使用)
    - Bulk Extractor (免費使用)
    - Magnet AXIOM (需付費使用)

:::danger
目標取證主機在做取證前**盡量**不要切斷電源，以免揮發性記憶體資料消失
:::

## Lab0 Never Too Late Mister
:::info
My friend John is an "environmental" activist and a humanitarian. He hated the ideology of Thanos from the Avengers: Infinity War. He sucks at programming. He used too many variables while writing any program. One day, John gave me a memory dump and asked me to find out what he was doing while he took the dump. Can you figure it out for me?
我的朋友約翰是一位「環境」活動家和人道主義者。他討厭《復仇者聯盟：無限之戰》中薩諾斯的意識形態。他不擅長程式設計。他在編寫任何程式時使用了太多變數。有一天，約翰給了我一個記憶體轉儲，並要求我找出他在轉儲時在做什麼。你能幫我想一下嗎？

Challenge file: [Google drive](https://drive.google.com/file/d/1MjMGRiPzweCOdikO3DTaVfbdBK5kyynT/view)
:::

## Lab1 Beginner's Luck
:::info
My sister's computer crashed. We were very fortunate to recover this memory dump. Your job is get all her important files from the system. From what we remember, we suddenly saw a black window pop up with some thing being executed. When the crash happened, she was trying to draw something. Thats all we remember from the time of crash.
我姊姊的電腦壞了。我們非常幸運地恢復了這個記憶體轉儲。你的工作是從系統中取得她所有的重要文件。根據我們的記憶，我們突然看到一個黑色的窗口彈出，其中有一些東西正在執行。Crash 發生時，她正試著畫點什麼。這就是我們從 crash 發生後所記得的一切。

Note: This challenge is composed of 3 flags.

Challenge file: [MemLabs_Lab1](https://mega.nz/#!6l4BhKIb!l8ATZoliB_ULlvlkESwkPiXAETJEF7p91Gf9CWuQI70)
:::

### 解題
1. 取得設定檔內容 `vol.py -f ../MemoryDump_Lab1.raw imageinfo`
    ![圖片](https://hackmd.io/_uploads/r1xRSdB91l.png)
2. 查看開啟中或是運行中的 process `vol.py -f ../MemoryDump_Lab1.raw --profile=Win7SP1x64 pslist`
    ![圖片](https://hackmd.io/_uploads/HykOUdr91l.png)
3. 我問了 ChatGPT 這些 process 裡面有哪些是較為可疑的，以下是他的回答，而我接下來會針對這些 process 逐一檢查
    - cmd.exe
    - DumpIt.exe
    - WinRAR.exe
    - mspaint.exe
    - SearchIndexer.exe
    - SearchProtocolHost.exe
4. 首先是 cmd.exe，照著 Lab0 的作法，先用 `vol.py -f ../MemoryDump_Lab1.raw --profile=Win7SP1x64 cmdscan` 看一下 Terminal 紀錄
    ![圖片](https://hackmd.io/_uploads/BkLrtdB9Jg.png)
5. 沒特別看到甚麼奇怪的內容，再用 `vol.py -f ../MemoryDump_Lab1.raw --profile=Win7SP1x64 consoles` 看一下 console 紀錄
    ![圖片](https://hackmd.io/_uploads/B117iOrqye.png)
6. 在裡面看到了一組 base64 的字串
    ![圖片](https://hackmd.io/_uploads/rJJIiOSq1l.png)
7. 直接拿去[解碼](https://www.base64decode.org/)，就得到了第一個 flag
    :::success
    flag{th1s_1s_th3_1st_st4g3!!}
    :::
8. 第二個檢查 DumpIt.exe，但因為從剛剛的 consoles 紀錄好像可以看到一些內容
    ![圖片](https://hackmd.io/_uploads/By2S3dHqJe.png)
9. ChatGPT 說可以試試看 `vol.py -f ../MemoryDump_Lab1.raw --profile=Win7SP1x64 pstree`
    ![圖片](https://hackmd.io/_uploads/HkYb3n89yx.png)
10. 從這些可以拿到 DumpIt.exe 的 PID，再輸入 `vol.py -f ../MemoryDump_Lab1.raw --profile=Win7SP1x64 handles -p 796` 檢查是否開啟了記憶體檔案
    ![圖片](https://hackmd.io/_uploads/HJA5n2851e.png)
11. 到這邊已經有點沒想法怎麼繼續下去了，所以先跳第三個 WinRAR.exe
12. 這些直接用 ChatGPT 給的指令下去查看看 `vol.py -f ../MemoryDump_Lab1.raw --profile=Win7SP1x64 cmdline | grep -i winrar`
    ![圖片](https://hackmd.io/_uploads/r1-tpnL5yg.png)
13. 在查 cmdline 的功能時，剛好在一篇文章中看到一些範例指令
    ![圖片](https://hackmd.io/_uploads/r1HR03Lqyl.png)
14. 試著用 filescan 查剛剛看到的檔案 `vol.py -f ../MemoryDump_Lab1.raw --profile=Win7SP1x64 filescan | grep Important.rar`
    ![圖片](https://hackmd.io/_uploads/ryeMypI9Je.png)
15. 先用 dumpfiles 看第一個檔案 `vol.py -f ../MemoryDump_Lab1.raw --profile=Win7SP1x64 dumpfiles -Q 0x000000003fa3ebc0 -D ./`
    ![圖片](https://hackmd.io/_uploads/rykf-aLcyl.png)
16. 查了一下文章發現 dumpfiles 是把檔案轉儲到自己的電腦上，所以打開目錄，目錄中出現了一個 file.None.0xfffffa8001034450.dat
    ![圖片](https://hackmd.io/_uploads/By00Z68cJg.png)
17. 把檔案改名並且轉換成正確的檔案格式
    ![圖片](https://hackmd.io/_uploads/SkIQGpI9yx.png)
18. 打開 rar 檔，看到一個上鎖的 flag3.png
    ![圖片](https://hackmd.io/_uploads/ryK8fpI51l.png)
19. 嘗試用 John the ripper 沒有把密碼爆破出來
    ![圖片](https://hackmd.io/_uploads/rJCB4T89ke.png)
20. 意外地在想要用 rar 指令試試能不能直接解壓縮的時候看到了一個內容
    ![圖片](https://hackmd.io/_uploads/By-dB6Icke.png)
21. 聽 ChatGPT 說這次用 hashdump 看看系統的帳號 Hash `vol.py -f ../MemoryDump_Lab1.raw --profile=Win7SP1x64 hashdump`
    ![圖片](https://hackmd.io/_uploads/rJSvYT8c1g.png)
22. 看到了一串跟 Alissa 有關的 hash 值，將 f4ff64c8baac57d22f22edc681055ba6 直接輸入進去發現不對！？再看了一次上面的提示發現要轉成大寫 F4FF64C8BAAC57D22F22EDC681055BA6，再次輸入就成功了
    ![圖片](https://hackmd.io/_uploads/rJBfs6LcJl.png)
23. flag3：
    :::success
    flag{w3ll_3rd_stage_was_easy}
    :::
24. 再來是檢查第四個 mspaint.exe，上網查了一下這個就是小畫家，跟題目「Crash 發生時，她正試著畫點什麼。」好像有點關聯，照著剛剛轉儲 important.rar 的方式把 mspaint.exe 轉儲下來後，發現開不起來
    ![圖片](https://hackmd.io/_uploads/BJmEvzwc1g.png)
25. 照著 ChatGPT 說看看 mspaint.exe 有沒有甚麼跟圖片有關的檔案 `vol.py -f ../MemoryDump_Lab1.raw --profile=Win7SP1x64 handles -p 2424 | grep -i "png\|jpg\|bmp`，但甚麼都沒找到
    ![圖片](https://hackmd.io/_uploads/HkksEQvqJx.png)
26. 再試試 `vol.py -f ../MemoryDump_Lab1.raw --profile=Win7SP1x64 memdump -p 2424 -D .`，然後用 `strings -a -td 2424.dmp | grep -E "PNG|JFIF|BMP"`
    ![圖片](https://hackmd.io/_uploads/ByswrQv5yg.png)
27. 接著用 `dd if=2424.dmp of=recovered_image.png bs=1 skip=188919136` 嘗試提取 BMF_PNG 的圖片數據(看起來比較可疑)，但也沒有出現甚麼圖片
    ![圖片](https://hackmd.io/_uploads/r1smwmDckg.png)
28. 為了能正確的開啟 2424.dmp，所以我用 file 看了一下他的檔案格式，發現是 data，所以在改副檔名後嘗試執行看看，但還是因為格式無法執行
    ![圖片](https://hackmd.io/_uploads/HkRQOmvqke.png)
29. 我找到了一篇[文章](https://worktile.com/kb/ask/317583.html)上面都是與圖片相關的指令，就每個都試試看
    - `eog 2424.data`：無法載入圖片
    - `display 2424.data`：no decode delegate for this image format
    - `convert 2424.data 2424.jpg`：no decode delegate for this image format、no images defined `2424.jpg'
    - `identify 2424.data`：no decode delegate for this image format
    - `exiftool 2424.data`：看起來沒有重要資訊
        ![圖片](https://hackmd.io/_uploads/S1Wg5mv51g.png)
    - `mogrify -format png 2424.data`：no decode delegate for this image format
    - `gimp 2424.data`：圖片好像被成功打開了，但甚麼都沒看到
        ![圖片](https://hackmd.io/_uploads/SyaFcXv51x.png)
30. 好像沒辦法直接放大，所以嘗試調整高度和寬度，大概調到寬度 2000、高度 1000 圖片底部出現了一大塊白色
    ![圖片](https://hackmd.io/_uploads/SJOMoQPcyl.png)
31. 繼續增加寬度到 2700 左右好像漸漸出現符號了，但還是很不清楚
    ![圖片](https://hackmd.io/_uploads/SyGwoXDqkg.png)
32. 寬度增加到 3200 左右好像有類似 flag 的字樣出來了(有大誇號 {})
    ![圖片](https://hackmd.io/_uploads/Sy2b3Xwq1g.png)
33. 把現在的畫面截圖下來丟到小畫家翻轉圖片
    ![圖片](https://hackmd.io/_uploads/rkkYnmvckl.png)
34. flag2：
    :::success
    flag{Good_BoY_good_girL}
    :::


### Flag
1. flag{th1s_1s_th3_1st_st4g3!!}
2. flag{w3ll_3rd_stage_was_easy}
3. flag{Good_BoY_good_girL}

## Lab3 The Evil's Den
:::info
A malicious script encrypted a very secret piece of information I had on my system. Can you recover the information for me please?
惡意腳本加密了我系統上的一條非常秘密的訊息。您能幫我恢復資訊嗎？

Note-1: This challenge is composed of only 1 flag. The flag split into 2 parts.

Note-2: You'll need the first half of the flag to get the second.

You will need this additional tool to solve the challenge,
```
$ sudo apt install steghide
```
The flag format for this lab is: inctf{s0me_l33t_Str1ng}

Challenge file: [MemLabs_Lab3](https://mega.nz/#!2ohlTAzL!1T5iGzhUWdn88zS1yrDJA06yUouZxC-VstzXFSRuzVg)
:::
### [Steghide](https://hackmd.io/ktbB44ZDSU6cn-EglPsp0g?view#Steghide)
Steghide 是一種隱寫技術(Steganography)的工具，可以將資訊隱藏在圖片或音檔中。

>[!Tip] 隱寫技術(Steganography)
將資訊以明文/密文的方式，隱藏在圖片、文字、音頻或影片等之類的檔案中的技術。時常被應用在惡意行為上。

### 解題
1. 取得設定檔內容 `vol.py -f ../MemoryDump_Lab3.raw imageinfo`
    ![圖片](https://hackmd.io/_uploads/ByR6WLu9ke.png)
2. 查看開啟中或是運行中的 process `vol.py -f ../MemoryDump_Lab3.raw --profile=Win7SP1x86_23418 pslist`
    ![圖片](https://hackmd.io/_uploads/HJJSML_5yx.png)
3. 裡面有 notepad.exe 在執行中，嘗試用 `vol.py -f ../MemoryDump_Lab3.raw --profile=Win7SP1x86 cmdline | grep -i notepad` 找到相關的檔案
    ![圖片](https://hackmd.io/_uploads/HJ82t8_ckl.png)
4. 看到了兩個超級可疑的檔案，嘗試把他們 dump 下來
    ![圖片](https://hackmd.io/_uploads/Sk6acUOq1x.png)
5. 把檔案改名
    ![圖片](https://hackmd.io/_uploads/SJZenIucyx.png)
6. 先打開惡意腳本的程式碼 evilscript.py 看看裡面做了甚麼，這個程式碼會把輸出進行 xor 和 base64 後寫入 vip.txt
    ![圖片](https://hackmd.io/_uploads/ByXE2Lu91e.png)
7. 再打開 vip.txt，很明顯的就是一個經過 base64 的字串
    ![圖片](https://hackmd.io/_uploads/B1Uk0IuqJe.png)
8. 寫一個程式碼將惡意腳本的逆過來
    ``` python
    import string
    import base64

    def xor(s):

        a = ''.join(chr(ord(i)^3) for i in s)
        return a


    def decoder(x):
        base64_bytes = x.encode("ascii")
        sample_string_bytes = base64.b64decode(base64_bytes)

        return sample_string_bytes.decode("ascii")


    if __name__ == "__main__":

        c = "am1gd2V4M20wXGs3b2U="

        c = xor(decoder(c))

        print(c)
    ```
9. 執行程式碼，就看到了 flag 的前半段
    ![圖片](https://hackmd.io/_uploads/SkanxPOqyg.png)
10. 剩下 flag 的後半部了，因為題目有提示需要用到隱寫術，所以盲猜後半部的 flag 藏在圖片裡面，用 filescan 掃描所有圖片相關的檔案 `vol.py -f ../MemoryDump_Lab3.raw --profile=Win7SP1x86 filescan | grep -i ".png\|.jpg\|.jpeg\|.bmp"`
    ![圖片](https://hackmd.io/_uploads/BJS4XPd9yx.png)
    ![圖片](https://hackmd.io/_uploads/rylwmw_cJe.png)
11. 檔案很多，但裡面有幾個檔案感覺比較突兀，加上第一個檔案叫 suspision1.jpeg，檔名有點像懷疑(suspicion)，所以一樣先把它 dump 下來
    ![圖片](https://hackmd.io/_uploads/Bkt24P_q1l.png)
12. 點開來是一張普通的照片
    ![圖片](https://hackmd.io/_uploads/HkEerDdckg.png)
13. 先用 `Steghide info ../suspision1.jpeg` 看看圖片的資訊，發現需要密碼
    ![圖片](https://hackmd.io/_uploads/ryIxLv_5ye.png)
14. 題目提示有說到需要 flag 的前半部才能得到後半部，所以直接輸入 flag 的前半部 `steghide info ../suspision1.jpeg -p inctf{0n3_h4lf`
    ![圖片](https://hackmd.io/_uploads/HkYULPu9Jg.png)
15. 裡面藏著一個祕密的文字檔，把它提取出來 `steghide extract -sf ../suspision1.jpeg -p inctf{0n3_h4lf`
    ![圖片](https://hackmd.io/_uploads/SkxfwPOcJx.png)
16. flag：
    :::success
    inctf{0n3_h4lf_1s_n0t_3n0ugh}
    :::

## Reference
- [資安由淺入深 【Day21】隱寫技術 Steganography](https://ithelp.ithome.com.tw/articles/10278407)
- [資安由淺入深 【Day22】隱寫技術 ─ 工具實作篇(一)](https://ithelp.ithome.com.tw/m/articles/10278964)
- [内存取证-volatility工具的使用 （史上更全教程，更全命令）](https://blog.csdn.net/m0_68012373/article/details/127419463)
- [Retrieving Files From Memory Dump. 從記憶體轉儲中檢索檔。](https://whiteheart0.medium.com/retrieving-files-from-memory-dump-34d9fa573033)
- [kalilinux图片命令](https://worktile.com/kb/ask/317583.html)