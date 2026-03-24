---
title: 2025 AIS3 Pre-Exam Writeup
date: 2025-06-04
description: 這是我第四次報名 AIS3 的 Pre-exam 所撰寫的 Writeup，近年的題目都越來越難了QQ。
tags: [AIS3, Writeup]
categories: [Security]
draft: false
---

## Intro
### About me
大家早安~我是星星，又經歷了一次快樂的 Pre-exam，還順便解鎖了在客運上刷題目的成就，還好沒有暈爆，可喜可賀！！
第四次的 Pre-exam，真的可以感覺到每年都越來越難，特別是今年 Crypto 的題目，難度寫著簡單但我卻解了好幾個小時，然後還只有解出一題，最糟糕的是解到最後還被 ChatGPT 搞；不過好消息是這次 Reverse 解了好多題，感謝偉大的大恐龍(Ghidra)。
今年也成功錄取了 「2025 AIS3 新型態資安實務暑期課程」的 CTF 組

![圖片](https://hackmd.io/_uploads/H13oEsNMex.png)

### Environment and tools
- 環境：
    - Windows11
    - Linux kali 6.1.0-kali5-amd64
- 工具：
    - Ghidra (逆向分析)
    - Burp Suite (Web安全測試)
    - VS code (程式編輯器)
    - ChatGPT(AI 意見諮詢師)

## Misc
### Welcome
:::info
Copy & Paste ?
You don't know how to copy & paste ???
Let me teach you : Ctrl + c & Ctrl + v 😮‍💨😮‍💨😮‍💨

![圖片](https://hackmd.io/_uploads/ByK6QE7flx.png)

Author : Curious
:::
1. 發現複製不了文字，直接丟給 ChatGPT，請他幫我辨識
2. Flag：
    :::success
    AIS3{Welcome_And_Enjoy_The_CTF_!}
    :::

### Ramen CTF
:::info
我在吃 CTF，喔不對，拉麵，但我忘記我在哪間店吃了．．．，請幫我找出來
(P.S. FlagFormat: AIS3{google map 上的店家名稱:我點的品項在菜單上的名稱})

![chal](https://hackmd.io/_uploads/Hkv3JEmMeg.jpg)

Author: whale120
:::
1. 看到照片直接鎖定右邊的發票
2. 截圖發票然後丟給 ChatGPT，非常快樂的得到了完整的統編
    ![圖片](https://hackmd.io/_uploads/Hyppg4mMxe.png)
3. 接著用統編去 Google 搜尋，就可以知道公司名稱叫作平和溫泉拉麵店(和發票上的平和兩個字對上了)
    ![圖片](https://hackmd.io/_uploads/BJhgbNXflg.png)
4. 用這個名字去 Google 地圖上搜尋，但沒有搜尋到拉麵店
5. 點進[台灣公司網](https://www.twincn.com/item.aspx?no=34785923)，得到了公司地址
    ![圖片](https://hackmd.io/_uploads/Sy9_bNQGle.png)
6. 直接用這個地址去看 Google 地圖，可以發現附近有一間叫做樂山溫泉拉麵的店
    ![圖片](https://hackmd.io/_uploads/HkyTbNmzxe.png)
7. 點擊後發現地址跟平和溫泉拉麵店一樣
    ![圖片](https://hackmd.io/_uploads/Sy2bzNXMel.png)
8. 接著看菜單，太多拉麵了不知道要怎麼選
    ![菜單](https://hackmd.io/_uploads/ryzCf47zxg.jpg)
9. 嘗試用財政部的發票工具掃描發票，上面只有寫消費金額是 500 元，但菜單上沒有任何食物的金額是剛好 500 元，這代表作者吃了不只一樣東西，也就是說可能有複數個答案？？？
10. 這裡我開 Ticket 去問作者，作者表示：「根據題目一定只找到的一個答案」
11. 根據作者的說法，我再看了一次題目「我在吃 CTF，喔不對，拉麵，但我忘記我在哪間店吃了．．．」首先從題目和照片裡的紅色湯匙可以確定是拉麵沒有錯，再來是題目寫吃了．．．，代表食物可能是三個字
12. 再看一次菜單，但沒有找到三個字的拉麵
13. 下意識點了搜尋框，發現有二店
    ![圖片](https://hackmd.io/_uploads/H1MUSNXMle.png)
14. 看二店的菜單發現有一種拉麵叫蝦拉麵
    ![圖片](https://hackmd.io/_uploads/BkMOr47Gex.png)
15. Flag：
    :::success
    AIS3{樂山溫泉拉麵:蝦拉麵}
    :::

### AIS3 Tiny Server - Web / Misc
:::info
From [7890/tiny-web-server](https://github.com/7890/tiny-web-server)

I am reading [Computer Systems: A Programmer's Perspective](https://csapp.cs.cmu.edu/).

It teachers me how to write a tiny web server in C.

Non-features

    No security check

The flag is at /readable_flag_somerandomstring (root directory of the server). You need to find out the flag name by yourself.

The challenge binary is the same across all AIS3 Tiny Server challenges.

Note: This is a misc (or web) challenge. Do not reverse the binary. It is for local testing only. Run ./tiny -h to see the help message. You may need to install gcc-multilib to run the binary.

Note 2: Do not use scanning tools. You don't need to scan directory.

Challenge Instancer

Warning: Instancer is not a part of the challenge, please do not attack it.

Please solve this challenge locally first then run your solver on the remote instance.

Author: pwn2ooown

:::
1. 打開容器之後看到了首頁 index.html
    ![圖片](https://hackmd.io/_uploads/r1BA8EmGll.png)
2. 根據上面的敘述，感覺也是跟 Web 的 Tomorin db 有點像，都是想辦法找到藏在後台的資料
    ![圖片](https://hackmd.io/_uploads/BktKPE7zel.png)
3. 無腦沿用 Tomorin db 用的攻擊語句 `..%2f..%2f`
    ![圖片](https://hackmd.io/_uploads/B1cg_E7zlx.png)
4. 嘗試把 index.html 刪掉，突然就出現超級可疑的東西
    ![圖片](https://hackmd.io/_uploads/H138_4XGeg.png)
5. 再加一次 `..%2f` 看到了兩個可疑的檔案
    ![圖片](https://hackmd.io/_uploads/rkc6dVQMex.png)
6. 先點了 readflag 發現網頁跳了 404
    ![圖片](https://hackmd.io/_uploads/By3Xd1EMxg.png)
7. 嘗試將目錄名稱接在網址後面，送出後下載了 readflag 的檔案
    ```
    http://chals1.ais3.org:20992/..%2f..%2f..%2freadflag
    ```
8. 接著換輸入 readable_flag_EdBPdzEJHM54hOqVfPsBYzW4VWC7KgLd 看看
    ```
    http://chals1.ais3.org:20992/..%2f..%2f..%2freadable_flag_EdBPdzEJHM54hOqVfPsBYzW4VWC7KgLd
    ```
    ![圖片](https://hackmd.io/_uploads/rJh9u1VMxx.png)
9. Flag：
    :::success
    AIS3{tInY_weB_serVeR_witH_FIl3_8ROWs1nG_@5_@_feAtURE}
    :::

:::danger
雖然不知道為甚麼，但我在打的當下直接點擊 readable_flag_EdBPdzEJHM54hOqVfPsBYzW4VWC7KgLd，Flag 就爆出來了，可能當時有 bug???
:::

## Web
### Tomorin db 🐧
:::info
I make a simple server which store some Tomorin.

Tomorin is cute ~

I also store flag in this file server, too.

Author: naup96321
:::
1. 打開網站後看到了四個頁面
    ![圖片](https://hackmd.io/_uploads/rJNI9Emflx.png)
2. 點擊 flag 發現會自動跳轉到 [Youtube](https://www.youtube.com/watch?v=lQuWN0biOBU)
3. 另外三張圖片都是普通的 MYGO
4. 因為沒想法，所以直接把題目敘述和大致的網頁內容丟給 ChatGPT，他說可以試試看枚舉網站，所以我嘗試用 dirsearch 看看有沒有甚麼有趣的網頁，但甚麼都沒有
5. 再看了一次題目「I also store flag in this file server, too.」，嘗試跟 ChatGPT 說這題的關鍵應該放在 file server
6. 它給了我一些 path traversal 的句子，但每個都試了一遍也沒用
    ```
    /../../flag.txt
    /..%2f..%2fflag.txt
    /%2e%2e/%2e%2e/flag.txt
    ```
7. 後來突然發現 `.txt` 好像沒道理，原本的網頁只有 flag 的後面沒有加任何的副檔名，所以去除 `.txt` 再試一次
    ```
    /../../flag > 跳轉
    /..%2f..%2fflag
    /%2e%2e/%2e%2e/flag > 跳轉
    ```
8. 用 `..%2f..%2fflag` 得到了 flag
    ![圖片](https://hackmd.io/_uploads/rJno3Emfgx.png)
9. Flag：
    :::success
    AIS3{G01ang_H2v3_a_c0O1_way!!!_Us3ing_C0NN3ct_M3Th07_L0l@T0m0r1n_1s_cute_D0_yo7_L0ve_t0MoRIN?}
    :::

### Login Screen 1
:::info
Welcome to my Login Screen! This is your go-to space for important announcements, upcoming events, helpful resources, and community updates. Whether you're looking for deadlines, meeting times, or opportunities to get involved, you'll find all the essential information posted here. Be sure to check back regularly to stay informed and connected!

http://login-screen.ctftime.uk:36368/

Note: The flag starts with AIS3{1.

Author: Ching367436
:::
1. 一個登入的網頁
    ![圖片](https://hackmd.io/_uploads/HkX4RNXfee.png)
2. 先登入看看 guest，進入到驗證碼的畫面
    ![圖片](https://hackmd.io/_uploads/B1ZwREmGgl.png)
3. 一樣照著輸入 `000000`，成功登入，但他說要 admin 才能拿到 flag
    ![圖片](https://hackmd.io/_uploads/HydF0E7fxe.png)
4. 登出後，隨便 SQL injection 了一下，好像不行，被說是無效帳密
5. 直接盲猜 admin 的帳密搞不好跟 guest 一樣，所以輸入 admin/admin
6. 又進到了驗證碼畫面，代表帳密應該正確，但我們不知道 admin 的驗證碼
    ![圖片](https://hackmd.io/_uploads/HJHlyHQGlx.png)
7. 打開 F12 開始逛街，發現了 cookies，先把數值記在記事本
    ![圖片](https://hackmd.io/_uploads/SkZ4kr7Mxx.png)
8. 打開 Burpsuit，攔截看看有甚麼請求
9. 嘗試對於 `2fa.php` 這個請求刪掉 code 或改 phpsessid，但都沒辦法通過驗證碼
    ![圖片](https://hackmd.io/_uploads/SyDggSmzge.png)
10. 再登入一次 guest，突然發現發出 `2fa.php` 請求後如果驗證碼正確會再送一個 `dashboard.php` 的請求，先把這個請求丟到 Repeater
    ![圖片](https://hackmd.io/_uploads/BkjBermzxg.png)
11. 接著到 Repeater，然後把剛剛存下來 admin 的 phpsessid 覆蓋上去，按下送出
    ![圖片](https://hackmd.io/_uploads/rktlWrXGlx.png)
12. Flag：
    :::success
    AIS3{1.Es55y_SQL_1nJ3ct10n_w1th_2fa_IuABDADGeP0}
    :::

:::danger
事後發現如果直接在 Proxy 上修改 phpsessid 後送出，又會跳出 2fa.php 的請求
:::

## Crypto
### Stream
:::info
I love streaming randomly online!

Author : Whale120
:::
1. 下載檔案後獲得 chal.py 和 output.txt
2. 嘗試閱讀程式碼。總之他前面會先生成一串 SHA512，然後和 256 位的隨機數做 xor，重複 80 次後再將 flag 和 256 位的隨機數做 xor
    ```python
    from random import getrandbits
    import os
    from hashlib import sha512
    from flag import flag

    def hexor(a: bytes, b: int):
        return hex(int.from_bytes(a)^b**2)

    for i in range(80):
        print(hexor(sha512(os.urandom(True)).digest(), getrandbits(256)))

    print(hexor(flag, getrandbits(256)))
    ```
3. 打開 output.txt 裡面真的有 81 筆資料，直接將所有東西丟給 ChatGPT 沒有得到任何有效的結果
4. 根據驗證發現每個 `getrandbits(256)` 所獲得的值都不一樣，所以可能只需要參考第 81 筆資料就好
5. 直接請 ChatGPT 幫我用暴力破解把 `getrandbits(256)` 的所有情況去跟 output.txt 裡的輸出做 xor，但 ChatGPT 說這樣會有 $2^{256}$ 種可能性，所以不可能用爆破的方式
    ![圖片](https://hackmd.io/_uploads/ByjAlAFfex.png)
6. 所以按現在已知的內容，我們必須知道第 81 個亂數出來的 `getrandbits(256)` 是多少，才有辦法進行解密；但**不能用暴力破解**
7. 嘗試去查看看關於 `getrandbits(256)` 的資料，第一個就看到了 python 的[官方網站](https://docs.python.org/zh-tw/3.13/library/random.html)
    ![圖片](https://hackmd.io/_uploads/r14YGCtGle.png)
8. 看到標題就想起來以前有學過現今科技所生成出來隨機數並不是真正的隨機數，可能都會有一些運算的依據之類的，像是常見的時間
9. 嘗試詢問 ChatGPT 有沒有可能可以找到這個隨機數生成的規律，它說只要有足夠多的資料就可以進行下一個隨機數預測
    ![圖片](https://hackmd.io/_uploads/BkAaLAYfxe.png)
10. 照著它給的參考程式碼去修改
    ```python
    from hashlib import sha512
    import math
    import random
    from randcrack import RandCrack

    # 讀取輸出檔案
    def read_hex_lines():
        lines = []
        with open("output.txt", 'r') as file:
            for line in file:
                lines.append(int(line.strip(), 16))

        return lines

    # 檢查是否為完美平分數
    def is_perfect_square(n):
        sqrt = math.isqrt(n)
        return sqrt * sqrt == n

    hashes = [int.from_bytes(sha512(bytes([i])).digest(), 'big') for i in range(256)]
    hexList = read_hex_lines()

    BList = []

    # 做 xor 找到 80 筆 getrandbits(256) 生成出來的隨機數
    for i in range(80):
        for hashNumber in hashes:
            powB = hexList[i]^hashNumber
            if(is_perfect_square(powB)):
                BList.append(math.isqrt(powB))
                #powBList.append(powB)
                break

    # 推算第 81 筆隨機數
    def split_256bit_to_32bit(x):
        return [(x >> (i * 32)) & 0xFFFFFFFF for i in range(8)]

    rc = RandCrack()
    for num in BList:  # numbers 是 list of 80個256-bit整數
        for part in split_256bit_to_32bit(num):
            rc.submit(part)

    predicted = rc.predict_getrandbits(256)

    print(f"第 81 筆預測值：{predicted}")

    # 解碼
    flag_en = hexList[80]
    flag_int = flag_en ^ (predicted**2)

    length = (flag_int.bit_length() + 7) // 8
    print(f"Flag： {flag_int.to_bytes(length, byteorder='big')}")
    ```
11. 執行後發現它跳了一個 `ValueError("Already got enough bits")` 的錯誤，ChatGPT 說它只需要有 624 bits，所以只餵後面的 78 筆給 randcrack 就好
    ```python
    from hashlib import sha512
    import math
    import random
    from randcrack import RandCrack

    # 讀取輸出檔案
    def read_hex_lines():
        lines = []
        with open("output.txt", 'r') as file:
            for line in file:
                lines.append(int(line.strip(), 16))

        return lines

    # 檢查是否為完美平分數
    def is_perfect_square(n):
        sqrt = math.isqrt(n)
        return sqrt * sqrt == n

    hashes = [int.from_bytes(sha512(bytes([i])).digest(), 'big') for i in range(256)]
    hexList = read_hex_lines()

    BList = []

    # 做 xor 找到 80 筆 getrandbits(256) 生成出來的隨機數
    for i in range(80):
        for hashNumber in hashes:
            powB = hexList[i]^hashNumber
            if(is_perfect_square(powB)):
                BList.append(math.isqrt(powB))
                #powBList.append(powB)
                break

    # 推算第 81 筆隨機數

    def split_256bit_to_32bit(x):
        return [(x >> (i * 32)) & 0xFFFFFFFF for i in range(8)]

    rc = RandCrack()
    for num in BList[2:]:  # numbers 是 list of 80個256-bit整數
        for part in split_256bit_to_32bit(num):
            rc.submit(part)

    predicted = rc.predict_getrandbits(256)

    print(f"第 81 筆預測值：{predicted}")

    # 解碼
    flag_en = hexList[80]
    flag_int = flag_en ^ (predicted**2)

    length = (flag_int.bit_length() + 7) // 8
    print(f"Flag： {flag_int.to_bytes(length, byteorder='big')}")
    ```
12. 按下執行
    ![圖片](https://hackmd.io/_uploads/rJWGdAtGle.png)
13. Flag：
    :::success
    AIS3{no_more_junks...plz}
    :::

## Reverse
### web flag checker
:::info
Just a web flag checker

http://chals1.ais3.org:29998

Author: Chumy

:::
1. 因為很少打逆向，所以看到逆向給一個網址直接矇逼了
    ![圖片](https://hackmd.io/_uploads/rJzMuW4Gxg.png)
2. 隨便輸入看看，顯示這個 Flag 是錯的
    ![圖片](https://hackmd.io/_uploads/HJoQOZNfxx.png)
3. 打開 F12，發現他有提供 .js 和一個不明格式 .wasm
    ![圖片](https://hackmd.io/_uploads/Hy0LOWEfgx.png)
4. 直接丟去問 ChatGPT，他說 .wasm 是 WebAssembly 的格式，Flag 高機率藏在裡面
    ![圖片](https://hackmd.io/_uploads/ry_eYWNzgg.png)
5. 在 google 搜尋「.wasm 逆向」，找到一個在講解 WebAssembly 和 剛剛 ChatGPT 提到的 Wasm-decompile 用法的[文章](https://blog.csdn.net/weixin_52369224/article/details/121566319)
    ![圖片](https://hackmd.io/_uploads/BkGk25Vzlx.png)
6. 照著文章先把 .wasm 下載下來然後轉成 .c 檔，打開來一看有幾個問題首先搜尋不到 main 和 flag，再來是 Kali 內建的文字編輯器好難用
    ```
    wasm2c index.wasm -o index.c
    ```
7. 繼續跟著文章往下看，它說 .c 檔雖然變成程式碼了但可讀性很差，所以這邊再給他編譯成 .o 檔，輸入程式後產生了 .o 和 .h 檔
    ```
    gcc -c index.c -o index.o
    ```
8. 文章是用 IDApro，但我自己習慣使用 Ghidra，所以接下來用大恐龍打開檔案
    ![圖片](https://hackmd.io/_uploads/B1bRTqEzel.png)
9. 快速看一下哪些函式，找到了 main，但跟在裡面跑丟了，找不到東西；接著搜尋到了一個叫 flagchecker 的函式
    ![圖片](https://hackmd.io/_uploads/Hk6hC5VGgg.png)
10. 看一下程式碼覺得超級可疑，直接複製貼上給 ChatGPT，他生成了一段程式碼，按下執行
    ```python
    def ror(val, r_bits, width=64):
        return ((val >> r_bits) | (val << (width - r_bits))) & ((1 << width) - 1)

    target_hashes = [
        0x69282a668aef666a,
        0x633525f4d7372337,
        0x9db9a5a0dcc5dd7d,
        0x9833afafb8381a2f,
        0x6fac8c8726464726,
    ]

    magic = 0xfd9ea72d
    flag_parts = []

    for i in range(5):
        shift = (magic >> ((i * 6) & 0x1f)) & 0x3f
        reversed_value = ror(target_hashes[i], shift)
        flag_parts.append(reversed_value.to_bytes(8, byteorder='little'))

    flag = b''.join(flag_parts)
    print("Flag (raw bytes):", flag)
    print("Flag (utf-8):", flag.decode('utf-8'))
    ```
11. Flag：
    :::success
    AIS3{W4SM_R3v3rsing_w17h_g0_4pp_39229dd}
    :::

### AIS3 Tiny Server - Reverse
:::info
Find the secret flag checker in the server binary itself and recover the flag.

The challenge binary is the same across all AIS3 Tiny Server challenges.

Please download the binary from the "AIS3 Tiny Server - Web / Misc" challenge.

This challenge doesn't depend on the "AIS3 Tiny Server - Pwn" and can be solved independently.

It is recommended to solve this challenge locally.

Author: pwn2ooown
:::
1. 看了一下題目敘述，去下載 AIS3 Tiny Server - Web / Misc 的檔案
    ![圖片](https://hackmd.io/_uploads/H11fei4Gel.png)
2. 直接丟去大恐龍
    ![圖片](https://hackmd.io/_uploads/HyG_xjEfxx.png)
3. 同樣找看一下有哪些 function，發現每個函式的名字都是數字
    ![圖片](https://hackmd.io/_uploads/rkcTgjVMex.png)
4. 暫時沒有想法，所以快速瀏覽每個函式的內容，找到了一個疑似用來判斷 flag 是否正確的函式，而判斷的重點在 FUN_00011e20(pcVar6) 中
    ```
    /* WARNING: Function: __i686.get_pc_thunk.bx replaced with injection: get_pc_thunk_bx */

    void FUN_00012110(int param_1,char *param_2)
    {
        ...(省略程式)...
        iVar2 = FUN_00011e20(pcVar6);
        if (iVar2 == 0) {
        pcVar6 = "Sorry, that\'s not the correct flag. Try again!";
        pcVar1 = "Wrong Flag";
        uVar7 = 0x193;
        }
        else {
        pcVar6 = "Congratulations! You found the correct flag!";
        pcVar1 = "Flag Correct!";
        uVar7 = 200;
        }
        FUN_00011f90(param_1,uVar7,pcVar1,pcVar6,0);
        close(param_1);
        return;
        ...(省略程式)...
      return;
    }
    ```
5. 點進去看，就看到一堆變數
    ```c
    bool FUN_00011e20(int param_1)
    {
      byte bVar1;
      int iVar2;
      uint uVar3;
      uint uVar4;
      byte bVar5;
      byte local_49 [11];
      byte local_3e [46];

      bVar5 = 0x33;
      local_3e[0x2c] = 0x14;
      local_3e[0x2d] = 0;
      bVar1 = 0x72;
      local_3e[0] = 0x33;
      local_3e[1] = 0x20;
      local_3e[2] = 0x38;
      local_3e[3] = 0x58;
      local_3e[4] = 0x12;
      local_3e[5] = 0x28;
      local_3e[6] = 0x5c;
      local_3e[7] = 0x47;
      local_3e[8] = 0x29;
      local_3e[9] = 0x52;
      local_3e[10] = 0x2d;
      local_3e[0xb] = 0xf;
      local_3e[0xc] = 0x5a;
      local_3e[0xd] = 10;
      local_3e[0xe] = 0xe;
      local_3e[0xf] = 0;
      local_3e[0x10] = 0xf;
      local_3e[0x11] = 0x58;
      local_3e[0x12] = 0x13;
      local_3e[0x13] = 0x50;
      local_3e[0x14] = 0x19;
      local_3e[0x15] = 0x5a;
      local_3e[0x16] = 0x19;
      local_3e[0x17] = 0x34;
      local_3e[0x18] = 0x58;
      local_3e[0x19] = 0x31;
      local_3e[0x1a] = 0x33;
      local_3e[0x1b] = 0x43;
      local_3e[0x1c] = 0x13;
      local_3e[0x1d] = 0x41;
      local_3e[0x1e] = 4;
      local_3e[0x1f] = 0x5a;
      local_3e[0x20] = 0x19;
      local_3e[0x21] = 0x34;
      local_3e[0x22] = 0x58;
      local_3e[0x23] = 0x2c;
      local_3e[0x24] = 0x33;
      local_3e[0x25] = 0x53;
      local_3e[0x26] = 0x46;
      local_3e[0x27] = 3;
      local_3e[0x28] = 0x1e;
      local_3e[0x29] = 0x48;
      local_3e[0x2a] = 0x4a;
      local_3e[0x2b] = 0x4a;
      local_49[0] = 0x72;
      local_49[1] = 0x69;
      local_49[2] = 0x6b;
      local_49[3] = 0x6b;
      local_49[4] = 0x69;
      local_49[5] = 0x5f;
      local_49[6] = 0x6c;
      local_49[7] = 0x30;
      local_49[8] = 0x76;
      local_49[9] = 0x33;
      uVar3 = 0;
      while( true ) {
        local_3e[uVar3] = bVar1 ^ bVar5;
        uVar4 = uVar3 + 1;
        if (uVar4 == 0x2d) break;
        bVar5 = local_3e[uVar3 + 1];
        bVar1 = local_49[uVar4 % 10];
        uVar3 = uVar4;
      }
      iVar2 = 0;
      while ((*(byte *)(param_1 + iVar2) != 0 && (*(byte *)(param_1 + iVar2) == local_3e[iVar2]))) {
        iVar2 = iVar2 + 1;
        if (iVar2 == 0x2d) {
          return *(char *)(param_1 + 0x2d) == '\0';
        }
      }
      return false;
    }
    ```
6. 直接複製貼上給 ChatGPT，他生成了一段程式碼，按下執行
    ```python
    enc = [
        0x33, 0x20, 0x38, 0x58, 0x12, 0x28, 0x5c, 0x47, 0x29, 0x52,
        0x2d, 0x0f, 0x5a, 0x0a, 0x0e, 0x00, 0x0f, 0x58, 0x13, 0x50,
        0x19, 0x5a, 0x19, 0x34, 0x58, 0x31, 0x33, 0x43, 0x13, 0x41,
        0x04, 0x5a, 0x19, 0x34, 0x58, 0x2c, 0x33, 0x53, 0x46, 0x03,
        0x1e, 0x48, 0x4a, 0x4a, 0x14
    ]

    key = b'rikki_l0v3'
    flag = bytearray()
    b1 = 0x72  # initial value (same as key[0])
    b2 = 0x33  # initial bVar5

    for i in range(len(enc)):
        out = b1 ^ b2
        flag.append(out)
        b2 = enc[i + 1] if i + 1 < len(enc) else 0
        b1 = key[(i + 1) % 10]

    print("Flag:", flag.decode())
    ```
7. Flag：
    :::success
    AIS3{w0w_a_f1ag_check3r_1n_serv3r_1s_c00l!!!}
    :::

### A_simple_snake_game
:::info
Here is A very interesting Snake game. If no one beat this game the world will be destory in 30 seconds. Now, Chenallger , It's your duty to beat the game, save the world.

author: Aukro
:::
1. 下載後，得到了一個 a.exe 的執行檔和一些設定檔
2. 打開之後發現這是一個貪食蛇小遊戲
    ![螢幕擷取畫面 2025-06-01 214300](https://hackmd.io/_uploads/By9NeETzex.png)
3. 用大恐龍打開 a.exe，發現有超級多 function
    ![圖片](https://hackmd.io/_uploads/rJlTxETMel.png)
4. 先找看看有沒有 main
    ![圖片](https://hackmd.io/_uploads/BJ8i7EaGll.png)
5. 很快速地看過這些搜尋到的 function，發現 _SDL_main 裡面有包含方向控制、畫面更新等等的內容
    ```c
    undefined4 _SDL_main(void)
    {
      bool bVar1;
      char cVar2;
      undefined4 uVar3;
      int *piVar4;
      uint uVar5;
      time_t tVar6;
      undefined4 local_d4;
      SjLj_Function_Context local_d0;
      undefined1 *local_b0;
      undefined1 *local_ac;
      undefined1 *local_a8;
      undefined4 local_9c;
      undefined4 local_98;
      char local_92;
      char local_91;
      vector<> local_90 [12];
      Food local_84 [12];
      Snake local_78 [4];
      int local_74;
      char local_6c;
      vector<> avStack_68 [12];
      Screen local_5c [28];
      Food local_40 [12];
      int local_34;
      vector<> *local_30;
      int local_2c;
      uint local_28;
      char local_21;
      int local_20;

      local_b0 = &stack0xfffffffc;
      local_a8 = &stack0xffffff14;
      local_d0.personality = (_Unwind_Personality_Fn)&___gxx_personality_sj0;
      local_d0.lsda = &DAT_004dfed8;
      local_ac = &LAB_00402165;
      _Unwind_SjLj_Register(&local_d0);
      local_d0.call_site = -1;
      tVar6 = time((time_t *)0x0);
      srand((uint)tVar6);
      SnakeGame::Screen::Screen(local_5c);
      SnakeGame::Snake::Snake();
      local_d0.call_site = 1;
      SnakeGame::Food::Food(local_84);
      std::vector<>::vector(local_90);
      local_d0.call_site = 2;
      createWalls(local_90);
      local_20 = 0;
      uVar3 = SnakeGame::Screen::init(local_5c);
      if ((char)uVar3 == '\x01') {
        local_21 = '\0';
        local_91 = '\x01';
        local_92 = '\0';
        while ((local_21 == '\0' && (0 < local_74))) {
          local_d0.call_site = 2;
          SnakeGame::Screen::clear(local_5c);
          SnakeGame::Snake::draw(local_78,local_5c);
          SnakeGame::Food::draw(local_84,local_5c);
          drawWalls(local_90,local_5c);
          SnakeGame::Screen::update(local_5c,local_20,local_74,'\0');
          if (local_91 != '\0') {
            local_21 = holdGame(local_5c,0x5dc);
            local_91 = '\0';
          }
          local_d0.call_site = 2;
          uVar3 = SnakeGame::Screen::processEvents();
          switch(uVar3) {
          case 0:
            local_21 = '\x01';
            break;
          case 1:
            if (local_6c != '\x01') {
              local_d0.call_site = 2;
              SnakeGame::Snake::updateDirection(local_78,0);
            }
            break;
          case 2:
            if (local_6c != '\x01') {
              local_d0.call_site = 2;
              SnakeGame::Snake::updateDirection(local_78,1);
            }
            break;
          case 3:
            if (local_6c != '\x01') {
              local_d0.call_site = 2;
              SnakeGame::Snake::updateDirection(local_78,2);
            }
            break;
          case 4:
            if (local_6c != '\x01') {
              local_d0.call_site = 2;
              SnakeGame::Snake::updateDirection(local_78,3);
            }
            break;
          case 5:
            local_92 = '\x01';
          }
          if (local_92 != '\0') {
            local_d0.call_site = 2;
            local_21 = pauseGame(local_5c,&local_92);
          }
          local_d0.call_site = 2;
          local_2c = _SDL_GetTicks();
          if ((local_2c / 10) % 6 == 0) {
            bVar1 = SnakeGame::Snake::move(local_78);
            if (bVar1) {
              local_d0.call_site = 2;
              cVar2 = SnakeGame::Snake::collidesWith(local_78,(int)local_84);
              if (cVar2 != '\0') {
                SnakeGame::Food::Food(local_40);
                SnakeGame::Food::operator=(local_84,(int)local_40);
                local_20 = local_20 + 0x32;
                SnakeGame::Snake::addSection();
              }
              local_30 = local_90;
              local_98 = std::vector<>::begin(local_30);
              local_9c = std::vector<>::end(local_30);
              while (uVar3 = __gnu_cxx::operator!=
                                       ((__normal_iterator<> *)&local_98,
                                        (__normal_iterator<> *)&local_9c), (char)uVar3 != '\0') {
                piVar4 = (int *)__gnu_cxx::__normal_iterator<>::operator*
                                          ((__normal_iterator<> *)&local_98);
                local_34 = *piVar4;
                local_d0.call_site = 2;
                cVar2 = SnakeGame::Snake::collidesWith(local_78,local_34);
                if (cVar2 != '\0') {
                  resetLevel(local_78,local_84,&local_91);
                }
                __gnu_cxx::__normal_iterator<>::operator++((__normal_iterator<> *)&local_98);
              }
              local_28 = 1;
              while (uVar5 = std::vector<>::size(avStack_68), local_28 < uVar5) {
                piVar4 = (int *)std::vector<>::operator[](avStack_68,local_28);
                local_d0.call_site = 2;
                cVar2 = SnakeGame::Snake::collidesWith(local_78,*piVar4);
                if (cVar2 != '\0') {
                  resetLevel(local_78,local_84,&local_91);
                }
                local_28 = local_28 + 1;
              }
            }
            else {
              resetLevel(local_78,local_84,&local_91);
            }
          }
          if (local_74 == 0) {
            local_d0.call_site = 2;
            SnakeGame::Screen::clear(local_5c);
            SnakeGame::Screen::drawGameOver(local_5c);
            SnakeGame::Screen::update(local_5c,local_20,local_74,'\x01');
            holdGame(local_5c,3000);
          }
        }
        freeWalls(local_90);
        local_d0.call_site = 2;
        SnakeGame::Screen::close(local_5c);
        local_d4 = 0;
      }
      else {
        _SDL_Log();
        local_d4 = 0xffffffff;
      }
      std::vector<>::~vector();
      SnakeGame::Snake::~Snake(local_78);
      _Unwind_SjLj_Unregister(&local_d0);
      return local_d4;
    }
    ```
6. 直接丟給 ChatGPT 問他 flag 可能會出現在哪裡
    ![圖片](https://hackmd.io/_uploads/rJHlH4pzlg.png)
7. 點進去 drawGameOver，並沒有看到他有另外呼叫其他函式或是有可疑的判斷
    ```c
    void __thiscall SnakeGame::Screen::drawGameOver(Screen *this)
    {
      uint local_14;
      uint local_10;
      uint local_c;
      uint local_8;

      for (local_8 = 0; local_8 < 600; local_8 = local_8 + 1) {
        *(undefined4 *)(local_8 * 0xc80 + 0x640 + *(int *)(this + 0x18)) = 0xffff0ff;
      }
      for (local_c = 0; local_c < 800; local_c = local_c + 1) {
        *(undefined4 *)((local_c + 240000) * 4 + *(int *)(this + 0x18)) = 0xffff0ff;
      }
      for (local_10 = 0; local_10 < 299; local_10 = local_10 + 1) {
        for (local_14 = 0; local_14 < 399; local_14 = local_14 + 1) {
          *(undefined4 *)((local_14 + local_10 * 800) * 4 + *(int *)(this + 0x18)) = 0xffcc00ff;
          *(undefined4 *)((local_14 + local_10 * 800 + 0x192) * 4 + *(int *)(this + 0x18)) = 0xccf0ff;
          *(undefined4 *)((local_14 + local_10 * 800 + 0x3aca0) * 4 + *(int *)(this + 0x18)) = 0xfcc0a00
          ;
          *(undefined4 *)((local_14 + local_10 * 800 + 0x3ae32) * 4 + *(int *)(this + 0x18)) =
               0xad0c0a00;
        }
      }
      return;
    }
    ```
8. 接著點進去 update，他會呼叫 drawText 這個函式
    ```c
    void __thiscall SnakeGame::Screen::update(Screen *this,int param_1,int param_2,char param_3)
    {
      _SDL_UpdateTexture(*(undefined4 *)(this + 8),0,*(undefined4 *)(this + 0x18),0xc80);
      _SDL_RenderClear(*(undefined4 *)(this + 4));
      _SDL_RenderCopy(*(undefined4 *)(this + 4),*(undefined4 *)(this + 8),0,0);
      if (param_3 != '\x01') {
        drawText(param_1,param_2);
      }
      _SDL_RenderPresent(*(undefined4 *)(this + 4));
      return;
    }
    ```
9. 再點進去 drawText，因為函式的內容太長所以直接丟給 ChatGPT，他說我找到了藏有 flag 的關鍵函式
    ![圖片](https://hackmd.io/_uploads/ByUaI4azel.png)
10. 試著用搜尋找到了 hex_array1 的值，接著丟給 ChatGPT 讓它生成程式碼
    ```python
    # 加密資料（43 bytes）
    encrypted_bytes = bytes.fromhex(
        "ce695081c1942bb5c38b136ddb0830c5774cb209ed101c5948eb20586529fecf"
        "1d9d67f7de102ea466fd"
    )

    # hex_array1 資料（XOR key）
    hex_array = bytes.fromhex(
        "c0193afDce68dcf20c47d486ab5739b53a8d13473f7f71986d13b401909c463ac633c27fdd71789f932255"
    )

    # 解密
    flag = bytes([a ^ b for a, b in zip(encrypted_bytes, hex_array)])

    print("🔥 Decrypted flag:", flag.decode(errors='replace'))  # 若有非 UTF-8 字元加上 errors='replace'
    ```
11. 按下執行，好像不太妙，應該是 hex_array1 的資料有問題，但我不知道要怎麼改，所以回到大恐龍嘗試理解要怎麼直接輸出 flag
    ![圖片](https://hackmd.io/_uploads/BJzLvVTzlx.png)
12. 大致看過後發現會根據 param_1 和 param_2 來判斷是否進入輸出 flag 的地方
    - param_1 在 _SDL_main 中是 local_20 代表分數
    - param_2 在 _SDL_main 中是 local_74 代表生命
    ```c
    void SnakeGame::Screen::drawText(int param_1,int param_2)
    {
      ...(省略程式)...
      if ((param_1 < 0xaebc1c) || (param_2 < 0x4d63)) {
        local_f4.call_site = -1;
        createText[abi:cxx11]();
        local_48 = 0xffffff;
        std::__cxx11::string::c_str(local_44);
        local_f4.call_site = 3;
        uVar8 = _TTF_RenderText_Solid();
        *(undefined4 *)(local_c0 + 0xc) = uVar8;
        uVar8 = _SDL_CreateTextureFromSurface();
        *(undefined4 *)(local_c0 + 0x10) = uVar8;
        local_58 = 400;
        local_54 = 0x235;
        local_50 = 0x140;
        local_4c = 0x1e;
        _SDL_RenderCopy();
        std::__cxx11::string::~string(local_44);
      }
      else { // print(flag)
        local_af = 0xce695081;
        local_ab = 0xc1942bb5;
        local_a7 = 0xc38b136d;
        local_a3 = 0xdb0830c5;
        local_9f = 0x774cb209;
        local_9b = 0xed101c59;
        local_97 = 0x48eb2058;
        local_93 = 0x6529fecf;
        local_8f = 0x1d9d67f7;
        local_8b = 0xde102ea4;
        local_87 = 0x66fd;
        local_85 = 0x28;
        ...(省略程式)...
      }
      _Unwind_SjLj_Unregister(&local_f4);
      return;
    }
    ```
13. 由此可知，當分數和生命大於一個很大的數字時，才會輸出 flag，但難度太高，所以把數值改小一點，然後匯出檔案
    ![圖片](https://hackmd.io/_uploads/rylpWSazlg.png)
14. 開啟遊戲，根據我們修改後的判斷，我們需要至少吃到一顆食物才能得到 flag (開始努力玩遊戲，然後在得到 flag 時截圖)
    ![圖片](https://hackmd.io/_uploads/HkGjufBpfex.png)
15. Flag：
    :::success
    AIS3{CH3aT_Eng1n3?_0fcau53_I_bo_1T_by_hAnD}
    :::

:::danger
這題有遇到兩件我不能理解的事情
1. 為甚麼我把數值改成 `< 0x0` 他反編譯出來卻是 `< 1`
2. 當我把有 flag 的截圖畫面丟給 ChatGPT 時，他識別出來的 flag，超級有問題，一堆字辨識錯誤
:::

## Pwn
### Welcome to the World of Ave Mujica🌙 
:::info
就將一切委身於 Ave Mujica 吧...

Flag 在 /flag，這題的 flag 有 Unicode 字元，請找到 flag 之後直接提交到平台上，如果因為一些玄學問題 CTFd 送不過請 base64 flag 出來用 CyberChef decode 應該就可以了

Instancer

請先在本地測試並確定能成功攻擊後再開 instance

若同時參加兩場比賽，輸入任意一個 CTFd 的 token 皆可啟動 instance

Instancer 並非題目的一部分，請勿攻擊 Instancer。發現問題請回報 admin

Author: pwn2ooown
:::
我還是辦不到。･ﾟ･(つд`ﾟ)･ﾟ･