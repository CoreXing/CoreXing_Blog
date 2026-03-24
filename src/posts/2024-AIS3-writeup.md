---
title: 2024 AIS3 Pre-Exam Writeup
date: 2024-05-30
description: 這是我第三次報名 AIS3 的 Pre-exam 所撰寫的 Writeup。
tags: [AIS3, Writeup]
categories: [Security]
draft: false
---

## Intro
### About me
哈囉~我是星星，來自北科資工，緊張刺激的 Pre-exam 終於結束了！我自己感覺今年的題目相較於去年有比較困難一點，明明題目標註 easy 但怎麼就是解不開 QQ？

這是我第三次報名 AIS3 的 Pre-exam，可以很明顯感覺到自己的進步，真的很感謝 AIS3 提供一個這麼棒的比賽和暑期課程！雖然今年因為暑期實習外加撞到其他活動即使入取了也沒辦法去，但志在參與 ~ 同時也希望我的 writeup 可以幫助我推甄到好研究所 OuO。

### Environment and tools
- 環境：
    - Windows11
    - Linux kali 6.1.0-kali5-amd64
- 工具：
    - WireShark (網路封包擷取、分析)
    - Ghrida (逆向分析)
    - Burp Suite (Web安全測試)
    - VS code (程式編輯器)

## Misc
### Welcome
- 題目：
    The FLAG is AIS3{Welc0me_to_AIS3_PreExam_2o24!}
- 解題步驟：
    1. 打開題目就可以看到了！「**Flag GET**」
        ![圖片](https://hackmd.io/_uploads/S1ViYiBVC.png)
- Flag：
    :::success
    AIS3{Welc0me_to_AIS3_PreExam_2o24!}
    :::
### Quantum Nim Heist
- 題目：
    Welcome to the Quantum Nim Heist, where traditional logic intertwines with the enigmatic realm of quantum mechanics to create a Nim game like no other. `nc chals1.ais3.org 40004`
- 檔案：
    - src
        - `game.py` (生成遊戲、判斷輸贏)
        - `myhash.py` (用來處理存檔的 hash)
        - `server.py` (遊戲的主程式)
        - `text.py` (遊戲文字)
- 解題步驟：
    1. 在 Terminal 輸入 `nc chals1.ais3.org 40004`，出現了遊戲畫面
        ![圖片](https://hackmd.io/_uploads/r1rayyLNA.png)
    2. 嘗試玩幾次發現每一回合都可以選擇拿某一堆的幾顆石頭，電腦也會拿石頭，最後是比誰最後沒有石頭拿就輸了，玩了很多次結果都是輸給電腦
        ![圖片](https://hackmd.io/_uploads/H17_GkLN0.png)
    4. 受不了先去看主程式 `server.py`。在程式中發現了兩件事：首先需要獲勝才能得到 flag，再來是當生成遊戲時 `menu()` 會呼叫 `game.generate_losing_game()`，看起來就代表這是一個必輸的遊戲
        ``` python!
        import myhash
        from game import Game, AIPlayer
        from text import *


        flag = 'A1S3{test_flag}'

        hash = myhash.Hash()


        def play(game: Game):
            ai_player = AIPlayer()
            win = False

            while not game.ended():
                game.show()
                print_game_menu()
                choice = input('it\'s your turn to move! what do you choose? ').strip()

                if choice == '0':
                    pile = int(input('which pile do you choose? '))
                    count = int(input('how many stones do you remove? '))
                    if not game.make_move(pile, count):
                        print_error('that is not a valid move!')
                        continue

                elif choice == '1':
                    game_str = game.save()
                    digest = hash.hexdigest(game_str.encode())
                    print('you game has been saved! here is your saved game:')
                    print(game_str + ':' + digest)
                    return

                elif choice == '2':
                    break

                # no move -> player wins!
                if game.ended():
                    win = True
                    break
                else:
                    print_move('you', count, pile)
                    game.show()

                # the AI plays a move
                pile, count = ai_player.get_move(game)
                assert game.make_move(pile, count)
                print_move('i', count, pile)

            if win:
                print_flag(flag)
                exit(0)
            else:
                print_lose()


        def menu():
            print_main_menu()
            choice = input('what would you like to do? ').strip()

            if choice == '0':
                print_rules()

            elif choice == '1':
                game = Game()
                game.generate_losing_game()
                play(game)

            elif choice == '2':
                saved = input('enter the saved game: ').strip()
                game_str, digest = saved.split(':')
                if hash.hexdigest(game_str.encode()) == digest:
                    game = Game()
                    game.load(game_str)
                    play(game)
                else:
                    print_error('invalid game provided!')

            elif choice == '3':
                print('omg bye!')
                exit(0)


        if __name__ == '__main__':
            print_welcome()

            try:
                while True:
                    menu()
            except Exception:
                print('oops i died')
        ```
    4. 這次去看 `game.py` 的程式。發現確實有一個 `generate_winning_game` 的函式，但我對於如何跑到這個函式完全沒有想法 (這時我就跑去解其他題目了)
        ``` python!
        def generate_winning_game(self) -> None:
            '''generate a game such that the first player has a winning strategy'''
            self.stones = []
            xor_sum = 0

            piles = random.randint(6, 8)
            for i in range(piles):
                self.stones.append(count := random.randint(1, 31))
                xor_sum ^= count

            if xor_sum == 0:
                self.stones.append(random.randint(1, 31))

        def generate_losing_game(self) -> None:
            '''generate a game such that the second player has a winning strategy'''
            self.stones = []
            xor_sum = 0

            piles = random.randint(6, 8)
            for i in range(piles):
                self.stones.append(count := random.randint(1, 31))
                xor_sum ^= count

            if xor_sum != 0:
                self.stones.append(xor_sum)
        ```
    5. 後來官方提供了提示
        :::info
        不用按照既定的遊戲規則走！多玩遊戲也許在無意間能找出解法
        :::
    6. 這時我回到 `server.py` 嘗試尋找遊戲漏洞，發現在選擇操作的 if 沒有 else，這代表程式只要不是輸入 0~2 的操作，就可以直接跳過玩家回合進入到電腦的回合
        ``` python!
        while not game.ended():
            game.show()
            print_game_menu()
            choice = input('it\'s your turn to move! what do you choose? ').strip()
            # 玩家的操作選項
            if choice == '0': # 選擇拿石頭
                pile = int(input('which pile do you choose? '))
                count = int(input('how many stones do you remove? '))
                if not game.make_move(pile, count):
                    print_error('that is not a valid move!')
                    continue

            elif choice == '1': # 存檔+離開
                game_str = game.save()
                digest = hash.hexdigest(game_str.encode())
                print('you game has been saved! here is your saved game:')
                print(game_str + ':' + digest)
                return

            elif choice == '2': # 離開
                break

            # no move -> player wins!
            if game.ended():
                win = True
                break
            else:
                print_move('you', count, pile)
                game.show()
                
            # the AI plays a move
            pile, count = ai_player.get_move(game)
            assert game.make_move(pile, count)
            print_move('i', count, pile)
        ```
    7. 所以在遊戲過程中我很快速地把大部分的石頭拿走，剩下一點點石頭時輸入 3 讓電腦一直拿石頭直到剩下一顆
        ![圖片](https://hackmd.io/_uploads/HyMd4yLN0.png)
    8. 直接把最後一顆拿走 「**Flag GET**」
        ![圖片](https://hackmd.io/_uploads/SkCo4JU4A.png)
- Flag：
    :::success
    AIS3{Ar3_y0u_a_N1m_ma57er_0r_a_Crypt0_ma57er?}
    :::

### Three Dimensional Secret
- 題目：
    I shall send printable secrets
    Author: ja20nl1n
- 檔案：
    - `capture.pcapng`
- 解題步驟：
    1. 直接用 wireshark 打開 `capture.pcapng` 這個檔案
    2. 打開檔案就發現有很多 ARP 的封包再詢問 `192.168.77.2` 的位址，想到以前有看過 ARP 攻擊的文章，所以滑到下面找看看有沒有回傳位址的封包或其他可疑的東西
        ![圖片](https://hackmd.io/_uploads/BJTAdArNR.png)
    3. 找到了回傳位址的封包，前一個封包詢問 `192.168.77.1` 的位址，然後有回傳位址，但在回傳的封包裡面沒有找到有用的訊息 (解題方向錯了)
        ![圖片](https://hackmd.io/_uploads/H1kRqRHE0.png)
    4. 搜尋 `http` 看看有沒有網頁可以打開，結果是沒有
        ![圖片](https://hackmd.io/_uploads/rkONsRHE0.png)
    5. 搜尋 `tcp` 看看有甚麼東西，有很多封包，逐一檢查發現 `192.168.77.1` 發給 `192.168.77.128` 的封包內容很長，感覺是有意義的東西
        ![圖片](https://hackmd.io/_uploads/rJ_H2ASNR.png)
    6. 在 Analyze > Follow > TCP Stream，就可以看到所以TCP封包裡面的內容感覺是某種語法，拿去問 ChatGPT 發現是 3D 列印機常用的 G code (非常地符合題目敘述！)
        ![圖片](https://hackmd.io/_uploads/BJ5J6CS4A.png)
    7. 同時 ChatGPT 提供了 [ncviewer](https://ncviewer.com/) 來讓我們預覽 G code 會印出甚麼 「**Flag GET**」
        ![圖片](https://hackmd.io/_uploads/H1Yz00HEC.png)
- Flag：
    :::success
    AIS3{b4d1y_tun3d_PriN73r}
    :::

## Web
### Evil Calculator
- 題目：
    This is a calculator written in Python. It's a simple calculator, but some function in it is VERY EVIL!!
    Connection info: `http://chals1.ais3.org:5001`
    Author: TriangleSnake
- 檔案：
    - app
        - templates
            - `index.html`
        - `app.py` (API)
    - `docker-compose.yml`
    - `Dockerfile`
    - `flag`
- 解題步驟：
    1. 從檔案路徑可以發現在最外層有 `flag` 這個檔案，但程式不會碰到它
    2. 點開網址看到了一個可愛的計算機，功能就是一般的計算機
        ![圖片](https://hackmd.io/_uploads/SJ8cijBVA.png)
    3. 按下 `F12` 檢查一下有沒有可疑的東西
    4. 發現按下 `=` 時，在網路監控器中，可以看到它會發送 API
        ![圖片](https://hackmd.io/_uploads/B1lQr2iHNR.png)
    4. 請求的參數是 `expression	"1+50"`
    5. 看一下 `app.py`，API 會呼叫 `calculate()` 這個函式
        ``` python!
        from flask import Flask, request, jsonify, render_template

        app = Flask(__name__)

        @app.route('/calculate', methods=['POST'])
        def calculate():
            data = request.json
            expression = data['expression'].replace(" ","").replace("_","")
            try:
                result = eval(expression)
            except Exception as e:
                result = str(e)
            return jsonify(result=str(result))

        @app.route('/')
        def index():
            return render_template('index.html')

        if __name__ == '__main__':
            app.run("0.0.0.0",5001)
        ```
    6. 可以發現裡面有一個邪惡的語法 `eval()`，上網查一下[語法介紹](https://www.runoob.com/python/python-func-eval.html) (簡單來說就是可以執行一些 python 語法)
        ![圖片](https://hackmd.io/_uploads/SktC6oSEA.png)
    7. `eval()` 的參數是 expression，也就是前面操作時輸入的 `1+50`，由此可知我們需要想辦法修改計算機的輸入，然後讓它可以讀到 `flag` 這個檔案
    8. 打開 Burp suite，按下 `=` 攔截API，把參數改成 `"expression":"open('../flag').read()"` (要注意路徑對不對以及記得加 `read()`)
        ![圖片](https://hackmd.io/_uploads/H1WkV3r4C.png)
    9. 計算結果就出來了 「**Flag GET**」
        ![圖片](https://hackmd.io/_uploads/rkPWN3HER.png)
- Flag：
    :::success
    AIS3{7RiANG13_5NAK3_I5_50_3Vi1}
    :::

## Crypto
### babyRSA
- 題目：
- 檔案：
    - `babyRSA.py`
    - `output.txt`
- 解題步驟：
    1. 打開 `output.txt` 可以看到這是一個加密後的密文和公開金鑰
    2. 打開 `babyRSA.py` 可以看到這是一個可以 RSA 加解密的程式碼，基本上可以確定 output.txt 就是被加密後的 flag
        ![圖片](https://hackmd.io/_uploads/B1JdTXmE0.png)
    2. 我的第一想法是透過函式 `generate_keypair` 和公鑰反推出私鑰是甚麼，但問題就來了，完全沒辦法推出 p 和 q 是甚麼
        ![圖片](https://hackmd.io/_uploads/B18LRQX4R.png)
    3. 這時突然想到前幾天有讀到別人 [2023 AIS3 writeup](https://hackmd.io/@M3t30r/Bk3Qqq3O5#SC-100-baby)
    4. 所以嘗試寫了一個 dictionary 的程式碼 (公鑰和密文太長就不貼上來了)
        ``` python!
        def encrypt(plaintext):
            key, n = # Public Key
            cipher = [pow(ord(char), key, n) for char in plaintext]
            return cipher

        plaintext = "AIS3{}_abcdefghij_klmnopqrst_uvwxyz_ABCDEFGHIJ_KLMNOPQRST_UVWXYZ_0123456789_#$%&([]./;=+-" # 為了建字典所打的字元表
        encrypt_msg = encrypt(plaintext)

        dic = {}
        for i in range(len(plaintext)):
            dic[encrypt_msg[i]] = plaintext[i]

        encrypt_flag = # Encrypted
        for char in encrypt_flag:
            print(dic[char], end="")
        ```
    5. 結果第一個字報錯了！這個錯誤訊息表示 dictionary 不存在這個字
        ![圖片](https://hackmd.io/_uploads/rJ2kZV7NA.png)
    6. 在顯示的 for 迴圈裡加了 try
        ``` python!
        for char in encrypt_flag:
            try:
               print(dic[char], end="")
            except KeyError:
               print("has no key")
        ```
    7. 原來是前面有奇怪的亂碼「**Flag GET**」
        ![圖片](https://hackmd.io/_uploads/Byu9gE7VC.png)
- Flag：
    :::success
    AIS3{NeverUseTheCryptographyLibraryImplementedYourSelf}
    :::

## Reverse
### The long Print
- 題目：
- 檔案：
    - `flag-printer-dist`(執行檔)
- 解題步驟：
    1. 直接執行檔案，發現程式看起來沒有在動也沒有結束 (盲猜可能卡在 for 迴圈)
    2. 因為不會用 Kali 的內建 Reverse 工具，所以下載 [Ghrida](https://ghidra-sre.org/)
        ```
        sudo apt install ghidra
        ```
    2. 開啟 Ghrida (UI 介面)
    3. 建立專案、匯入 `flag-printer-dist` 執行檔
        ![圖片](https://hackmd.io/_uploads/rybcAGQ4C.png)
    5. 點擊檔案，進行分析
    6. 在左邊 Symbol Tree 的 Function 中選擇 main (先看主程式怎麼運行)
        ![圖片](https://hackmd.io/_uploads/B1IgkXmNR.png)
    7. 發現有一段程式 `sleep 0x3648` 參數很大程式會要睡很久
    8. 在這段程式按下 `Ctrl+Shift+G` 把參數改成 0
        ![圖片](https://hackmd.io/_uploads/ByFIymmNA.png)
    9. 按下 `Ctrl+S`，在 file > Export Program，把檔案匯出(記得格式要改成 Original File)
        ![圖片](https://hackmd.io/_uploads/Syh0-m7NA.png)
    10. 打開 Terminal，修改檔案權限然後執行檔案
        ```
        chmod 777 flag-printer-dist
        ./flag-printer-dist
        ```
    11. 他說 flag 已經 print 出來了，但沒有看到！
        ![圖片](https://hackmd.io/_uploads/HyRJmQ7EC.png)
    12. 回到 Ghrida，這次把參數改成 1，然後匯出執行
    13. 發現 flag 正在一秒一秒的出現，最後 Oops! 消失了
        ![圖片](https://hackmd.io/_uploads/rJqsX77VC.png)
    14. 在最後一個字元出現的一瞬間 `Ctrl+C` 中斷執行「**Flag GET**」
        ![圖片](https://hackmd.io/_uploads/rkgc47QE0.png)
- Flag：
    :::success
    AIS3{You_are_the_master_of_time_management!!!!?}
    :::
## Pwn
### Mathter
我辦不到。･ﾟ･(つд`ﾟ)･ﾟ･