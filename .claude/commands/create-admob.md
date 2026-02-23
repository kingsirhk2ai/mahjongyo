# create-admob

幫我用瀏覽器工具去
https://admob.google.com/v2/apps/create
然後幫我去為ANDROID 同IOS 各自開一隻APP
APP名用項目名+Android/iOS
如果未知項目名就問我
APP係未LISTING係STORE既
每隻APP仲要開齊 Interstitial/Rewarded/AppOpen 呢三個類型既廣告
全部設定都係DEFAULT就得
ADUNIT名用返呢個廣告類型就可以
最後將ANDROID同IOS既APPID同各自開出黎既ADUNIT ID 俾我

** 除非失敗、有問題，如果唔係唔好做到一半就停黎搵我，做哂先好搵我

## AdMob UI 操作注意事項（重要）

- **Material Radio（Android/iOS、Yes/No）好易「click 有派 event」但狀態唔更新**：唔好淨係靠 click ripple/裝飾層；要 click `material-radio` 本體／icon-container，必要時用「focus → Space」。
- **必須驗證已選中**：以 UI（radio 有藍點）或 DOM（`aria-checked="true"` / `checked`）作準；唔好只睇 console 顯示 `clicked ... true`。
- **如 click 無效，改用 form event**：搵到內部 `input[type="radio"]`，設 `input.checked = true`，再 dispatch `input` 同 `change`，先會令 Angular/Material 更新 state。
- **Continue enable 判斷**：唔一定有 `disabled` 屬性；要睇 `aria-disabled` / class（例如 `is-disabled`）同實際可唔可以按到跳下一步。
