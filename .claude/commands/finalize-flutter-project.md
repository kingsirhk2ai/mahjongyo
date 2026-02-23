# finalize-flutter-project

我想你幫我處理 GitHub CI/CD + Firebase Analytics + AdMob（Flutter app），請 嚴格參考我另一個同類型項目 ..\EroGame，技術結構幾乎一樣。

## 1) 參考範圍（EroGame）
請由以下 commit（含）開始到最新 commit，集中睇 打包/CI/CD 相關改動：
- Repo：..\EroGame
- 起點 commit：67abcd215edb432f3066f8269fbdd1936e9294c3

## 2) CI/CD：原封不動搬過嚟（最優先）
- 將 EroGame 的 GitHub Actions Android workflow 同 iOS workflow 原封不動搬到我呢個 repo
- CONFIG_JSON 唔洗改（保持 workflow 內結構同 key 不變）
- 搬 workflow 之後，請找出 EroGame 為咗令 workflow 成功打包而 額外改動/新增嘅檔案（例如：Gradle signing、Podfile、ExportOptions、xcconfig、bundle id 等），並用同等方式套用到我呢個 repo（按我 repo 結構調整路徑）。

## 3) 我項目資料（請用以下值替換所有 placeholder）
- App 顯示名稱（Display Name）：{APP_NAME}
- CI 用 app 名（檔名/產物命名用）：{CI_APP_NAME}
- Package / Bundle ID：{APP_PACKAGE_NAME}
- mobileprovision 檔案路徑：{MOBILEPROVISION_FILE}
- CI config 密碼：Ea7400

## 4) iOS Provisioning Profile（跟 EroGame README 教法）
- 請先閱讀 EroGame README.md 裏面關於 PROVISION_PROFILE_BASE64 的生成/加密方式
- 依照同一套方法，用 {MOBILEPROVISION_FILE} + 密碼 Ea7400 生成 payload
- 把生成結果更新到我 repo 的 iOS workflow env.PROVISION_PROFILE_BASE64

## 5) Firebase Analytics（只需 Android/iOS enable）
參考 EroGame 做法接 Firebase Analytics
要求：
- 只在 Android/iOS release 啟用
- Debug mode / Web 不需要

另外請喺 app 內多個關鍵流程加入 events（列出你加咗邊啲 event、喺邊個文件/位置）。

## 6) AdMob（參考 EroGame）
需要支援：
- App Open
- Interstitial
- Rewarded（如 app 有需要先放，冇需要可先留接口）

App Open 行為要求：
- 需要有 loading hint/screen
- 5 秒內 load 到就 show，load 唔到就直接入主畫面

同樣要列出你改動咗邊啲檔案、主要邏輯點運作。

## 7) 請用以下輸出格式回覆
- **變更清單**：列出新增/修改檔案
- **Workflow 說明**：Android/iOS workflow 點觸發、需要咩 secrets/vars
- **iOS provisioning**：點生成 PROVISION_PROFILE_BASE64（簡短步驟）
- **Firebase Analytics**：啟用條件 + event 清單
- **AdMob**：AppOpen/Interstitial/Rewarded 觸發時機 + 5 秒冷啟動邏輯

如有任何不確定（例如 TeamID、證書名稱、後端 URL、AdMob IDs、Firebase config 檔），請 先問我，唔好亂填。
