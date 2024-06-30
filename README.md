cd bizz-front
npm install
npm run dev

then, on another terminal

cd bizz-back
pip install -r requirements.txt
python app.py


Make sure:
1) you have the files inside /bizz-back/data
- If the data you have are only pdf's, also remember to run parse_pdf_json.py to parse them to json first
2) you have bizz-back/openai_configs.json
3) If you want to force-recreate the vectordb, change RECREATE_CHROMA to true in app.py
