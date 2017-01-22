# Global Game Jam 2017

このプロジェクトはGlobal Game Jam 2017の熊本会場にて「Progolfer Hamon」チームが作成したゲーム「Space Traveler Hamon」のリポジトリです。
Global Game Jamについては以下のサイトを参照してください。

This project is a repository of the game "Space Traveler Hamon" created by the "Progolfer Hamon" team at the Kumamoto venue of Global Game Jam 2017.
For Global Game Jam, please refer to the following site.

http://globalgamejam.org/

http://ggj.igda.jp/

# ゲームの概要

このゲームは、燃料が切れて等速直線運動を続ける宇宙船を星の重力によってスイングバイさせながらゴールとなる母星に帰還させることを目指します。

This game aims to let the player return to the mother star by the swing-by using the gravity of the star, the spacecraft which continues constant velocity linear movement with fuel running out.

プラットフォームは、Webブラウザです。フロントエンドがHTML5とJava Scriptですので特にプラグインなどを使用する予定はありませんが古いブラウザでは動作しません。

The platform is a web browser. Since the front end works with HTML 5 and Java Script, we do not use special plugins. However, it will not work with older web browsers.

# 遊び方

1. 画面に宇宙空間が表示されます。上に母星、下に宇宙船、右側にこれから配置する星が表示されます。
2. 星をドラッグし宇宙空間に配置します。
3. 「START」ボタンをクリックすると宇宙船が動き始めます。障害物をよけながらそのまま母星にたどり着けばゴールです。
4. 星の重力に捕まるとその星に衝突しゲームオーバーとなります。
5. 「リトライ」ボタンをクリックすると初期画面に戻って再びゲームができます。
6. 3回失敗するとゲーム終了しリザルト画面に切り替わります。

1. Space is displayed on the screen. The mother star on the top, the spaceship on the bottom, the drop stars in the right side are displayed.
2. Player is drag  and drop star in space.
3. Click the "START" button to start the spacecraft. If the spaceship arrives at the mother star while avoiding obstacles it is the goal.
4. When caught by the star's gravity, it collides with the star and it becomes a game over.
5. Click the "Retry" button to return to the initial screen and play the game again.
6. If you fail three times, the game ends and you are switched to the result screen.

# デバッグ

ローカルサーバーの起動

```
$ npm start
```

# クレジット

BGM・効果音はスキップモアの物を使用しています。
SKIPMORE：http://www.skipmore.com/