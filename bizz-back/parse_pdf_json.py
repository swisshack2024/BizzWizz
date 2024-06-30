import fitz  # PyMuPDF
import json
from datetime import datetime
import os

def extract_pdf_to_json(pdf_path, output_json_path):
    document = fitz.open(pdf_path)
    result = {
        "status": "succeeded",
        "createdDateTime": datetime.utcnow().isoformat() + "Z",
        "lastUpdatedDateTime": datetime.utcnow().isoformat() + "Z",
        "analyzeResult": {
            "apiVersion": "2023-10-31-preview",
            "modelId": "prebuilt-layout",
            "stringIndexType": "utf16CodeUnit",
            "content": "",
            "pages": []
        }
    }
    
    for page_num in range(len(document)):
        page = document.load_page(page_num)
        words = page.get_text("words")
        page_text = page.get_text()
        page_data = {
            "pageNumber": page_num + 1,
            "angle": page.rotation,
            "width": page.rect.width,
            "height": page.rect.height,
            "unit": "inch",
            "words": []
        }
        
        current_offset = 0
        for word in words:
            word_content = word[4]
            word_offset = page_text.find(word_content, current_offset)
            if word_offset == -1:
                word_offset = page_text.find(word_content)
            current_offset = word_offset + len(word_content)
            
            word_data = {
                "content": word_content,
                "polygon": [word[0], word[1], word[2], word[3], word[0], word[3], word[2], word[1]],
                "confidence": 1,  # PyMuPDF doesn't provide confidence, setting it to 1 by default
                "span": {
                    "offset": word_offset,
                    "length": len(word_content)
                }
            }
            page_data["words"].append(word_data)
        
        result["analyzeResult"]["pages"].append(page_data)
        result["analyzeResult"]["content"] += page_text + "\n"
    
    with open(output_json_path, 'w') as json_file:
        json.dump(result, json_file, indent=4)

def process_all_pdfs_in_directory(pdf_directory, json_directory):
    if not os.path.exists(json_directory):
        os.makedirs(json_directory)
    
    for filename in os.listdir(pdf_directory):
        if filename.endswith('.pdf'):
            pdf_path = os.path.join(pdf_directory, filename)
            json_path = os.path.join(json_directory, f"{os.path.splitext(filename)[0]}.json")
            extract_pdf_to_json(pdf_path, json_path)
            print(f"Processed {filename} -> {json_path}")

# Example usage
pdf_directory = 'data'  # Replace with your PDF directory path
json_directory = 'data'  # Replace with your desired JSON directory path

process_all_pdfs_in_directory(pdf_directory, json_directory)
