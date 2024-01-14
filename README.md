夢想求職國：勇闖就業仙境  
Coding101, #happyworkplace


## 開發
python 版本建議為：`3.9`

### 取得專案

```bash
git clone https://github.com/heyaustin/ergotopia.git
```

### 安裝套件

```bash
pip install -r requirements.txt
```

### 環境變數設定

建立 `.env` 檔案並加入下列變數
```bash
line_token=""
line_secret=""
DEV=""
```

### 運行專案

```bash
# Run DB migration
python3 manage.py makemigrations
python3 manage.py migrate

# Run server
python3 manage.py runserver
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:8000/
```

## 資料夾說明

- base - 主要網頁開發
  - api - api相關設定(目前網站暫時不支持RESTFUL)
  - migrations - 資料庫更新
  - template - 覆寫主要模板的前端小組件
  - models.py - 資料庫設定
  - forms.py - 覆寫django預設的表單格式
  - admin.py - 控制後台監測設定
  - urls.py - 決定url與對應的 view function
  - views.py - 網頁核心邏輯實現
- ergotopia - 後端設定
- template - 供base中template覆寫的網頁模板
- static - 靜態資源放置處
...

## 專案技術

- django v4.2.1
- pillow v10.0.0
- line-bot-sdk v3.2.0
- Bootstrap v5.1.3
- python-dotenv v0.21.0
...